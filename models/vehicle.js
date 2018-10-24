module.exports = (sequelize, DataTypes) => {
    var Vehicle = sequelize.define('Vehicle', {
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
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER
        },
        description: { //Kết cấu xe nền
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.STRING
        },
        base_lenght: {
            type: DataTypes.INTEGER
        },
        ground_space: { //Khoảng sáng gầm xe
            type: DataTypes.INTEGER
        },
        min_circle_radius: { //Bán kính vòng quay tối thiểu
            type: DataTypes.FLOAT
        },
        weight_total: {
            type: DataTypes.INTEGER
        },
        weight_self: {
            type: DataTypes.INTEGER
        },
        max_speed: {
            type: DataTypes.FLOAT
        },
        slope_capacity: {
            type: DataTypes.FLOAT
        },
        seat_number: {
            type: DataTypes.INTEGER
        },
        engine_name: {
            type: DataTypes.STRING
        },
        engine_type: {
            type: DataTypes.STRING
        },
        piston_volume: {
            type: DataTypes.INTEGER
        },
        compress_ratio: {
            type: DataTypes.STRING
        },
        max_power: {
            type: DataTypes.STRING
        },
        max_momen: {
            type: DataTypes.STRING
        },
        engine_position: {
            type: DataTypes.STRING
        },
        fuel_volume: {
            type: DataTypes.INTEGER
        },
        clutch: { //ly hợp
            type: DataTypes.STRING
        },
        gear_box_type: {
            type: DataTypes.STRING
        },
        main_brake: {
            type: DataTypes.STRING
        },
        vice_brake: {
            type: DataTypes.STRING
        },
        hand_brake: {
            type: DataTypes.STRING
        },
        steer_system: {
            type: DataTypes.STRING
        },
        suspension: { // he thong treo
            type: DataTypes.STRING
        },
        wheel_size: {
            type: DataTypes.STRING
        },
        air_conditioner: {
            type: DataTypes.STRING
        },
        sight_light: { //den tin hieu
            type: DataTypes.STRING
        },
        audio_system: {
            type: DataTypes.STRING
        },
        driver_room: {
            type: DataTypes.STRING
        },
        passenger_room: {
            type: DataTypes.STRING
        },
        passenger_door: {
            type: DataTypes.STRING
        },
        side_glass: {
            type: DataTypes.STRING
        },
        floor: {
            type: DataTypes.STRING
        },
        paint_type: {
            type: DataTypes.STRING
        },
        other_item: {
            type: DataTypes.STRING
        },
    }, {
            timestamps: true,
            tableName: 'vehicle',
            underscored: true,
        });

        Vehicle.associate = function(models) {
            Vehicle.belongsTo(models.User, {
              foreignKey: 'user_id',
              //as: 'user'
            });
            Vehicle.hasMany(models.Article, {
              foreignKey: 'vehicle_id',
              //as: 'vehicle'
            });
          };

    return Vehicle;
};