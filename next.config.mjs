import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins(
  [
      [
          withBundleAnalyzer({
              enabled: process.env.ANALYZE === 'true', // Fixed typo: 'ture' to 'true'
          }),
      ],
  ],
  {
      reactStrictMode: false,
      logging: {
          fetches: {
              fullUrl: true,
          },
      },
      experimental: {
          instrumentationHook: true,
          turbo: {
              rules: {
                  '*.svg': {
                      loaders: ['@svgr/webpack'],
                      as: '*.js',
                  },
              },
          },
      },
      async rewrites() {
          return [
              { source: "/healthz", destination: "/api/health" },
              { source: "/api/healthz", destination: "/api/health" },
              { source: "/health", destination: "/api/health" },
              { source: "/ping", destination: "/api/health" },
          ];
      },
      async redirects() {
          return [
              {
                  source: '/',
                  destination: '/en',
                  permanent: false,
              },
              {
                  source: '/en',
                  destination: '/en/home',
                  permanent: false,
              },
          ]
      },
  }
);

export default config;
