const customOrdersProposalsModel = require("../models/customOrderProposalModel.js")
const customOrderModel = require("../models/customOrder.js")



// ******************** get and post Proposals *************************

async function getAllProposalOfSpecificCustomOrder (id){
    
    let wanted_customOrder = await customOrderModel.findOne({_id:id})
    return wanted_customOrder.proposals;
 
}


async function post_new_proposal (id,proposals_data){
    console.log("post new proposal here in controller");
    // let new_proposal = await customOrdersProposalsModel.updateOne({_id:id},{$push:{proposals:proposals_data}})
    let flag="";
    await customOrderModel.findOne({_id:id})
    
    .then((data,error)=>{
        
        // console.log("aaa",data)
        // console.log("isClosed = ",data.isclosed)
        if(data.isclosed==false){
            flag="Done";

            // for (let i = 0; i < data.proposals.length; i++) {
                // if(data.proposal[i].vendorID!=vendorID){
                    data.proposals
                    data.proposals.push(proposals_data)
                    data.save();
                    console.log("if = ",data.isclosed)
                    return "Done"
                // }
                
            // }
            
            }
            else{
            console.log("else = ",data.isclosed)

                return "Not Done"
            }
        
        
    })

        

    return {
        message:flag,
        status:200,
    }
 
}



module.exports={
    getAllProposalOfSpecificCustomOrder,
    post_new_proposal,
}


// ******************************************** Comments ************************


