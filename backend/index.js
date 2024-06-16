const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// include routers
const searchRouter = require('./src/routers/searchRouter');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(searchRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
