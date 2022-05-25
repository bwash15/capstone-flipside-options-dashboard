require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const credentials = require('./Middleware/credentials');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const corsOptions = require("./config/corsOptions");
const _authRoutes = require("./_routes/_auth");

// database connection
connection();
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
// middlewares
app.use(express.json());
app.use(cookieParser());

// Publid folder - Global CSS / images / text 
app.use('/', express.static(path.join(__dirname, '/public')));

// routes - Dont want JWT here - it will restrict access to these pages
// we only want to generate a JWT to an authorized user 
app.use("/api/users", userRoutes);  // register page (sign-up)
app.use("/api/auth", authRoutes);  // login page

app.use(verifyJWT);

/**
 * This is where the pages we want to restrict access to go
 * 
 * 
 * 
 */


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        myEmitter.emit(`404pageFoundLogs`, `404 html Page NOT Found`, 'serverActivityLogs', 'html404PageFoundLog.txt');
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        myEmitter.emit(`404pageFoundLogs`, `404 json Page NOT Found`, 'serverActivityLogs', 'json404PageFoundLog.txt');
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 txt Page NOT found');
    }
})

//****************************************************** */
//   ERROR HANDLING
app.use(errorHandler);

//****************************************************** */
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
    myEmitter.emit(`ServerActivityLogs`, `Server Port: ${PORT}`, 'ServerActivityLogs', 'expServLog.txt');
})
