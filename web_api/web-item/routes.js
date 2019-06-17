const { Controller } = require("./controller")

var setup = (router) => {
    router
        // .get("/:code", Controller.get_by_id)
        // .get("/", Controller.get_all_item)
        .get("/autocom-search/:inData",Controller.autocom_search)
        .get("/search-item/:inData",Controller.get_search_item)
        .get("/autocom-search-order/:inData",Controller.autocom_search_order)
        .get("/search-order/:inData",Controller.get_search_order)
        .get("/best-seller/",Controller.get_best_seller)
        .post("/sell-item/", Controller.create_saleOrder)
        .post("/add-item/",Controller.create_new_item)
        .post("/purchase-item/",Controller.create_purchase)
        .post("/return-item/",Controller.create_return)
        .post("/claim-item/",Controller.create_claim)
        .post("/adjust-item/",Controller.create_adjust)
}
module.exports = {
    setup: setup
}