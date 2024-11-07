const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const carRoutes = require('./presentation/routes/car.routes');
const authRoutes = require('./presentation/routes/auth.routes');
const errorHandler = require('./middlewares/error.handler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.status(200).json({data: "hello word!"})
});

app.use('/api/v1/cars', carRoutes);
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});

