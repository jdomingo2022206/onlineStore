import {Router} from "express";
import {check} from "express-validator";
import {validateJWT} from "../../middlewares/validate-jwt.js";
import {validateCampus} from "../../middlewares/validate-campus.js";
import {productGet, productGetByName, createProduct, deleteProduct, updateProduct} from "./product.controller.js";
const router = Router();

router.get("/", productGet);

router.get(
    "/:name/:date",
    [
        validateJWT,
        validateCampus
    ],
    productGetByName
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "Product name is required").not().isEmpty(),
        check ("name", "Product name must be at least 3 characters").isLength({min: 3}).matches("^[a-zA-Z0-9 ]*$").withMessage("Product name must be alphanumeric"),
        check("desc", "Product description is required").not().isEmpty(),
        check ("desc", "Product description must be at least 15 characters").isLength({min: 15}).matches("^[a-zA-Z0-9 ]*$").withMessage("Product description must be alphanumeric"),
        check("price", "Product price is required").not().isEmpty(),
        check("price", "Price must be a number").isNumeric(),
        check("stock", "Quantity is required").not().isEmpty(),
        check("stock", "Quantity must be an integer").isInt(),
        check("categoryName", "Category is required").not().isEmpty(),
        validateCampus
    ],
    createProduct
);

router.delete(
    "/",
    [
        validateJWT,
        check("name", "Product name is required").not().isEmpty(),
        check("date", "Product date is required").not().isEmpty(),
        validateCampus
    ],
    deleteProduct
);

router.put(
    "/",
    [
        validateJWT,
        check("name", "Product name is required").not().isEmpty(),
        check("date", "Product date is required").not().isEmpty(),
        check("date", "Date must be a valid date in format YYYY-MM-DDTHH:mm:ss.sssZ").matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
        check("desc", "Product description is required").not().isEmpty(),
        check("desc", "Product description must be at least 15 characters").isLength({min: 15}).matches("^[a-zA-Z0-9 ]*$").withMessage("Product description must be alphanumeric"),
        check("price", "Product price is required").not().isEmpty(),
        check("price", "Price must be a number").isNumeric(),
        check("stock", "Quantity is required").not().isEmpty(),
        check("stock", "Quantity must be an integer").isInt(),
        validateCampus
    ],
    updateProduct
);

export default router;