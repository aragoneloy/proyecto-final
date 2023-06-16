import { number } from "joi";
import mongoose from "mongoose";

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    thumbnail: Array,
    code: Number,
    stock: Number,
    status: Boolean,
})

export const productModel = mongoose.model(productCollection, productSchema)