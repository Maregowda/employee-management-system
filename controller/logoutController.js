const User = require('../model/User');

const handleLogout = async (req, res) => {
//On client, also delete the accessToken


    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204); // no content but successfull
    const refreshToken = cookies.jwt;

    //is refreshToken in db
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);//successful no content
    }
    
    //delete the refresh tocken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();//found user is the document we obtained so we need to save
    console.log(result);

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true}); //secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = {handleLogout};