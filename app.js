const express = require('express');

const routes = require('./routes/routes');

const app  = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
     'Access-Control-Allow-Headers', 'Origin,Access-Control-Allow-Origin, X-Requested, Content-Type, Accept');
     res.header('Access-Control-Allow-Methods','POST, GET');
    next();
})

app.use('/api', routes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route!', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSend) {
        return next();
    }
    res.status(error.code || 500)
    .json({message: error.message || 'Something went wrong!'});
    
});

app.listen(process.env.PORT || 5000);