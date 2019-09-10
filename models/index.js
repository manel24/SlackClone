import Sequelize from 'sequelize';

const DB = 'slack';
const USER = 'root';
const PASSWORD = 'root';
const DIALECT = 'mysql';


const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        dialect: DIALECT,
        operatorAliases: Sequelize.Op, 
    }
)
// const sequelize = new Sequelize("slack", "postgres", "postgres", { dialect: 'postgres' });

const models = {
    User: sequelize.import('./user'),
    Channel: sequelize.import('./channel'),
    Team: sequelize.import('./team'),
    Message: sequelize.import('./message')


};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;