const models = require('../../models/index');
const service = require('./user.service');

exports.signUp = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Le corps de la requête est vide.' });
    }
    const { firstName, lastName, email, password, avatar } = req.body;

    models.User.findOne({
        where : {email}
    }).then((user) => {
        if (user) {
            return res.status(401).json({ error: 'L\'utilisateur existe déjà.' });
        }
        next();
    })

    const imageBlob = avatar ? Buffer.from(avatar, 'base64') : null;

    service.hashPassword(password)
        .then(hashedPassword => {
            models.User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                avatar: imageBlob
            }).then(user => res.status(201).json(user))
             .catch(next);
        })
        .catch(err => res.status(500).json({ error: err}))
}

exports.signIn = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Le corps de la requête est vide.' });
    }
    const { email, password } = req.body;

    models.User.findOne({
        where: {
            email
        }
    }).then(user => {
        if (!user) {
            return res.status(500).json({ error: 'Email or Password invalid' });
        }
        service.comparePassword(password, user.password).then((isMatch) => {
            if (!isMatch) {
                return res.status(500).json({ error: 'Email or Password invalid' });
            }
            service.generateToken(user)
                .then((token) => {
                    res.status(200).json({ token });
                }).catch((error) => {
                    res.status(500).json({ error });
            })
        })
    }).catch(next);
}

