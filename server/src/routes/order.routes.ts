import express from 'express';
import { createCheckoutSession, getOrders, stripeWebhook } from '../controllers/order.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware';
const router = express.Router();

router.route("/").get( isAuthenticated, getOrders);
router.route("/chechout/create-checkout-session").post(isAuthenticated , createCheckoutSession);
router.route("/webhook").post(express.raw({type : 'application/json'}) , stripeWebhook);


export default router;