import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { setsRouter } from './server/modules/sets/sets.route';
import { authRouter } from './server/modules/auth/auth.route';
import { modulesRouter } from './server/modules/modules/modules.route';
import { unitsRouter } from './server/modules/units/units.route';
import { learningPathRouter } from './server/modules/learning-path/learning-path.route';
import { assessmentResultRouter } from './server/modules/assessment-result/assessment-result.route';
import { sequelize } from './server/config/database';
import { initializeAssociations } from './server/models';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`[DEBUG] Sending response for ${req.method} ${req.path}`);
    return originalSend.call(this, data);
  };
  next();
});

app.use('/api/sets', setsRouter);
app.use('/api/auth', authRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/units', unitsRouter);
app.use('/api/learning-path', learningPathRouter);
app.use('/api/assessment-results', assessmentResultRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

const initDB = async () => {
  try {
    initializeAssociations();
    
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // We no longer use sync() - all schema changes should go through migrations
    console.log('Database connection initialized - migrations should be run separately');
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
};

const startServer = async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at: http://localhost:${PORT}/api`);
  });
};

startServer();

export default app;