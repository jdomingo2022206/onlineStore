import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Product from "./product.model.js";
import { isToken } from "../../helpers/tk-metods.js";
import Category from "../category/category.model.js";

export const productGet = async (req, res) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    try {
        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .select ('-_id -__v name desc price stock img -estado date ')
                .populate({
                    path: 'categoryId',
                    model: 'Category', 
                    select: 'name'
                })
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        const mappedProducts = products.map(product => ({
            name: product.name,
            desc: product.desc,
            price: product.price,
            stock: product.stock,
            img: product.img,
            category: product.categoryId.name,
            date: product.date
        }));

        res.status(200).json({
            total,
            products: mappedProducts
        });
    } catch (error) {
        // console.error('Error getting products:', error);
        res.status(500).json({msg: 'Upss!!! Sorry, there was an error getting products.', error});
    }
}  

export const productGetByName = async (req, res) => {
    const {name, date} = req.params;
    const query = {name: name, date: date};

    try {
        const product = await Product.findOne(query)
            .select ('-_id -__v name desc price stock img estado date ')
            .populate({
                path: 'categoryId',
                model: 'Category', 
                select: 'name'
            });

        if (!product) {
            return res.status(404).json({msg: 'Product not found'});
        }

        const mappedProduct = {
            name: product.name,
            desc: product.desc,
            price: product.price,
            stock: product.stock,
            img: product.img,
            category: product.categoryId.name,
            estado: product.estado,
            date: product.date
        };

        res.status(200).json(mappedProduct);
    } catch (error) {
        // console.error('Error getting product:', error);
        res.status(500).json({msg: 'Upss!!! Sorry, there was an error getting the product.', error});
    }
}

export const createProduct = async (req, res) => {
    try {
        const {name, desc, price, stock, categoryName} = req.body;
        const user = await isToken(req, res);
        if (!user){return;}else if (user.role !== 'ADMIN_ROLE'){return res.status(401).json({msg: 'Unauthorized'});}
        const category = await Category.findById(categoryName);
        if (!category){return res.status(400).json({msg: 'Category not found'});}
        const categoryId = category._id;
        const product = new Product({name, desc, price, stock, categoryId});
        await product.save();
        res.status(201).json({msg: 'Product created successfully'});
    } catch (error) {
        res.status(500).json({msg: 'Upss!!! Sorry, there was an error creating the product.', error});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const {name, date} = req.body;
        const user = await isToken(req, res);
        if (!user){return;}else if (user.role !== 'ADMIN_ROLE'){return res.status(401).json({msg: 'Unauthorized'});}
        const product = await Product.findOne({name: name, date: date});
        if (!product){return res.status(400).json({msg: 'Product not found'});}else if (!product.estado){return res.status(400).json({msg: 'Product already deleted'});}
        product.estado = false;
        await product.save();
        res.status(200).json({msg: `Product ${product.name} || ${product.date} deleted successfully`});
    } catch (error) {
        res.status(500).json({msg: 'Upss!!! Sorry, there was an error deleting the product.', error});
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {name, categoryId, date, ...rest} = req.body;
        const user = await isToken(req, res);
        if (!user){return;}else if (user.role !== 'ADMIN_ROLE'){return res.status(401).json({msg: 'Unauthorized'});}
        const product = await Product.findOne({name: name, date: date});
        if (!product){return res.status(400).json({msg: 'Product not found'});}else if (!product.estado){return res.status(400).json({msg: 'Product not aviable'});}
        await Product.findByIdAndUpdate(product._id, rest);
        res.status(200).json({msg: `Product ${product.name} updated successfully`});
    } catch (error) {
        res.status(500).json({msg: 'Upss!!! Sorry, there was an error updating the product.', error});
    }
}