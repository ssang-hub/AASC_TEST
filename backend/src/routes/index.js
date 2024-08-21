import express from 'express';
import * as userControllers from '../controllers/userController';
import * as appControllers from '../controllers/appController.js';
import * as contactControllers from '../controllers/contactController.js';
import { contactInputMiddleware } from '../middlewares/contactMiddleware.js';
const route = express.Router();

route.post('/install_app', appControllers.installApp);
route.get('/getAllEmployee', userControllers.getAllEmployee);

route.get('/contact', contactControllers.getAllContact);
route.post('/contact', contactInputMiddleware, contactControllers.createContact);
route.put('/contact', contactInputMiddleware, contactControllers.updateContact);
route.delete('/contact', contactControllers.deleteContact);

export default route;
