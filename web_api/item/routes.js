const { Controller } = require("./controller")

var setup = (router) => {
    router
        // .get("/:code", Controller.get_by_id)
        .get("/", Controller.get_all_item)
        .get("/search-item/:inData",Controller.get_search_item)
        .post("/sell-item/", Controller.create_item_tran)
        .post("/add-item/",Controller.create_new_item)
}
module.exports = {
    setup: setup
}