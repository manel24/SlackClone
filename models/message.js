export default (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {

        text: {
            type: DataTypes.STRING,
        },
    });
    Message.associate = (models) => {
        // 1: M relations
        Message.belongsTo(models.User, {
            foreignKey: 'userId'
        })
        Message.belongsTo(models.Channel, {
            foreignKey: 'channelId'
        })
    };
    return Message;
};