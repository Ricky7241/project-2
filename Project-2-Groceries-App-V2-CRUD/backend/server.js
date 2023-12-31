/////Imports and definations
const express = require("express");
const server = express();
const {request, response} = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");
const port = 3001;
const db_uri = "mongodb+srv://rickky7241:zorooroz@cluster0.fh5yuvo.mongodb.net/product?retryWrites=true&w=majority"
////// Middleware
server.use(express.urlencoded({extended:false}));
server.use(express.json());
server.use(cors());


/////connections
mongoose.connect(db_uri).then((result) => {
    server.listen(port, () => { 
 console.log(`Listening  on ${port}...\nConnected to DB`)
});

})
.catch((error) => {
   console.log(error);
});

server.get("/", (request, response) => {
   response.send("LIVE!!!");
});
server.get("/products", async(request, response) => {
   const products = await Product.find();
   response.send(products);
});
server.post("/addProduct", async(request,response) => {
const product=request.body
const postProduct = new Product({
   id: product.id,
   productName: product.productName,
   brand: product.brand,
   quantity: product.quantity,
   image: product.image,
   price: product.price,
});
const saveProduct = await postProduct.save();
saveProduct
 ? response.send("Product is added to inventory") : response.send("Failed to add!");
});