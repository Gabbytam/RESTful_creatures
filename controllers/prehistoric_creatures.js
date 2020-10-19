//js file for all prehistoric_creatures get and post
const express= require('express');
const router= express.Router();
const fs= require('fs'); //have to also import fs HERE

//MIDDLEWARE SECTION
router.use(express.urlencoded({extended: false})); //also need to import middleware HERE
 
//NOTE: because the index.js file has "app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'));" which already designates the first portion of the URL pattern (/prehistoric_creatures), we have to take it out of the URL pattern for the following GET and POSTS

//PH CREATURE GET ROUTE
router.get('/', (req, res)=> {
    let phCreatures= fs.readFileSync('./prehistoric_creatures.json');
    let phData= JSON.parse(phCreatures);
    res.render('prehistoric_creatures/index', {creatures: phData}); 
})

router.post('/', (req, res)=> {
    let phCreatures= fs.readFileSync('./prehistoric_creatures.json');
    let phData= JSON.parse(phCreatures);
    phData.push(req.body);
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(phData));
    res.redirect('/prehistoric_creatures');
})

//PH CREATURE NEW ROUTE
router.get('/new', (req, res)=> {
    res.render('prehistoric_creatures/new');
})

//PH CREATURE SHOW ROUTE (at bottom because of /:)
router.get('/:id', (req, res)=> {
    let phCreatures= fs.readFileSync('./prehistoric_creatures.json');
    let phData= JSON.parse(phCreatures);
    let creatureIndex= req.params.id;
    res.render('prehistoric_creatures/show', {index: creatureIndex, creature: phData[creatureIndex]});
})

module.exports= router;