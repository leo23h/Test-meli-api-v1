const axios = require('axios');

exports.searchProduct = (req, res) => {
    (async () => {
        try {
            let criterialSearch = req.params.q;
            let response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${criterialSearch}`);
            return res.status(200).json({ status: "succeed", code: 200, message: "products found successfully!", data: response });
        } catch (error) {
            functions.logger.error(error)
            return res.status(500).json({ status: "error", code: 500, message: "Error to found products", data: error });
        }
    })();
}

exports.getProductById = (req, res) => {
    (async () => {
        try {
            let id = req.params.id;
            let response = await axios.get(`https://api.mercadolibre.com/items/​${id}`);
            return res.status(200).json({ status: "succeed", code: 200, message: "producty by id successfully!", data: response });
        } catch (error) {
            functions.logger.error(error)
            return res.status(500).json({ status: "error", code: 500, message: "Error to found products", data: error });
        }
    })();
}

exports.getDescriptionProductById = (req, res) => {
    (async () => {
        try {
            let id = req.params.id;
            let response = await axios.get(`https://api.mercadolibre.com/items/​${id}/description`);
            return res.status(200).json({ status: "succeed", code: 200, message: "description product successfully!", data: response });
        } catch (error) {
            functions.logger.error(error)
            return res.status(500).json({ status: "error", code: 500, message: "Error to found products", data: error });
        }
    })();
}

