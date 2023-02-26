const zuleSpots = require('./seeds/zuleSpot.seed')

const db = require('../database/database')

db.ZuleSpot.bulkCreate(zuleSpots).then((res) => console.log(res)).catch(err => console.log(err))