const express = require("express");
const cors = require("cors");
const app = express();

const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

const productModule = require("./controllers/product");

app.get('/items', productModule.searchProduct);
app.get('/items/​:id', productModule.getDescriptionProductById);
app.get('/item/​:id', productModule.getProductById);
