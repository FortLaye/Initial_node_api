const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }catch (e) {
        console.log("Erreur lors du hachage du password :", e);
    }
}

exports.comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    }catch (e) {
        console.log("Erreur lors de la comparaison du password :", e);
    }
}

exports.generateToken = async (user) => {
    try {
        const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }catch (e) {
        console.log("Erreur lors de la génération du token :");
    }
}