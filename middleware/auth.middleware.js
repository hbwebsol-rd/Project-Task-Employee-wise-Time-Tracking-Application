const jwt=require('jsonwebtoken')
const config=require('config')
 
module.exports.superUser=(req, res, next)=>{
    try {
        const token=req.header('x-auth-token')
        if(!token) return res.status(400).json({message: 'No Token, Authorization Denied'})

        const decode=jwt.verify(token, config.get('jwtToken'))
        req.userInfo=decode.userInfo
        if(decode.userInfo.role!==1) return res.status(401).json({message: 'Authorization Denied'})
        next()
    } catch (err) {
        console.error(err.message)
        res.status(400).json({message: 'Invalid Token'})
    }
}

module.exports.employee=(req, res, next)=>{
    try {
        const token=req.header('x-auth-token')
        if(!token) return res.status(400).json({message: 'No Token, Authorization Denied'})

        const decode=jwt.verify(token, config.get('jwtToken'))
        req.userInfo=decode.userInfo
        if(decode.userInfo.role!==2) return res.status(401).json({message: 'Authorization Denied'})
        next()
    } catch (err) {
        console.error(err.message)
        res.status(400).json({message: 'Invalid Token'})
    }
}

module.exports.multiAccess=(req, res, next)=>{
    try {
        const token=req.header('x-auth-token')
        if(!token) return res.status(400).json({message: 'No Token, Authorization Denied'})

        const decode=jwt.verify(token, config.get('jwtToken'))
        req.userInfo=decode.userInfo
        next()
    } catch (err) {
        console.error(err.message)
        res.status(400).json({message: 'Invalid Token'})
    }
}