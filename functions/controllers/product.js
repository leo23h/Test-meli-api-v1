const axios = require('axios');
const url = require('url');
const querystring = require('querystring');

exports.searchProduct = (req, res) => {
    (async () => {
        try {
            let objResp = {};
            let urlqs = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(req.query.q)}`;
            console.log("criteria search1", decodeURIComponent(urlqs));
            axios.get(urlqs).then((response) => {
                // console.log("response search", response);
                let itemsTemp = [];
                objResp = {
                    'author': {
                        'name': 'Leonardo',
                        'lastname': 'Herrera',
                    },
                    'categories': [],
                    'items': []
                }

                // capture only 4 items by search
                for (let i = 0; i <= 3; i++) {
                    // CONDITIONS
                    // new
                    // not_specified
                    // used
                    itemsTemp.push({
                        "id": response.data.results[i].id, 
                        "title": response.data.results[i].title, 
                        "price": {
                            "currency": response.data.results[i].currency_id, 
                            "amount": response.data.results[i].price, 
                            "decimals": null
                        },
                        "picture": response.data.results[i].thumbnail, 
                        "condition": response.data.results[i].condition, 
                        "free_shipping": response.data.results[i].shipping.free_shipping
                    });
                }
                objResp.items = itemsTemp;

                return res.status(200).json({ status: "succeed", code: 200, message: "products found successfully!", data: objResp });
            })
        } catch (error) {
            return res.status(500).json({ status: "error", code: 500, message: "Error to found products", data: error });
        }
    })();
}

exports.getProductById = (req, res) => {
    (async () => {
        try {
            let id = req.params.id;
            let objResponse = {};
            console.log("get product by id", id)
            let responseItem = await axios.get(`https://api.mercadolibre.com/items/${id}`);
            let responseDescription = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
            // Format data
            objResponse = {
                "author": {
                    "name": "Leonardo",
                    "lastname": "Herrera" 
                },
                "item": {
                    "id": responseItem.data.id, 
                    "title": responseItem.data.title, 
                    "price": {
                        "currency": responseItem.data.currency_id, 
                        "amount": responseItem.data.price, 
                        "decimals": null,
                    },
                    "picture": responseItem.data.pictures[0].secure_url,
                    "condition": responseItem.data.condition, 
                    "free_shipping": responseItem.data.shipping.free_shipping, 
                    "sold_quantity": responseItem.data.sold_quantity,
                    "description": responseDescription.data.plain_text
                } 
            }
                


            return res.status(200).json({ status: "succeed", code: 200, message: "producty by id successfully!", data: objResponse });
        } catch (error) {
            return res.status(500).json({ status: "error", code: 500, message: "Error to found products", data: error });
        }
    })();
}


