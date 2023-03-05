const { Zule } = require('../database/database')
const { User } = require('../database/database')

const { AppError } = require('../utils/errorHandlers.util')


exports.historyPost = async (req, res) => {
    const { id_user, id_zule, type } = req.body
    // 1nomg4cleo9ehbd 635e8cffedd93

    var zule = await Zule.findByPk(id_zule, { raw: true })
    var user = await User.findByPk(id_user, { raw: true })

    if (!(user && zule)) throw new AppError('Invalid request', 400)

    var history = type === 'teaser' ? user.history.teasers : user.history.zules
    history = history.filter(h => h !== id_zule)
    history.unshift(id_zule)
    
    await User.update(
        {
            history: type === 'teaser' ? { ...user.history, teasers: history } : { ...user.history, zules: history }
        }, {
        where: { id_user }
    })

    var views = type === 'teaser' ? zule.views.teaser : zule.views.zule

    if (!views.includes(id_user)) {
        views.unshift(id_user)
        await Zule.update(
            {
                views: type === 'teaser' ? { ...zule.views, teaser: views } : { ...zule.views, zule: views }
            }, {
            where: { id_zule }
        })
    }
    return res.json({ history, views })
}

exports.likePost = async (req, res) => {
    const { id_user, id_zule } = req.body
    var zule = await Zule.findByPk(id_zule, { raw: true })
    var user = await User.findByPk(id_user, { raw: true })

    if (!(user && zule)) throw new AppError('Invalid request', 400)

    if (zule.reviews.likes.includes(id_user)) {
        zule.reviews = { comments: zule.reviews.comments, likes: [...zule.reviews.likes.filter(like => like != id_user)] }
    } else {
        zule.reviews = { comments: zule.reviews.comments, likes: [...zule.reviews.likes, id_user] }
    }
    Zule.update(
        {
            reviews: zule.reviews
        }, {
        where: { id_zule }
    })
    return res.json('ok')
}

exports.commentPost = async (req, res) => {
    const { id_user, name, comment, id_zule } = req.body
    const zule = await Zule.findByPk(id_zule)
    let reviews = zule.reviews ? zule.reviews : { comments: [], likes: [] }
    let allComments = [{ id_user, name, comment }, ...reviews.comments]
    reviews.comments = allComments
    await Zule.update({ reviews }, { where: { id_zule } })
    return res.json('ok')
}