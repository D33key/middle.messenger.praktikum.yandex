import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __srcDir = path.dirname(__dirname);
const __rootname = path.dirname(__srcDir) + '/dist/pages';

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);
  app.use(express.static(path.resolve(__srcDir, '../dist')));

  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    const htmlName = url === '/' ? 'index.html' : url.slice(1) + '.html';
    try {
      let template = fs.readFileSync(
        path.resolve(__rootname, htmlName),
        'utf-8',
      );

      template = await vite.transformIndexHtml(url, template);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (error) {
      let template = fs.readFileSync(
        path.resolve(__rootname, '404/404.html'),
        'utf-8',
      );
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    }
  });

  app.listen(PORT);
}

createServer();
