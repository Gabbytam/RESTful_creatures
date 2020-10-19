//js file for all dinosaur get and posts
const express= require('express');
const router= express.Router();
const fs= require('fs'); //have to also import fs HERE
 
//MIDDLEWARE SECTION
router.use(express.urlencoded({extended: false})); //also need to import middleware HERE

//NOTE: because the index.js file has "app.use('/dinosaurs', require('./controllers/dinosaurs'));" which already designates the first portion of the URL pattern (/dinosaurs), we have to take it out of the URL pattern for the following GET and POSTS

//DINO POST ROUTE
router.post('/', (req, res)=> {
    let dinosaurs= fs.readFileSync('./dinosaurs.json');
    let dinoData= JSON.parse(dinosaurs);
    dinoData.push(req.body); 
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    res.redirect('/dinosaurs');
})

//DINO INDEX ROUTE
router.get('/', (req, res)=> {
    let dinosaurs= fs.readFileSync('./dinosaurs.json'); 
    let dinoData= JSON.parse(dinosaurs);
    
    //CODE FOR FILTERING DINOS
    //handle a query string if there is one 
    let nameFilter= req.query.nameFilter;
    if(nameFilter){
        dinoData= dinoData.filter(dino => {
            return dino.name.toLowerCase()=== nameFilter.toLowerCase();
        })
    }
    
    res.render('dinosaurs/index.ejs', {dinosaurs: dinoData}); 
})

//DINO NEW ROUTE
    //has to be above show route because show route uses : 
router.get('/new', (req, res)=> {
    res.render('dinosaurs/new.ejs');
})

//DINO SHOW ROUTE, RESTful routing ex
router.get('/:idx', (req, res)=> {
    let dinosaurs= fs.readFileSync('./dinosaurs.json'); 
    let dinoData= JSON.parse(dinosaurs);
    let dinoIndex= req.params.idx;
    
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex], dinoId: dinoIndex});
})

module.exports= router;