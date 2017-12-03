import {Router} from 'express';

const app = new Router();

app.use((req, res, next)=>{
  res.send('api hello world');
})

export default app;