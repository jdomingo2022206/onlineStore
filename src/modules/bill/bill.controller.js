import { response, json } from "express";
import {isToken} from "../../helpers/tk-metods.js";
import Bill from "../bill/bill.model.js";
import Product from "../product/product.model.js";

export const purchaseHistory = async (req, res = response) => {
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

export const statistics = async (req, res = response) => {
    console.log('');
    console.log('--- [NOTES] statistics');
    try {
        const howManyBills = await Bill.find().countDocuments();
        const bills = await Bill.find();
        // Crear un mapa para rastrear la cantidad de cada producto vendido
        const soldProducts = new Map();
        // Iterar sobre cada factura para contar la cantidad de productos vendidos
        for (const bill of bills) {
            for (const product of bill.products) {
                const productId = product.productId.toString();
                const quantity = product.quantity;
                
                // Si el producto ya está en el mapa, sumar la cantidad vendida
                if (soldProducts.has(productId)) {
                    soldProducts.set(productId, soldProducts.get(productId) + quantity);
                } else { // Si el producto no está en el mapa, inicializar la cantidad vendida
                    soldProducts.set(productId, quantity);
                }
            }
        }
        
        // Ordenar los productos vendidos en orden descendente según la cantidad vendida
        const sortedSoldProducts = new Map([...soldProducts.entries()].sort((a, b) => b[1] - a[1]));
        
        // Convertir el mapa ordenado en un array de objetos
        const topSoldProducts = [];
        for (const [productId, quantity] of sortedSoldProducts) {
            const product = await Product.findById(productId);
            if (product) {
                topSoldProducts.push({ product: product.name, quantity });
            }
        }
        
        res.status(200).json({ topSoldProducts });
    } catch (e) {
        res.status(500).json({ msg: 'There was an error getting the statistics.', error: e });
    }
}