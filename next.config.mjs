import withBundleAnalyzer from "@next/bundle-analyzer"
import withPlugins from "next-compose-plugins"

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withBundleAnalyzer({ enabled: !!process.env.ANALYZE })]], {
    reactStrictMode: true,
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
    rewrites() {
        return [
            { source: "/healthz", destination: "/api/health" },
            { source: "/api/healthz", destination: "/api/health" },
            { source: "/health", destination: "/api/health" },
            { source: "/ping", destination: "/api/health" },
        ]
    },
})

export default config