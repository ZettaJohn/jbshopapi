const { connDB } = require("../../config")
const { sqlQuery, fnPublic } = require("../../services")
var sql_select, sql_insert, sql_update, nameTB, nameFN, sql_values=""

const model = {
    find_best_seller() {
        return new Promise((resolve, resject) => {
            nameFN = "find_best_seller"
            nameTB = "jbshop_item_master"
            sql_select = "SELECT * FROM jbshop_item_master WHERE best_seller > 0 ORDER BY best_seller"
            sqlQuery.sql_select(connDB, nameTB, nameFN, sql_select)
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    },
    create_new_item(newBarcode, inData) {
        return new Promise((resolve, reject) => {
            nameFN = "create_new_item"
            nameTB = "jbshop_item_master"
            inData.forEach((val, i) => {
                var getBarcode = (val.barcode == "") ? newBarcode : val.barcode;
                sql_insert = "INSERT INTO jbshop_item_master \
                (barcode \
                ,item_name\
                ,old_price\
                ,new_price\
                ,unit\
                ,last_update\
                ,user_update)\
                VALUES\
                ('"+ getBarcode + "'\
                ,'"+ val.item_name + "'\
                ,'"+ val.old_price + "'\
                ,'"+ val.new_price + "'\
                ,'"+ val.unit + "'\
                ,'"+ val.last_update + "'\
                ,'"+ val.user_update + "')\
                ON DUPLICATE KEY UPDATE item_name='"+ val.item_name + "',old_price=new_price,new_price='" + val.new_price + "',unit='" + val.unit + "',last_update='" + val.last_update + "'\
                ,user_update='"+ val.user_update + "' "
            });
            sqlQuery.sql_insert(connDB, nameTB, nameFN, sql_insert)
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    find_by_doc(inDoc) {
        return new Promise((resolve, reject) => {
            var doc_digit = inDoc
            nameFN = "find_by_doc"
            nameTB = "jbshop_doc_master"
            sql_select = "SELECT doc_last FROM jbshop_doc_master WHERE doc_digit LIKE '" + doc_digit + "' "
            sqlQuery.sql_select(connDB, nameTB, nameFN, sql_select)
                .then((response) => {
                    if (response.status === 200) {
                        // console.log("object",response);
                        var new_doc = fnPublic.gen_document(5, inDoc, response.result[0].doc_last)
                        sql_update = "UPDATE jbshop_doc_master SET doc_last='" + new_doc + "' WHERE doc_digit LIKE '" + doc_digit + "' "
                        sqlQuery.sql_insert(connDB, nameTB, nameFN, sql_update)
                            .then((response) => {
                                // console.log("response",response)
                                resolve(new_doc)
                            })
                            .catch((err) => {
                                reject(err)
                            })
                    } else {
                        reject(response)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    search_item(inData) {
        return new Promise((resolve, reject) => {
            nameFN = "search_item"
            nameTB = "jbshop_item_master"
            sql_select = "SELECT *,CONCAT(`barcode`,`item_name`) as search FROM `jbshop_item_master` WHERE CONCAT(`barcode`,`item_name`) LIKE '%" + inData + "%'"
            sqlQuery.sql_select(connDB, nameTB, nameFN, sql_select)
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    },
    find_item(inData) {
        return new Promise((resolve, reject) => {
            nameFN = "search_item"
            nameTB = "jbshop_item_master"
            sql_select = `SELECT * FROM jbshop_item_master WHERE barcode LIKE '${inData}'`
            sqlQuery.sql_select(connDB, nameTB, nameFN, sql_select)
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    },
    search_order(inData){
        return new Promise((resolve, reject) => {
            nameFN = "search_order"
            nameTB = "jbshop_item_sale"
            sql_select = "SELECT * FROM `jbshop_item_sale` WHERE doc_no LIKE '" + inData + "%'"
            sqlQuery.sql_select(connDB, nameTB, nameFN, sql_select)
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    },
    find_order(inData){
        return new Promise((resolve, reject) => {
            nameFN = "find_order"
            nameTB = "jbshop_item_sale"
            sql_select = `SELECT * FROM jbshop_item_sale WHERE doc_no LIKE '${inData}'`
            sqlQuery.sql_select(connDB, nameTB, nameFN, sql_select)
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    },
    create_saleOrder(newDoc, inData) {
        return new Promise((resolve, reject) => {
            nameFN = "find_by_doc"
            nameTB = "jbshop_item_sale"
            sql_values=""
            inData.forEach((val, i) => {
                if (i + 1 == inData.length) {
                    sql_values += "( '" + newDoc + "','" + val.item_id + "','" + val.barcode + "','"+ val.type_tran + "','" + val.item_name + "','" + val.new_price + "','" + (val.item_qty*-1 )+ "','" + val.price + "',\
                    '"+ val.discount + "','" + val.last_update + "','" + val.user_update + "','" + val.unit + "' )"
                } else {
                    sql_values += "( '" + newDoc + "','" + val.item_id + "','" + val.barcode + "','" + val.type_tran + "','" + val.item_name + "','" + val.new_price + "','" + (val.item_qty*-1) + "','" + val.price + "',\
                    '"+ val.discount + "','" + val.last_update + "','" + val.user_update + "','" + val.unit + "' ),"
                }
            });
            sql_insert = "INSERT INTO jbshop_item_sale \
            (doc_no \
            ,item_id \
            ,barcode \
            ,type_tran \
            ,item_name \
            ,item_price \
            ,item_qty \
            ,price \
            ,discount \
            ,create_date \
            ,user_create \
            ,item_unit) \
            VALUES "+ sql_values
            sqlQuery.sql_insert(connDB, nameTB, nameFN, sql_insert)
                .then((response) => { resolve(response) })
                .catch((err) => { reject(err) })
        })
    },
    create_transaction(newDoc, inData) {
        return new Promise((resolve, reject) => {
            nameFN = "find_by_doc"
            nameTB = "jbshop_item_sale"
            sql_values=""
            inData.forEach((val, i) => {
                if (i + 1 == inData.length) {
                    sql_values += "( '" + newDoc + "','" + val.item_id + "','" + val.barcode + "','"+ val.type_tran + "','" + val.item_name + "','" + val.new_price + "','" + (val.item_qty)+ "','" + val.price + "',\
                    '"+ val.discount + "','" + val.last_update + "','" + val.user_update + "','" + val.unit + "','" + val.ref_doc + "','" + val.remark + "' )"
                } else {
                    sql_values += "( '" + newDoc + "','" + val.item_id + "','" + val.barcode + "','" + val.type_tran + "','" + val.item_name + "','" + val.new_price + "','" + (val.item_qty) + "','" + val.price + "',\
                    '"+ val.discount + "','" + val.last_update + "','" + val.user_update + "','" + val.unit + "','" + val.ref_doc + "','" + val.remark + "' ),"
                }
            });
            sql_insert = "INSERT INTO jbshop_item_sale \
            (doc_no \
            ,item_id \
            ,barcode \
            ,type_tran \
            ,item_name \
            ,item_price \
            ,item_qty \
            ,price \
            ,discount \
            ,create_date \
            ,user_create \
            ,item_unit \
            ,ref_doc \
            ,remark) \
            VALUES "+ sql_values
            sqlQuery.sql_insert(connDB, nameTB, nameFN, sql_insert)
                .then((response) => { resolve(response) })
                .catch((err) => { reject(err) })
        })
    }
}
module.exports = {
    model: model
}