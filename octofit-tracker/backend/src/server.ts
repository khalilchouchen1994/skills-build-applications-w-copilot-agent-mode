import express from 'express';
import { apiBaseUrl } from './config/apiUrl.js';
import './config/database.js';
import apiRoutes from './routes/api.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_request, response) => {
  response.json({
    baseUrl: apiBaseUrl,
    service: 'octofit-tracker-api',
    status: 'ok',
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});
