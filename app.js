const express = require('express');

const routes = require('./routes/routes');

const app  = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
     'Access-Control-Allow-Headers', 'Origin,Access-Control-Allow-Origin, X-Requested, Content-Type, Accept');
     res.header('Access-Control-Allow-Methods','POST');
    next();
})

app.use('/api', routes);

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!'})
    
})

app.listen(5000);
