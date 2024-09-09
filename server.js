const express = require('express');
const app = express();
const db = require('./db')
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')
require('dotenv').config()
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send('Welcome to the hotel');
});

app.use('/person',personRoutes)
app.use('/menu',menuItemRoutes)
// Start the server and log a message to confirm it's running
app.listen(PORT,()=>{
    console.log('listening at port:3000')
})