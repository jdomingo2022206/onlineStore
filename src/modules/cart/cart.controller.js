import { response, json } from "express";
import bcryptjs from "bcryptjs";
import {isToken} from "../../helpers/tk-metods.js";
import Cart from "./cart.model.js";
import Product from "../product/product.model.js";
import Bill from "../bill/bill.model.js";
import { create } from "domain";

export const cartGet = async (req, res = response) => {
    console.log('');
    console.log('--- [NOTES] cartGet.cart');
    try {
        const user = await isToken(req, res);
        if (!user) { return; }
        const query = { userId: user._id };
        const cart = await Cart.findOne(query)
            .select('userId products totalPrice')
            .populate({
                path: 'userId',
                model: 'User',
                select: 'name'
            })
            .populate({
                path: 'products.productId',
                model: 'Product',
                select: 'name price'
            });
        if (!cart) { return res.status(404).json({ msg: 'Cart not found' }) };

        // Calcula el totalPrice sumando el precio de cada producto multiplicado por su cantidad
        let totalPrice = 0;
        for (const item of cart.products) {
            totalPrice += item.productId.price * item.quantity;
        }

        // Actualiza el totalPrice en el objeto cart
        cart.totalPrice = totalPrice;

        // Devuelve el objeto cart con el nuevo totalPrice en la respuesta JSON
        res.status(200).json({ cart: cart });
    } catch (e) {
        res.status(500).json({ msg: 'There was an error getting the cart.', error: e });
    }
}

export const cartAddProduct = async (req, res = response) => {
    console.log('');
    console.log('--- [NOTES] cartAddProduct.cart');
    try {
        const user = await isToken(req, res);
        if (!user) { return; }
        const { productName, date, quantity } = req.body;
        const product = await Product.findOne({ name: productName, date: date });
        const productId = product._id;
        const query = { userId: user._id };
        let cart = await Cart.findOne(query);
        if (!cart) {
            cart = new Cart({ userId: user._id });
        }
        const productIndex = cart.products.findIndex(item => item.productId == productId);
        if (productIndex === -1) {
            cart.products.push({ productId, quantity });
        } else {
            cart.products[productIndex].quantity += quantity;
        }
        await cart.save();
        res.status(201).json({ msg: 'Product added to cart', cart });
    } catch (e) {
        res.status(500).json({ msg: 'There was an error adding the product to the cart.', error: e });
    }
}

export const cartDeleteProduct = async (req, res = response) => {
    console.log('');
    console.log('--- [NOTES] cartDeleteProduct.cart');
    try {
        const user = await isToken(req, res);
        if (!user) { return; }
        const { productName, date, quantity } = req.body;
        const product = await Product.findOne({ name: productName, date: date });
        const productId = product._id;
        const query = { userId: user._id };
        let cart = await Cart.findOne(query);
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        const productIndex = cart.products.findIndex(item => item.productId.equals(productId));
        if (productIndex === -1) {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }
        if (cart.products[productIndex].quantity > quantity) {
            cart.products[productIndex].quantity -= quantity;
        } else {
            cart.products.splice(productIndex, 1);
        }
        await cart.save();
        res.status(200).json({ msg: 'Product deleted from cart', cart });
    } catch (e) {
        res.status(500).json({ msg: 'There was an error deleting the product from the cart.', error: e });
    }
}

export const cartReset = async (req, res = response) => {
    console.log('');
    console.log('--- [NOTES] cartReset.cart');
    try {
        const user = await isToken(req, res);
        if (!user) { return; }
        const query = { userId: user._id };
        const cart = await Cart.findOne(query);
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        cart.products = [];
        cart.totalPrice = 0;
        await cart.save();
        res.status(200).json({ msg: 'Cart reset successfully', cart });
    } catch (e) {
        res.status(500).json({ msg: 'There was an error resetting the cart.', error: e });
    }
}

export const buyCart = async (req, res = response) => {
    console.log('');
    console.log('--- [NOTES] buyCart.cart');
    try {
        const user = await isToken(req, res);
        if (!user) { return; }
        const query = { userId: user._id };
        const cart = await Cart.findOne(query);
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        if (cart.products.length === 0) {
            return res.status(400).json({ msg: 'The cart is empty' });
        }
        // Crea una nueva compra con los productos del carrito
        // y actualiza el stock de los productos
        const products = [];
        for (const item of cart.products) {
            const product = await Product.findById(item.productId);
            if (product.stock < item.quantity) {
                return res.status(400).json({ msg: 'Insufficient stock' });
            }
            product.stock -= item.quantity;
            await product.save();
            products.push({ productId: item.productId, quantity: item.quantity });
        }
        const totalPrice = cart.totalPrice;
        cart.products = [];
        cart.totalPrice = 0;
        await cart.save();
        createBill(user._id, products, totalPrice);
        res.status(200).json({ msg: 'Purchase completed successfully', products, totalPrice });
    } catch (e) {
        res.status(500).json({ msg: 'There was an error completing the purchase.', error: e });
    }
}

const createBill = async (userId, products, totalPrice) => {
    console.log('');
    console.log('--- [NOTES] createBill.cart');
    try {
        const billProducts = products.map(product => ({
            productId: product.productId,
            quantity: product.quantity
        }));
        const bill = new Bill({ userId, products: billProducts, totalPrice });
        await bill.save();
    } catch (e) {
        console.log('There was an error creating the bill.', e);
    }
}

/*
const purchaseHistory = async (req, res = response) => {
    console.log('');
    console.log('--- [NOTES] purchaseHistory.cart');
    try {
        const user = await isToken(req, res);
        if (!user) { return; }
        const query = { userId: user._id };
        const bills = await Bill.find(query)
            .select('userId products totalPrice date')
            .populate({
                path: 'userId',
                model: 'User',
                select: 'name'
            })
            .populate({
                path: 'products.productId',
                model: 'Product',
                select: 'name price'
            });
        res.status(200).json({ bills });
    } catch (e) {
        res.status(500).json({ msg: 'There was an error getting the purchase history.', error: e });
    }
}
*/ 
