import { response, json } from "express";
import {isToken} from "../../helpers/tk-metods.js";
import Bill from "../bill/bill.model.js";


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