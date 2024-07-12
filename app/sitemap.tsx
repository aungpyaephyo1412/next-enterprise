export default async function sitemap() {
  const routes = [''].map((route) => ({
    url: `https://example.vercel.app/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
