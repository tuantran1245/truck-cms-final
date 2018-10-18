module.exports = (sequelize, DataTypes) => {
    var Article = sequelize.define('Article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: User,
            //     key: 'id',
            // }
        },
        vehicle_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: Vehicle,
            //     key: 'id',
            // }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
            timestamps: true,
            tableName: 'article',
            underscored: true,
        });

    Article.associate = function (models) {
        Article.belongsTo(models.Vehicle, {
            foreignKey: 'vehicle_id',
            as: 'vehicle'
        });
        Article.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
        Article.hasMany(models.Image, {
            foreignKey: 'article_id',
            as: 'image'
        });    
    };
    return Article;
};