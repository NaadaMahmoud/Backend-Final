const customOrdersProposalsModel = require("../models/customOrderProposalModel.js")
const customOrderModel = require("../models/customOrder.js")



// ******************** get and post Proposals *************************

async function getAllProposalOfSpecificCustomOrder (id){
    
    let wanted_customOrder = await customOrderModel.findOne({_id:id})
    return wanted_customOrder.proposals;
 
}


async function post_new_proposal (id,proposals_data){
    console.log("post new proposal here in controller");
    let new_proposal = await customOrdersProposalsModel.updateOne({_id:id},{$push:{proposals:proposals_data}})
    return new_proposal;
 
}



module.exports={
    getAllProposalOfSpecificCustomOrder,
    post_new_proposal,
}


// ******************************************** Comments ************************


