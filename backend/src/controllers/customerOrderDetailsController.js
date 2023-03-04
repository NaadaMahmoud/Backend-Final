const customOrderModel = require("../models/customOrder.js")



async function getCustomOrderDetails_by_id (id){  
    let returnedCustomOrder = await customOrderModel.findOne({_id:id})
    return returnedCustomOrder;
}






module.exports={
    getCustomOrderDetails_by_id
}
