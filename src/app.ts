import express from 'express';

import routes from './routes';

const app = express();

app.use(express.json());

// app.use('/login', loginRoute);
app.use('/users', routes.userRoute);
app.use('/products', routes.productRoute);

export default app;
