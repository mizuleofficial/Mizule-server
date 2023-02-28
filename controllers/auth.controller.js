const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var uniqid = require('uniqid');

const { User } = require('../database/database')
const { transporter } = require('../utils/nodemailer.util')

exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ where: { email }, raw: true })

        if (user) return res.status(500).json({
            error: 'User already exists'
        });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const id_user = uniqid()

        user = await User.create({
            id_user,
            name: email.split('@')[0],
            email,
            password: hash
        })

        const token = jwt.sign({
            id_user: user.id_user,
            name: user.name,
            email: user.email,
            phone: user.phone,
            followed_zuleSpots: user.followed_zuleSpots,
            subscription: user.subscription,
            history: user.history,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }, process.env.SECRET, {
            expiresIn: 1000 * 60 * 60 * 24 * 7 * 30
        });

        return res.json({
            token,
            ...user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }, raw: true })

        if (!user) return res.status(500).json({ error: 'User does not exist' })
        if (!bcrypt.compareSync(password, user.password))
            return res.status(500).json({
                error: 'Invalid email or password'
            });

        const token = jwt.sign({
            id_user: user.id_user,
            name: user.name,
            email: user.email,
            phone: user.phone,
            followed_zuleSpots: user.followed_zuleSpots,
            subscription: user.subscription,
            history: user.history,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 * 7 * 30
        });

        return res.json({
            token,
            ...user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.loginWithGoogle = async (req, res) => {
    try {
        const { email, name, photo } = req.body;

        let user = await User.findOne({ where: { email }, raw: true })

        if (user) {
            const token = jwt.sign({
                id_user: user.id_user,
                name: user.name,
                email: user.email,
                phone: user.phone,
                followed_zuleSpots: user.followed_zuleSpots,
                subscription: user.subscription,
                history: user.history,
                created_at: user.created_at,
                updated_at: user.updated_at,
            }, process.env.SECRET, {
                expiresIn: 60 * 60 * 24 * 7 * 30
            });
            return res.json({
                token,
                ...user
            });
        } else {
            const id_user = uniqid()

            user = await User.create({
                id_user,
                name,
                email,
                icon: photo,
                password: null
            })

            const token = jwt.sign({
                id_user: user.id_user,
                name: user.name,
                email: user.email,
                phone: user.phone,
                icon: user.icon,
                followed_zuleSpots: user.followed_zuleSpots,
                subscription: user.subscription,
                history: user.history,
                created_at: user.created_at,
                updated_at: user.updated_at,
            }, process.env.SECRET, {
                expiresIn: 1000 * 60 * 60 * 24 * 7 * 30
            });

            return res.json({
                token,
                ...user
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}


exports.verifyEmail = async (req, res) => {
    try {

        const { email } = req.body;

        let user = await User.findOne({ where: { email }, raw: true })

        if (user) return res.status(500).json({
            error: 'User already exists'
        });

        await transporter
            .sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: `Click the link to create your account.`,
                html: `<div>
            <a href="http://mizule/verify">Click here to create your account</a>
            </div>`,
            })
            .then(async () => {
                res.json("ok");
            })
            .catch(async (err) => {
                console.log(err);
                res.json(err);
            });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

exports.resetPasswordVerify = async (req, res) => {
    try {
        const { email } = req.body
        console.log("🚀 ~ file: auth.controller.js:178 ~ exports.forgot= ~ email:", email)

        const user = await User.count({ where: { email } })

        if (!user) return res.status(500).json({ error: 'User does not exist' })

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Reset your Mizule Account's password",
            html: `<a href='http://mizule/reset-password'>Click here to reset your Mizule Account's password</a>`,
        });

        res.json('ok')
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}


exports.resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.count({ where: { email } })
        if (!user) return res.status(500).json({ error: 'User does not exist' })

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);


      await User.update({ password: hash }, { where: { email } })
        res.json('ok')
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ where: { email }, raw: true })
        if (!user) return res.status(500).json({
            error: 'User does not exist.'
        });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        await User.update(
            { password: hash },
            { where: { email } }
        )

        return res.json('ok')
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}