const Product = require('../models/product-model');
const product = async (req,res)=>{
    try {
        const {name, prize, saving} = req.body
        if (!name || !prize || !saving) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newProduct = await Product.create({
            name,
            prize,
            saving
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
        
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "Failed to fetch products" });
    }
};



module.exports = {
    product,
    getProducts
};