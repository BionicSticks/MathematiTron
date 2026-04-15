import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { loadCurriculum } from './services/curriculum/graph';
import { initProblemBank } from './services/problems/bank';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import curriculumRoutes from './routes/curriculum';
import dashboardRoutes from './routes/dashboard';
import progressRoutes from './routes/progress';
import conversationRoutes from './routes/conversations';
import onboardingRoutes from './routes/onboarding';
import practiceRoutes from './routes/practice';
import insightsRoutes from './routes/insights';
import settingsRoutes from './routes/settings';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3000');

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

async function startServer() {
  // Load curriculum graph and problem bank into memory
  await loadCurriculum();
  await initProblemBank();

  if (process.env.NODE_ENV !== 'production') {
    // In development, set up Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built client files
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.join(__dirname, 'public')));

    // SPA fallback
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  }

  const server = createServer(app);
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
