const express = require('express')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({data: "hello word!"})
});

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});

