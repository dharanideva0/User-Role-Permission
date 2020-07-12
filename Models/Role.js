module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        rolename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        }
    });
    Role.associate = (models) => {
        Role.hasMany(models.Permission, {
            onDelete: "cascade",
        });
        Role.belongsTo(models.User, {
            onDelete: 'cascade'
        });
    };

    return Role;
};