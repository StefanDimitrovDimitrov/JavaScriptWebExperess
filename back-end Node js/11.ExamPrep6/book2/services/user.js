const User = require('../models/User');


async function createUser(username, email, hashedPassword) {
    //TODO adapt to the current project

    const user = new User({
        username,
        email,
        hashedPassword
    });

    await user.save();

    return user;
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({username: {
        $regex: pattern} });
    return user;

}

async function getUserByEmail(username) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const email = await User.findOne({email: {
        $regex: pattern} });
    return email;

}

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail
};