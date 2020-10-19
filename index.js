const express= require('express');
const app= express();
const ejsLayouts= require('express-ejs-layouts');
const fs= require('fs'); //import fs 

//MIDDLEWARE SECTION
app.set('view engine', 'ejs');
app.use(ejsLayouts);
//added middleware to direct express to where the routes are contained if a url pattern starts with /prehistoric_creatures or /dinosaurs
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'));
app.use('/dinosaurs', require('./controllers/dinosaurs'));

//body-parser middleware 
app.use(express.urlencoded({extended: false})); //tells body-parser to capture urlencoded data(form data) and put it in the body field of the request object, allows req.body to work. The {extended: false} ensures that the values in this body will either be strings or arrays

app.get('/', (req, res)=> {
    res.render('home');
})

app.listen(8000, ()=> {
    console.log('listening on port 8000');
})