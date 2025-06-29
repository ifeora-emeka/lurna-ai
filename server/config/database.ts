import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';

const dbDir = path.join(process.cwd(), 'database');
const dbPath = path.join(dbDir, 'lurna.sqlite');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

export default sequelize;
