import express from 'express';
import { createServer as createViteServer } from 'vite';
import { render } from './entry-client.js';
import fetch from 'node-fetch';


async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
  });

  app.use(vite.middlewares);

  app.get('/api/product/:id', async (req, res) => {

    const product_id = req.params.id;
    try{
        const response = await fetch(`${this.process.env.VUE_APP_API_URL}/products/${product_id}`);
        const product = await response.json();
        res.json(product);
    }catch(error){
        console.error('Error fetching product data:', error);
        res.status(500).json({ error: 'Failed to fetch product data' });
    }
  });

  app.get('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      const { appContent, metaTags } = await render(url);

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${metaTags}
        </head>
        <body>
          <div id="app">${appContent}</div>
          <script type="module" src="/src/entry-client.js"></script>
        </body>
        </html>
      `;

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      res.status(500).end(e.stack);
    }
  });

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

createServer();
