import { Router } from "express";
import { check } from "express-validator";
import {categoriesGet,getCategoryById,createCategory,deleteCategory} from "../category/category.controller.js"
import { validateCampus } from "../../middlewares/validate-campus.js";
import { validateJWT } from "../../middlewares/validate-jwt.js";


const router = Router();

router.get("/", categoriesGet);

router.get(
  "/:id",
  [
    check("id", "The id is required").not().isEmpty(),
    check("id", "Not is a valid Id").isMongoId(),
    validateCampus,
  ],
  getCategoryById
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is required ").not().isEmpty(),
    check("name", "The name must be greater than 3 characters").isLength({min: 3}).matches(/^[a-zA-Z\s]+$/).withMessage("The name must contain only letters and spaces"),
    check("desc", "The description is required").not().isEmpty(),
    check("desc", "The description must be greater than 15 characters").isLength({min: 15}).matches("^[a-zA-Z0-9 ]*$").withMessage("The name must be alphanumeric"),
    validateCampus,
  ],
  createCategory
);

router.delete(
  "/",
  [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateCampus,
  ],
  deleteCategory
);


export default router;
