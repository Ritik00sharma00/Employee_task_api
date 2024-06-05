const jwt=require('jsonwebtoken');


const generateJWT=(payload,secretKey,expiresIn='1h')=>
{
    try
    {
        const token=jwt.sign(payload,secretKey,{expiresIn});
        return token;
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
};



const verifyJWT=(token,secretKey)=>{
    try{
        const decoded=jwt.verify(token,secretKey);
        return decoded;
    }
    catch(err)
    {
        console.error('Error verifying JWT token:', err.message);
        return null;
    }
}

module.exports = {
    generateJWT,
    verifyJWT
};
