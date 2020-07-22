import { Router } from 'express';
import Multer from 'multer';

import uploadConfig from './config/upload';
import OrderController from './controllers/OrderController';
import ProductController from './controllers/ProductController';
import RestaurantController from './controllers/RestaurantController';
import SessionController from './controllers/SessionController';
import WhatsappMessageController from './controllers/WhatsappMessageController';
import auth from './middlewares/auth';
import OrderAcceptController from './controllers/OrderAcceptController';

const uploads = Multer(uploadConfig);
const routes = Router();

routes.get('/', (req, res) => res.send('Server ok'));

routes.post('/restaurant', uploads.single('image'), RestaurantController.store);
routes.get('/restaurant/:id', RestaurantController.show);

routes.post('/whatsapp', WhatsappMessageController.recive);

routes.post('/order', OrderController.store);
routes.put('/order/accept/:orderId', OrderAcceptController.store);

routes.post('/session', SessionController.store);
routes.use(auth);
routes.get('/order', OrderController.index)

routes.post('/product', uploads.single('image'), ProductController.store);
export default routes;
