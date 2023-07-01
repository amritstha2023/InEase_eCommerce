import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// routing object
const router = express.Router();

// routing
// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

// test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update user profile
router.put("/profile", requireSignIn, updateProfileController);

// orders
router.get("/orders", requireSignIn, getOrdersController);

// admin side orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put("/order-status", requireSignIn, isAdmin, orderStatusController);

export default router;
