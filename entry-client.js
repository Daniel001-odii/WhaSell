import { createApp } from './src/main';
import { renderToString } from 'vue/server-renderer';

export async function render(url, manifest) {
  const { app, router, meta } = createApp();

  router.push(url);
  await router.isReady();

  const appContent = await renderToString(app);
  const metaTags = meta.renderToString();

  return { appContent, metaTags };
}
