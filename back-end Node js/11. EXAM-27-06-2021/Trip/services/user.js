const User = require('../models/User');


async function createUser(email, gender, hashedPassword) {
    //TODO adapt to the current project

    const user = new User({
        email,
        gender,
        hashedPassword
    });

    await user.save();

    return user;
}

// async function getUserByUsername(username) {
//     const pattern = new RegExp(`^${username}$`, 'i');
//     const user = await User.findOne({username: {
//         $regex: pattern} });
//     return user;

// }

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const userEmail = await User.findOne({email: {
        $regex: pattern} });
    return userEmail;

}

module.exports = {
    createUser,
    getUserByEmail

};