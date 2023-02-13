import { ALLOWED_DOMAINS, ALLOWED_METHODS } from '../../config/config.js';

export default function corsHandler() {
  return (req, res, next) => {
    const { method } = req;
    const { origin } = req.headers;

    const requestAccess = req.header['access-control-request-headers'];

    if (ALLOWED_DOMAINS.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', true);
    }

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestAccess);
      return res.end();
    }

    return next();
  };
}
