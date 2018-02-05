import path from 'path';
import importFresh from 'import-fresh';

export default function(req, res, next) {
  const serverSideRender = importFresh(path.resolve('./build/serverSideRender.bundle.js')).default;
  serverSideRender(req.originalUrl).then(result => {
    res.status(result.status).send(result.html);
  }).catch(next);
}