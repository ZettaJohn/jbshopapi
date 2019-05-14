const { model } = require("./model")

const Controller = {
    user_login(req, resp) {
        console.log("req",req)
        resp.json({REQ:"",true:"test"})
        // model.find_user(req.params.inUser, req.params.inPass, resp)
    },
    get_all_item(req, resp) {
        model.find_all_item((res_data) => resp.json(res_data))
    },
    get_search_item(req, resp) {
        model.search_item(req.params.inData, (res_data) => resp.json(res_data))
    },
    get_report_sale_order(req, resp) {
        model.report_sale_order(req.params.stDate, req.params.enDate, (res_data) => resp.json(res_data))
    },
    get_report_SO_by_item(req, resp) {
        model.find_SO_by_item(req.params.stDate, req.params.enDate, req.params.inItem, (res_data) => json(res_data))
    },
    get_report_purchase(req, resp) {
        model.report_purchase(req.params.stDate, req.params.enDate, (res_data) => resp.json(res_data))
    },
    get_report_PO_by_item(req, resp) {
        model.find_PO_by_item(req.params.stDate, req.params.enDate, req.params.inItem, (res_data) => resp.json(res_data))
    },
    edit_item_tran(req, resp) {
        model.edit_item_tran(req.body, (res_data) => resp.json(res_data))
    },
    create_item_tran(req, resp) {
        model.find_by_doc("SO", (res_newDoc) => {
            model.create_item_tran(res_newDoc, req.body, (res_data) => {
                resp.json(res_data)
            })
        })
    },
    create_new_item(req, resp) {
        var getBarcode = req.body[0].barcode
        if (getBarcode != "") {
            model.create_new_item("", req.body, (res_data) => {
                resp.json(res_data)
            })
        } else {
            model.find_by_doc("JB", (res_newDoc) => {
                model.create_new_item(res_newDoc, req.body, (res_data) => {
                    resp.json(res_data)
                })
            })
        }
    }
}
module.exports = {
    Controller: Controller
}