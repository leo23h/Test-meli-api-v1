const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

const productModule = require("./controllers/product");

app.get('/api/items', productModule.searchProduct);
app.get('/api/items/:id', productModule.getProductById);

const server = app.listen(3000, () => console.log('Server ready'));

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
