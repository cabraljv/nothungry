import { Router } from 'express';
import Multer from 'multer';

import uploadConfig from './config/upload';
import OrderAcceptController from './controllers/OrderAcceptController';
import OrderController from './controllers/OrderController';
import OrderDenyController from './controllers/OrderDenyController';
import OrderFinishController from './controllers/OrderFinishController';
import ProductController from './controllers/ProductController';
import RestaurantController from './controllers/RestaurantController';
import SessionController from './controllers/SessionController';
import WhatsappMessageController from './controllers/WhatsappMessageController';
import auth from './middlewares/auth';

const uploads = Multer(uploadConfig);
const routes = Router();

routes.get('/', (req, res) => res.send('Server ok'));

routes.post('/restaurant', uploads.single('image'), RestaurantController.store);
routes.get('/restaurant/:id', RestaurantController.show);

routes.post('/whatsapp', WhatsappMessageController.recive);

routes.post('/order', OrderController.store);

routes.post('/session', SessionController.store);
routes.use(auth);
routes.put('/order/accept/:orderId', OrderAcceptController.store);
routes.put('/order/deny/:orderId', OrderDenyController.store);
routes.put('/order/finish/:orderId', OrderFinishController.store);

routes.get('/order', OrderController.index);

routes.post('/product', uploads.single('image'), ProductController.store);
routes.put('/product', uploads.single('image'), ProductController.update);
routes.get('/product', ProductController.index);
routes.delete('/product/:id', ProductController.destroy);
export default routes;
