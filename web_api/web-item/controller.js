const { model } = require("./model")

const Controller = {
    async get_best_seller(req, resp) {
        try {
            var res_data = await model.find_best_seller()
            resp.status(res_data.status).json(res_data)
        } catch (err) {
            resp.status(500).json(err)
        }
    },
    async autocom_search(req, resp) {
        try {
            var res_data = await model.search_item(req.params.inData)
            resp.status(res_data.status).json(res_data)
        } catch (error) {
            resp.status(500).json(error)
        }
    },
    async get_search_item(req, resp) {
        try {
            var res_data = await model.find_item(req.params.inData)
            resp.status(res_data.status).json(res_data)
        } catch (error) {
            resp.status(500).json(error)
        }
    },
    async autocom_search_order(req, resp) {
        try {
            var res_data = await model.search_order(req.params.inData)
            resp.status(res_data.status).json(res_data)
        } catch (error) {
            resp.status(500).json(error)
        }
    },
    async get_search_order(req,resp){
        try {
            var res_data = await model.find_order(req.params.inData)
            resp.status(res_data.status).json(res_data)
        } catch (error) {
            resp.status(500).json(error)
        }
    },
    async create_saleOrder(req, resp) {
        try {
            var res_doc = await model.find_by_doc("SO")
            var res_data = await model.create_saleOrder(res_doc, req.body)
            resp.status(res_data.status).json(res_data)
        } catch (error) {
            resp.status(500).json(error)
        }
    },
    async create_purchase(req, resp) {
        try {
            var res_doc = await model.find_by_doc("PO")
            var res_data = await model.create_transaction(res_doc, req.body)
            resp.status(res_data.status).json(res_data)
        } catch (error) {
            resp.status(500).json(error)
        }
    },
    async create_return(req, resp) {
        try {
            var res_doc = await model.find_by_doc("CN")
            var res_data = await model.create_transaction(res_doc, req.body)
            resp.status(res_data.status).json(res_data)
        } catch (error) {
            resp.status(500).json(error)
        }
    },
    async create_claim(req, resp) {
        try {
            var res_doc = await model.find_by_doc("CM")
            var res_data = await model.create_transaction(res_doc, req.body)
            resp.status(res_data.status).json(res_data)
        } catch (error) {
            resp.status(500).json(error)
        }
    },
    async create_adjust(req, resp) {
        try {
            var res_doc = await model.find_by_doc("ADJ")
            var res_data = await model.create_transaction(res_doc, req.body)
            resp.status(res_data.status).json(res_data)
        } catch (error) {
            resp.status(500).json(error)
        }
    },
    async create_new_item(req, resp) {
        var getBarcode = req.body[0].barcode
        if (getBarcode != "") {
            try {
                var res_data = await model.create_new_item("", req.body)
                resp.status(res_data.status).json(res_data)
            } catch (err) {
                resp.status(500).json(err)
            }
        } else {
            try {
                var res_newDoc = await model.find_by_doc("JB")
                var res_data = await model.create_new_item(res_newDoc, req.body)
                resp.status(res_data.status).json(res_data)
            } catch (err) {
                resp.status(500).json(err)
            }
        }
    }
}
module.exports = {
    Controller: Controller
}