import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const _srcDir = path.dirname(_dirname);
const _rootname = path.dirname(_srcDir) + '/dist';

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);
  app.use(express.static(path.resolve(_srcDir, '../dist')));

  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    const htmlName = url === '/' ? 'login.html' : url.slice(1) + '.html';
    try {
      let template = fs.readFileSync(
        path.resolve(_rootname, htmlName),
        'utf-8',
      );

      template = await vite.transformIndexHtml(url, template);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (error) {
      let template = fs.readFileSync(
        path.resolve(_rootname, '404.html'),
        'utf-8',
      );
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    }
  });

  app.listen(PORT);
}

createServer();
