const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body; //we need user and pwd from the request if not send status
    if(!user || !pwd) return res.status(400).json({'message':'User name and password are required'});

    //check for duplicate username in the database 
    const duplicate = await User.findOne({ username: user }).exec();  //exec( ) need to  put accordimg to documrnyt
    if(duplicate) return res.sendStatus(409); // conflict

    try{
        //encrypt the passoword
        const hashedPwd = await bcrypt.hash(pwd, 10)

        //with mongoose we can create and store the new user all at once
        const result = await User.create({ 
            "username": user, 
            "password": hashedPwd 
        });
        
        
        console.log(result);

        res.status(201).json({'success': `new user ${user} created `})
        
    }catch(err){
        res.status(500).json({'message':err.message});
    }

}

module.exports = {handleNewUser};