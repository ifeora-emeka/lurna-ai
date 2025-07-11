import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { setsRouter } from './server/modules/sets/sets.route';
import { authRouter } from './server/modules/auth/auth.route';
import { modulesRouter } from './server/modules/modules/modules.route';
import { unitsRouter } from './server/modules/units/units.route';
import { learningPathRouter } from './server/modules/learning-path/learning-path.route';
import { assessmentResultRouter } from './server/modules/assessment-result/assessment-result.route';
import { assessmentRouter } from './server/modules/assessments/assessments.route';
import { sequelize } from './server/config/database';
import { initializeAssociations } from './server/models';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001');

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
app.use('/api/assessments', assessmentRouter);

app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ 
      status: 'error', 
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

const isDev = process.env.NODE_ENV !== 'production';

if (!isDev) {
  console.log('Production mode: serving Next.js build');
  
  app.use(express.static(path.join(__dirname, '..', 'public')));
  
  app.use('/_next/static', express.static(path.join(__dirname, '..', '.next/static')));
  app.use('/_next', express.static(path.join(__dirname, '..', '.next')));
}

const initDB = async () => {
  try {
    initializeAssociations();
    
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    console.log('Database connection initialized - migrations should be run separately');
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
};

const startServer = async () => {
  await initDB();
  
  if (isDev) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at: http://localhost:${PORT}/api`);
      console.log('Start Next.js with: npm run dev (in another terminal)');
    });
  } else {
    const next = require('next');
    const nextApp = next({ 
      dev: false, 
      dir: path.resolve(__dirname, '..'),
      conf: {
        distDir: '.next'
      }
    });
    
    const handle = nextApp.getRequestHandler();
    
    await nextApp.prepare();
    console.log('Next.js app prepared successfully');
    
    app.get(/^\/(?!api\/).*/, (req, res) => {
      return handle(req, res);
    });
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at: http://localhost:${PORT}/api`);
      console.log(`Frontend available at: http://localhost:${PORT}`);
    });
  }
};

startServer();

export default app;