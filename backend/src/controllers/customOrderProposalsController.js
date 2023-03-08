const customOrdersProposalsModel = require("../models/customOrderProposalModel.js")
const customOrderModel = require("../models/customOrder.js")



// ******************** get and post Proposals *************************

async function getAllProposalOfSpecificCustomOrder (id){
    
    let wanted_customOrder = await customOrderModel.findOne({_id:id})
    return wanted_customOrder.proposals;
 
}


async function post_new_proposal (customOrderId,proposals_data){
    // console.log("post new proposal here in controller");
    // let new_proposal = await customOrdersProposalsModel.updateOne({_id:id},{$push:{proposals:proposals_data}})
    let flag="";
    await customOrderModel.findOne({_id:customOrderId})
    
    .then((data,error)=>{
        
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",data)
        // console.log("isClosed = ",data.isclosed)
        if(data.isclosed==false){
            // console.log("proposals_data.vendor Id",proposals_data.vendorId);
            // console.log("data . proposals",data.proposals);
            let counter=0 
            console.log("vendorID",proposals_data.vendorId) ;  
            for (let i = 0; i < data.proposals.length; i++) {
                    if(data.proposals[i].userId==proposals_data.userId || data.proposals[i].vendorId==proposals_data.userId){
                      counter++  
                    }  
                      
                }
                console.log("counter= ",counter);
                if(counter==0){
                    // console.log("proposals_data.vendor Id2",proposals_data.vendorId);
                                
                                flag="Done";
                                data.proposals.push(proposals_data)
                                data.save();
                                console.log(" Proposal Pushed")
                                return "Done"
                            }  
                            else{
                                console.log("This vendor can not post another proposal");
                               
                            }   
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


