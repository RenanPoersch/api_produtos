const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');
const produtoRoutes = require('./routes/produtoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/v1/produtos', produtoRoutes);
app.use('/v1/auth', authRoutes);

// healthcheck
app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
