const express = require('express')
const cors = require('cors')
const setupSwagger = require('./swagger');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const carRoutes = require('./routes/car.routes');
const errorHandler = require('./middlewares/error.handler');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({data: "hello word!"})
});

app.use('/api/v1/cars', carRoutes);
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});

