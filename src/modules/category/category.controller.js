import { response, request } from "express";
import Category from "./category.model.js";
import { isToken } from "../../helpers/tk-metods.js";

export const categoriesGet = async (req = request, res = response) => {
    try {
        const {limite, desde} = req.query;
        const query = {estado: true};

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            categories
        });
    } catch (error) {
        res.status(500).json({msg: 'Upss!!! Sorry, there was an error getting categories.', error});
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findOne({_id: id});

        if (!category){
            return res.status(400).json({msg: 'The category does not exist.'});
        }else if(category.estado === false){
            return res.status(400).json({msg: 'The category is not available.'});
        }

        res.status(200).json({
            category
        })
    } catch (error) {
        res.status(500).json({msg: 'Upss!!! Sorry, there was an error getting the category.', error});
    }
}

export const createCategory = async (req, res) => {
    console.log('');
    console.log('createCategory.categories');
    try {
        let {name} = req.body;
        const {desc} = req.body;
        const user = await isToken(req, res);
        if (!user){
            return;
        }
        name = "#"+name.toLowerCase().replace(/ /g, '');
        const existCategory = await Category.findOne({name})
        if (existCategory){
            return res.status(400).json({msg: 'The category already exists.'});
        }
        const category = new Category({name, desc});
        await category.save();
        res.status(200).json({category});
    } catch (error) {
        // console.error('Error creating category: ', error);
        res.status(500).json({ msg: 'Upss!!! Sorry, there was an error creating category.', error });
    }
}

export const deleteCategory = async (req, res) => {
    console.log('');
    console.log('deleteCategory.categories');
    try {
        let {name} = req.body;
        const user = await isToken(req, res);
        if (!user){
            return;
        }
        if (user.role !== 'ADMIN_ROLE'){
            return res.status(400).json({msg: 'You do not have the necessary permissions to delete the category.'});
        }
        name = "#"+name.toLowerCase().replace(/ /g, '');
        const existCategory = await Category.findOne({name})
        if (!existCategory){
            return res.status(400).json({msg: 'The category does not exist.'});
        }
        await Category.findOneAndUpdate({name}, {estado: false});
        res.status(200).json({msg: 'Category deleted successfully.'});
    } catch (error) {
        // console.error('Error deleting the category: ', error);
        res.status(500).json({ msg: 'Upss!!! Sorry, there was an error deleting the category ', error });        
    }
}
