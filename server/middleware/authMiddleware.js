import { clerkClient } from "@clerk/express";

const protectAuthEducator = async(req,res,next)=>{
    try{
        const userId = req.auth.userId
    
    const checking = await clerkClient.users.getUser(userId)

    if(checking.publicMetadata.role ==!'educator'){
        return res.status(404).json({
            success: false,
            error: true,
            message: 'Unauthorized Access'
        })
    }
    next()
    }catch(err){
        res.status(404).json({
            success: false,
            error: true,
            message: err.message
        })
    }
}
export default protectAuthEducator