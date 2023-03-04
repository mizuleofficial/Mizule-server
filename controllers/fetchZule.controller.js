const path = require('path');
const { Op, Sequelize } = require('sequelize')

const { Zule, User, ZuleSpot, sequelize } = require('../database/database')

exports.getRandomZules = async (req, res) => {
    try {
        const { offset } = req.query

        const [results, metadata] = await sequelize.findAll({ order: Sequelize.literal('rand()'), limit: 50, offset })

        res.json(results)
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Not Found" })
    }
}

exports.getParticularZule = async (req, res) => {
    try {
        const { id_zule } = req.params

        const zule = await Zule.findByPk(id_zule.split('-')[0], { raw: true })
        const zuleSpot = await ZuleSpot.findByPk(zule.id_zuleSpot, { raw: true })
        if (!(zule && zuleSpot)) return res.status(404).json({ error: "Not Found" })

        res.json({ ...zule, ...zuleSpot })

    } catch (error) {
        return next(new Error(error));
    }
}

exports.feedZule = async (req, res) => {
    try {
        const { id_zule, id_zuleSpot, user_id } = req.params

        const user = await User.findByPk(user_id)
        const zule = await Zule.findByPk(id_zule.split('-')[0])
        const zuleSpot = await ZuleSpot.findByPk(id_zuleSpot)
        // user &&
        if (!(zule && zuleSpot)) return res.status(500).json({ error: 'Invalid request' })

        const zulePath = path.join(__dirname, '../zules', '/', id_zuleSpot, '/', id_zule)
        res.sendFile(zulePath);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Invalid request' })
    }
}


exports.similarZules = async (req, res) => {
    try {
        let { categories } = req.query
        categories = JSON.parse(categories)
        const data = await Zule.findAll({
            where: {
                category: {
                    [Op.overlap]: categories
                }
            }
        })
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Invalid URI' })
    }
}