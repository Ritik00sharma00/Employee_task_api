// require('dotenv').config();

const serverConfig = {
    port: process.env.PORT || 3000,
    databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/employeetask',
    jwtSecret:  'mysecretkey'
};

module.exports = serverConfig;
