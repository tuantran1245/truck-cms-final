module.exports = (sequelize, DataTypes) => {
    var Image = sequelize.define('Image', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: Article,
            //     key: 'id',
            // }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            timestamps: true,
            tableName: 'image',
            underscored: true,
        });
        
    Image.associate = function (models) {
        Image.belongsTo(models.Article, {
            foreignKey: 'article_id',
            as: 'article'
        });
    };
    return Image;
};