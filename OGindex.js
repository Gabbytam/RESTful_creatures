//NOTE: this file is used for reference of what the index.js looked like BEFORE using controllers, contains important notes 

const express= require('express');
const app= express();
const ejsLayouts= require('express-ejs-layouts');
const fs= require('fs'); //import fs 

//middleware section
app.set('view engine', 'ejs');
app.use(ejsLayouts);
//body-parser middleware 
app.use(express.urlencoded({extended: false})); //tells body-parser to capture urlencoded data(form data) and put it in the body field of the request object, allows req.body to work. The {extended: false} ensures that the values in this body will either be strings or arrays

app.get('/', (req, res)=> {
    res.render('home');
})

//---------ALL THINGS DINO-----------
//DINO POST ROUTE
    //tell where to post to in first parameter
app.post('/dinosaurs', (req, res)=> {
    //fs.readFileSync() is a built-in method that is used to read a file and return its contents 
        //grabbing the object (array) from the dinosaurs.json file and returning its contents, the contents are return in JSON string form tho and must be converted to a JS object 
    let dinosaurs= fs.readFileSync('./dinosaurs.json');
    let dinoData= JSON.parse(dinosaurs);
    //console.log(req.body); //NOTE: req is an object and body is a key inside that object. It is holding the info submitted from the form 
    //console.log('this is req', req);
    dinoData.push(req.body); //pushes the new dino into the array

    //fs.writeFileSync() is a synchronous built-in method (suggested only for debugging because it blocks the main thread)
    //first parameter is the file that denotes the path of where the file has to be written
    //second parameter is what will be written to the file 
        //JSON.stringify() takes JS ojbect and translates it to a string 
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs');

})

//DINO INDEX ROUTE
app.get('/dinosaurs', (req, res)=> {
    //in order to read data from dinosaurs.json, fs.readFileSync(), stored in a variable called dinoaurs
    let dinosaurs= fs.readFileSync('./dinosaurs.json'); //is read as a string, needs to be translated to JS object 
    //JSON.parse is a method that will take JSON object and turns it into a JS object
        //NOTE: arrays are a TYPE of JS object
        //do this because data from a web server is always a string and we need to translate that into a JS object 
    let dinoData= JSON.parse(dinosaurs);
    //console.log(dinoData);
    
    //CODE FOR FILTERING DINOS
    //handle a query string if there is one 
    let nameFilter= req.query.nameFilter;
    if(nameFilter){
        dinoData= dinoData.filter(dino => {
            return dino.name.toLowerCase()=== nameFilter.toLowerCase();
        })
    }
    
    res.render('dinosaurs/index.ejs', {dinosaurs: dinoData}); //in the object(2nd argument), dinosaurs is an array 
})

//DINO NEW ROUTE
    //has to be above show route because show route uses : 
app.get('/dinosaurs/new', (req, res)=> {
    res.render('dinosaurs/new.ejs');
})

//DINO SHOW ROUTE, RESTful routing ex
app.get('/dinosaurs/:idx', (req, res)=> {
    let dinosaurs= fs.readFileSync('./dinosaurs.json'); 
    let dinoData= JSON.parse(dinosaurs);

    //get array index from url parameter, grabbing whatever was typed into the url by using params
    let dinoIndex= req.params.idx;
    console.log('this is req.params', req.params); //req.params returns an object with key of what is in the get first argument after : , and a value of what was typed into URL

    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex], dinoId: dinoIndex});
})

//-----------ALL THINGS PREHISTORIC CREATURES-----------
//PH CREATURE GET ROUTE
app.get('/prehistoric_creatures', (req, res)=> {
    let phCreatures= fs.readFileSync('./prehistoric_creatures.json');
    let phData= JSON.parse(phCreatures);
    //console.log(phData);
    res.render('prehistoric_creatures/index', {creatures: phData}); //object includes an array named creatures that has a value of an array that contains the prehistoric_creatures data
})

app.post('/prehistoric_creatures', (req, res)=> {
    //console.log('this is req.body', req.body); //returns and object with the form input data and key name of what was given as name for the input 
    let phCreatures= fs.readFileSync('./prehistoric_creatures.json');
    let phData= JSON.parse(phCreatures);
    //add new input data (object) into the phData array
    phData.push(req.body);
    //saving the new added data to designated file(the where) and the file to add/write(the what)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(phData));
    //then, redirect to the GET /prehistoric_creatures route that renders index page
    res.redirect('/prehistoric_creatures'); //will take you to the GET /prehistoric_creatures route where the creatures are listed and it will now list the updated json--> js data
})

//PH CREATURE NEW ROUTE
//this get route will allow user to view the form at designated URL 
app.get('/prehistoric_creatures/new', (req, res)=> {
    res.render('prehistoric_creatures/new');
})


//PH CREATURE SHOW ROUTE (at bottom because of /:)
app.get('/prehistoric_creatures/:id', (req, res)=> {
    let phCreatures= fs.readFileSync('./prehistoric_creatures.json');
    let phData= JSON.parse(phCreatures);
    //console.log('this is req', req);
    let creatureIndex= req.params.id;
    res.render('prehistoric_creatures/show', {index: creatureIndex, creature: phData[creatureIndex]});
})

app.listen(8000, ()=> {
    console.log('listening on port 8000');
})