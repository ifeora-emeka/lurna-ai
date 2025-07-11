import { Sequelize, Options } from 'sequelize';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const getDbConfig = (): Options => {
  // Get database URL from environment variables if available
  const dbUrl = process.env.DATABASE_URL;
  
  if (dbUrl && process.env.NODE_ENV === 'production') {
    // If using a cloud database (e.g., PostgreSQL)
    // Parse the database URL
    const matches = dbUrl.match(/^postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/);
    
    if (matches) {
      const [, username, password, host, port, database] = matches;
      return {
        username,
        password,
        host,
        port: parseInt(port),
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
  
  // Default to SQLite for development and testing
  const dbDir = path.join(process.env.FLY_APP_NAME ? '/data' : process.cwd(), 'database');
  const dbPath = path.join(dbDir, 
    process.env.NODE_ENV === 'test' ? 'test_lurna.sqlite' : 'lurna.sqlite');

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  return {
    dialect: 'sqlite',
    storage: dbPath,
    logging: false
  };
};

const config = getDbConfig();
export const sequelize = new Sequelize(config);

export default sequelize;
