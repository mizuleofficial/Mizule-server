const userSeeds = require('./seeds/user.seed')

const db = require('../database/database')

db.User.bulkCreate(userSeeds).then((res) => console.log(res)).catch(err => console.log(err))