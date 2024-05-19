const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require('os');
require('dotenv').config();
passsword = process.env.MONGO_PASS;
app.use(express.json());
app.use(cors());

// Database Connection With MongoDB 
mongoose.connect('mongodb+srv://Umirek:Mangohub131!@e-commerce.fombb1o.mongodb.net/E-Commerce')

// API Creation 

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Image Storage Engine

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/images')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: Storage})


// Creating Upload Endpoint for images
app.use('/images', express.static(path.join(__dirname, 'upload/images')))
app.post("/upload", upload.single('product'), (req, res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Creating Product Schema

const Product = mongoose.model('Product',{
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product);
    try {
        await product.save();
        res.json({
            success: true,
            name: req.body.name
        })
    } catch (error) {
        res.send(error);
    }
});

app.listen(port, (error) => {
    if (!error){
        console.log(`Server running on port http://localhost:${port}`);
    }else{
        console.log("Error :", error);
    }
});