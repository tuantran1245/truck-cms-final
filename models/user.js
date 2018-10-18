module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('vehicle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                isEmail: true
            }
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        identity_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        license_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }
    }, {
            timestamps: true,
            tableName: 'user',
            underscored: true,
        });

    User.associate = function (models) {
        User.hasMany(models.Vehicle, {
            foreignKey: 'user_id',
            as: 'user'
        });
        User.hasMany(models.Article, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };

    return User;
};

// 'use strict';
// module.exports = function (sequelize, DataTypes) {
//     var User = sequelize.define('User', {
//         first_name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 len: [2, 10]
//             }
//         },
//         last_name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 len: [2, 10]
//             }
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isEmail: true
//             }
//         },
//         date_register: {
//             type: DataTypes.STRING,
//             defaultValue: sequelize.fn('NOW')
//         },
//         photo: {
//             type: DataTypes.STRING
//         }
//     }, {
//             classMethods: {
//                 associate: function (models) {
//                     User.hasMany(models.Vehicle, {
//                         foreignKey: 'user_id',
//                         as: 'vehicle'
//                     });

//                     User.hasMany(models.Article, {
//                         foreignKey: 'user_id',
//                         as: 'vehicle'
//                     });

//                 }
//             }
//         });
//     return User;
// };