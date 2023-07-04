import 'express-async-errors'
import dotenv from 'dotenv';
import express from 'express';
import restaurantRouter from './infra/routes/restaurant.routes';
import productRouter from './infra/routes/product.routes';
import LoggerProvider from './infra/provider/LoggerProvider';
import errorMiddleware from './infra/errors/middleware'
import GoogleAuthProvider from './infra/provider/GoogleAuthProvider';
import rateLimiter from './infra/provider/LimitRateMiddlewareProvider';

dotenv.config();
const app = express();
app.use(express.json());
GoogleAuthProvider.createMiddleware();

app.use(rateLimiter);
app.use('/restaurants', restaurantRouter);
app.use('/products', productRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    LoggerProvider.getInstance().info(`Server started on port ${process.env.PORT}`)
    console.log(`Server started on port: ${process.env.PORT}`);
});
