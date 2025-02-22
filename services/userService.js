const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function registerUser(username, password, confirmPassword) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error("Користувач з таким логіном вже існує");
    }

    if (password !== confirmPassword) {
        throw new Error("Паролі не співпадають");
    }

    const newUser = new User({ username, password });
    await newUser.save();
    
    return newUser;
}

async function loginUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("Неправильний логін або пароль");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Неправильний логін або пароль");
    }

    return user;
}

module.exports = { registerUser, loginUser };