const { response } = require("express");

module.exports = function(app, databaseService) {

    app.get('/',(req,res) =>{
        //primera info request, del cliente
        // entrega express como devolver la respuesta
        res.status(200).json({"mensjae":"everything ok"});

    });

    /*
        PERSON
    */ 

    //get People
    app.get('/person',(req,res) =>{
        //primera info request, del cliente
        // entrega express como devolver la respuesta
        databaseService.getPeople()
        .then( resultado => {
            res.json(resultado)
        }).catch(e=> res.status(500).json(e));
       
    });
    //get Person by email and pwd
    app.get('/person/:email/:pwd',(req,res) =>{
        //primera info request, del cliente
        // entrega express como devolver la respuesta
        databaseService. getPersonByEmail(req.params.email, req.params.pwd)
        .then( resultado => {
            res.json(resultado)
        }).catch(e=> res.status(500).json(e));
    
    });

    //postPerson
    app.post('/person',(req,res)=>{
        const newPerson = req.body;
        console.log(req.body);
       
        console.log("---------------------");
       // console.log(req)
        databaseService.createPerson(newPerson)
        .then(()=>{
            res.json({"mensjae":"everything ok new person"})
        }).catch(e => {
            res.status(500).json(e)
        });
    });


    /*
    DECK    
    */
    //add deck with name and person id

    app.get('/deck/:idPerson/:deckName',(req,res)=>{
        const idPerson = req.params.idPerson;
        console.log(idPerson);
        const deckName = req.params.deckName;
        console.log(deckName);
       
        console.log("---------------------");
        console.log(req.params.idPerson)
        databaseService.createDeck(deckName, idPerson)
        .then(()=>{
            res.json({"mensaje":"everything ok new deck"})
        }).catch(e => {
            res.status(500).json(e)
        });
       

    });

    //get deck with person id
    app.get('/deckbyPerson/:idPerson',(req,res)=>{
        const idPerson = req.params.idPerson;
        console.log(idPerson);

      
        databaseService.getDeckByIdPerson(idPerson)
        .then((resultado)=>{
            res.json(resultado)
        }).catch(e => {
            res.status(500).json(e)
        });
       
    });

    app.put('/deck/updateName/:idDeck/:idName',(req,res)=>{
       
      
        databaseService.updateDeckName(req.params.idName , req.params.idDeck)
        .then(()=>{
            res.json({"mensaje":"everything ok put deck"})
        }).catch(e => {
            res.status(500).json(e)
        });
       
    });

    
    app.delete('/deleteDeck/:idDeck',(req,res)=>{
      
        databaseService.deleteDeck(req.params.idDeck)
        .then(()=>{
            res.json({"mensaje":"everything ok delete deck"})
        }).catch(e => {
            res.status(500).json(e)
        });
       
    });

    ///FLASHCARD
    //agregar datos, crear
    app.post('/flashcard',(req,res)=>{
        const newFlashcard = req.body;
        console.log(req.body);
       
        console.log("---------------------");
      
        databaseService.createFlashcard(newFlashcard)
        .then(()=>{
            res.json({"mensaje":"everything ok new flash"})
        }).catch(e => {
            res.status(500).json(e)
        });
       

    });

    //get flash cards by id deck
    app.get('/flashcards/:idDeck',(req,res)=>{
        const idDeck = req.params.idDeck;
        console.log(idDeck);

      
        databaseService.getFlashcardByIdDeck(idDeck)
        .then((resultado)=>{
            res.json(resultado)
        }).catch(e => {
            res.status(500).json(e)
        });
       

    });

    app.put('/flashcard/update/:idFlashcard',(req,res)=>{
        databaseService.updateFlashcard(req.body, req.params.idFlashcard)
        .then(()=>{
            res.json({"mensaje":"everything ok put flashcard"})
        }).catch(e => {
            res.status(500).json(e)
        });
       
    });
    app.delete('/deleteFlashcard/:idFlashcard',(req,res)=>{
      
        databaseService.deleteFlashcard(req.params.idFlashcard)
        .then(()=>{
            res.json({"mensaje":"everything ok delete flash"})
        }).catch(e => {
            res.status(500).json(e)
        });
       
    });

};