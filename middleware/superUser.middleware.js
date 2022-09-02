const jwt=require('jsonwebtoken')
const config=require('config')

module.exports=(req, res, next)=>{
    try {
        const token=req.header('x-auth-token')
        if(!token) return res.status(400).json({msg: 'No Token, Authorization Denied'})

        const decode=jwt.verify(token, config.get('jwtToken'))
        req.userInfo=decode.userInfo
        if(decode.userInfo.role!=='1') return res.status(401).json({msg: 'Authorization Denied'})
        next()
    } catch (err) {
        console.error(err.message)
        res.status(400).json({msg: 'Invalid Token'})
    }
} 