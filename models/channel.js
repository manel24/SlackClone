export default (sequelize, DataTypes) => {
    const Channel = sequelize.define('channel', {

        name:   DataTypes.STRING,
        public: DataTypes.BOOLEAN,
         
    });

    Channel.associate = (models) => {
        // 1: M relations
        Channel.belongsTo(models.Team, {
            foreignKey: 'teamId'
        });

        //N:M
        Channel.belongsToMany(models.User, {
            through: 'channel_member',
            foreignKey: 'channelId'
        })
         
    };
    return Channel;
};