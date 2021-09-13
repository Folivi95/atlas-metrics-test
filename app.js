const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const AppError = require('./config/appError');
const errorHandler = require('./server/controllers/errorController');
const emissionRouter = require('./server/routes/emissionRoutes');
const statRouter = require('./server/routes/statRoutes');

app.use(cors());
app.options('*', cors());
app.use(helmet());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('short'));
app.use(express.static('public'));

app.use('/api/v1/emissions', emissionRouter);
app.use('/api/v1/stats', statRouter);


app.get('/', (req, res, next) => {
    res.send("Welcome to Atlas Metrics Test");
})

app.use((req, res, next) => {
    let err = new AppError(`${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`, 404);
    next(err);
});

app.use(errorHandler);
module.exports = app;