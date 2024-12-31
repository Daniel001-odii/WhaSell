import express from 'express';
import { createServer as createViteServer } from 'vite';
import { render } from './entry-server';

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
  });

  app.use(vite.middlewares);

  app.get('/api/product/:id', async (req, res) => {
    // Mocked product data. Replace with actual DB/API calls as needed.
    const products = {
      1: { title: 'Product 1', description: 'Description of Product 1', image: '/images/product1.jpg' },
      2: { title: 'Product 2', description: 'Description of Product 2', image: '/images/product2.jpg' },
    };
    res.json(products[req.params.id]);
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
