module.exports = (sequelize, DataTypes) => {
    const Zule = sequelize.define("zules", {
        id_zule: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_zuleSpot: {
            type: DataTypes.STRING,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []
        },
        category: {
            type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []
        },
        views: {
            type: DataTypes.JSON,
            defaultValue: { teaser: [], zule: [] }
        },
        CBFC_rating: {
            type: DataTypes.STRING,
            defaultValue: 'U/A',
            validate: {
                max: 5, min: 1
            }
        },
        reviews: {
            type: DataTypes.JSON,
            defaultValue:
                { comments: [], likes: [] },
        }
    })

    // Zule.sync({force:true}).then(() => console.log('ZULE MODEL CREATED')).catch((err) => console.log('ERROR ' + err))

    return Zule
}