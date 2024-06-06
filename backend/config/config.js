require('dotenv').config();

const serverConfig = {
    port: process.env.PORT || 3001,
    databaseURI: process.env.DatabaseURI || 'mongodb://localhost:27017/employeetask',
    jwtSecret: process.env.JWT_SECRET
};

module.exports = serverConfig;
