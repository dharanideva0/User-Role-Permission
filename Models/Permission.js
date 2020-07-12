module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define("Permission", {
        module: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permission: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['create', 'edit', 'delete', 'view'],
            defaultValue: 'view'
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        }
    });

    Permission.associate = (models) => {
        Permission.belongsTo(models.Role, {
            foreignKey: {
                allowNull: false,
            },
            onDelete: 'cascade'
        });
    };
    return Permission;
};