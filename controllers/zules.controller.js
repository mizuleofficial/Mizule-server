const { Zule } = require('../database/database')
const { User } = require('../database/database')

exports.historyPost = async (req, res) => {
    try {
        const { id_user, id_zule, type } = req.body
        await User.update(
            { history },
            { returning: true, where: { id_user } }
        )
        await User.update(
            { history: sequelize.fn('array_append', sequelize.col('history'), id_user) },
            { where: { id_user } }
        );
        const zule = await Zule.findByPk(id_zule)
        if (!zule.length) return res.status(409).json({ err: 'Invalid request' })
        let views = zule[0].views
        if (type === 'teaser') {
            views = {
                ...views, teaser: views.teaser + 1
            }
        } else {
            views = {
                ...views, zule: views.zule + 1
            }
        }
        await User.update(
            { views },
            { returning: true, where: { id_zule } }
        )
        return res.json('ok')
    } catch (error) {
        return next(new Error(error));
    }
}

exports.likePost = async (req, res) => {
    try {
        const { id_user, id_zule, type } = req.body
        const zule = await Zule.findByPk(id_zule)
        Zule.update(
            {
                reviews: {
                    comments: [...zule.reviews.comments],
                    likes:
                        type === 'like'
                            ? [...reviews.likes, id_user]
                            : reviews.likes.filter((like) => like !== id_user)
                }

            }, {
            where: { id_zule }
        })
        return res.json('ok')
    } catch (error) {
        return next(new Error(error));
    }
}

exports.commentPost = async (req, res) => {
    try {
        const { id_user, name, comment, id_zule } = req.body
        const zule = await Zule.findByPk(id_zule)
        let reviews = zule.reviews ? zule.reviews : { comments: [], likes: [] }
        let allComments = [{ id_user, name, comment }, ...reviews.comments]
        reviews.comments = allComments
        await Zule.update({ reviews }, { where: { id_zule } })
        return res.json('ok')
    } catch (error) {
        return next(new Error(error));
    }
}