const path = require('path');
try {
  require('dotenv').config();
} catch (e) {
  console.log('Dotenv not loaded, using environment variables');
}

const getDbConfig = () => {
  const dbUrl = process.env.DATABASE_URL;
  
  if (dbUrl && process.env.NODE_ENV === 'production') {
   
    const matches = dbUrl.match(/^postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/);
    
    if (matches) {
      const [, username, password, host, port, database] = matches;
      return {
        username,
        password,
        host,
        port,
        database,
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        },
        logging: false
      };
    }
  }
  
  
  return {
    dialect: 'sqlite',
    storage: path.join(process.env.FLY_APP_NAME ? '/data' : __dirname, 'database', 
      process.env.NODE_ENV === 'test' ? 'test_lurna.sqlite' : 'lurna.sqlite'),
    logging: false
  };
};

const config = getDbConfig();

module.exports = {
  development: {
    ...config,
    logging: console.log
  },
  test: {
    ...config
  },
  production: {
    ...config
  }
};
