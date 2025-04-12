const {RecruiterUser}=require('../model/rec')
const {JobApplication}=require('../database/application')

async function userLogin(req,res) {
    try {
        const {email,password}=req.body;
        console.log(email,password);
        
        const user=await RecruiterUser.findOne({email:email,password:password});
        console.log(user);
        
        if(user){
            console.log(1);
            res.status(200).json({userdata:user});
        }else{
            res.status(200).json({data:null});
        }

    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }
}

async function getJobs(req,res){
    
    try {
        const {id}=req.params;
        const jobs=await JobApplication.find({providerId:id});
        console.log(jobs);

        return res.json({message:"Jobs fetched successfully",data:jobs});
        
    } catch (error) {
        
    }

}

module.exports={
    userLogin,
    getJobs
}