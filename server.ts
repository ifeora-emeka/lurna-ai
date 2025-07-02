import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { setsRouter } from './server/modules/sets/sets.route';
import { authRouter } from './server/modules/auth/auth.route';
import { modulesRouter } from './server/modules/modules/modules.route';
import { unitsRouter } from './server/modules/units/units.route';
import { learningPathRouter } from './server/modules/learning-path/learning-path.route';
import { sequelize } from './server/config/database';
import { initializeAssociations } from './server/models';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// app.use((req, res, next) => {
//   console.log(`[DEBUG] Incoming ${req.method} request to ${req.path}`);
//   console.log('[DEBUG] Request headers:', req.headers);
//   console.log('[DEBUG] Request body:', req.body);
//   next();
// });

app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`[DEBUG] Sending response for ${req.method} ${req.path}`);
    console.log('[DEBUG] Response data:', data);
    return originalSend.call(this, data);
  };
  next();
});

console.log('Registering routes...');
app.use('/api/sets', setsRouter);
app.use('/api/auth', authRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/units', unitsRouter);
app.use('/api/learning-path', learningPathRouter);
console.log('Routes registered');

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

const initDB = async () => {
  try {
    // Initialize model associations
    initializeAssociations();
    
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};

const startServer = async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at: http://localhost:${PORT}/api`);
    console.log(`Sets API available at: http://localhost:${PORT}/api/sets/create`);
  });
};

startServer();

export default app;