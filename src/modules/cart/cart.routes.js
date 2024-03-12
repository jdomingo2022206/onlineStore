import { Router } from "express";
import { check } from "express-validator";
import {cartGet, cartAddProduct, cartDeleteProduct, cartReset, buyCart} from "./cart.controller.js";
import { validateCampus } from "../../middlewares/validate-campus.js";
import { validateJWT } from "../../middlewares/validate-jwt.js";
const router = Router();

router.get("/", validateJWT, cartGet);

router.post(
  "/add",
  [
    validateJWT,
    check("productName", "The product name is required").not().isEmpty(),
    check("date", "The date is required").not().isEmpty(),
    check("quantity", "The quantity is required").not().isEmpty(),
    validateCampus,
  ],
  cartAddProduct
);

router.post(
  "/delete",
  [
    validateJWT,
    check("productName", "The product name is required").not().isEmpty(),
    check("date", "The date is required").not().isEmpty(),
    check("quantity", "The quantity is required").not().isEmpty(),
    validateCampus,
  ],
  cartDeleteProduct
);

router.delete("/", validateJWT, cartReset);

router.post("/buy", validateJWT, buyCart);

export default router;


