import { Router } from "express";
import { check } from "express-validator";
import { purchaseHistory } from "./bill.controller.js";
import { validateCampus } from "../../middlewares/validate-campus.js";
import { validateJWT } from "../../middlewares/validate-jwt.js";
const router = Router();

router.get("/", validateJWT, purchaseHistory);

export default router;