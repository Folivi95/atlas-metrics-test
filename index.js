require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3200;

app.listen(PORT, async () => {
    console.log('Server running on ', PORT);
})