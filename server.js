import mongoose from 'mongoose';
import app from './src/app.js';
import { DB_CONN, PORT } from './config/config.js';

(async () => {
  await mongoose.connect(DB_CONN);
  app.use('/test', (req, res) => {
    res.send('work');
  });
  app.listen(PORT, 'localhost', () => {
    console.log('server started');
  });
})();
