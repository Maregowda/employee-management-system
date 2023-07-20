require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/verifyJWT');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const { error } = require('console');

//connect to Mongodb
connectDB();

//custom middleware logger
app.use(logger);

//Handle options credentials check - before CORS! 
//and fetch cookies credentialsrequirement
app.use(credentials);

//cross origin resource sharing
app.use(cors(corsOptions));


//built-in middlewares to handle url encoded data
//in other words, from data
//'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
//it will pass css and image to the specified directories
app.use('/', express.static(path.join(__dirname, '/public')));

//it support regex previous versions were not supporting but now it will
//it is using from roots file
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);  //everything after this line will verify JWT
app.use('/employees', require('./routes/api/employees'));

//app.use('/')
app.all('*', (req, res) => {
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')){
        res.json({error: "404 Not Found"});
    }
    else{
        res.type('txt').send("404 Not Found")
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
})
