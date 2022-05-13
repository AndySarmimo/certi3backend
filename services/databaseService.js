const databaseService = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host : process.env.DB_HOST,
            port : process.env.PORT,
            user : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB,
        }
    });

    //Persona 
    const tableP = 'Person';
    const getPeople = () => {
        return knex(tableP).select();
    };

    const getPersonByEmail = (email, pwd) => {
        return knex(tableP).select()
        .where({email:email ,pwd:pwd});
    };

    const createPerson = ({ personName, lastName, email, pwd }) =>{
        return knex(tableP).insert({
            personName: personName,
            lastName: lastName,
            email: email,
            pwd: pwd
        });
    };



    //DECK
    const tableD = 'Deck' ; 
    const createDeck = ( deckName , idPerson) =>{
        return knex(tableD).insert({
            deckName: deckName,
            idPerson: idPerson,
        });
    };
    const getDeckByIdPerson = (idPerson) => {
        return knex(tableD).select()
        .where({idPerson:idPerson });
    };
    const updateDeckName= (deckName,idDeck) => {
        return knex(tableD)
        .where({idDeck:idDeck })
        .update({deckName:deckName});
    };
    const deleteDeck = (idDeck) => {
        return knex(tableD)
        .where({idDeck:idDeck}).del();
    };

    //FLASHCARD
    const tableF = 'Flashcard' ; 
    const createFlashcard = ( {frontSide, backSide , idDeck }) =>{

        var newDt = new Date().toISOString();
        console.log(newDt)
        return knex(tableF).insert({
            frontSide : frontSide,
            backSide: backSide,
            timestampF : newDt,
            idDeck: idDeck
        });
    };

    const getFlashcardByIdDeck = (idDeck) => {
        return knex(tableF).select()
        .where({idDeck:idDeck });
    };

    const updateFlashcard = ( {frontSide, backSide , idDeck }, idFlashcard) =>{

        
        return knex(tableF)
        .where({idFlashcard:idFlashcard})
        .update({
            frontSide : frontSide,
            backSide: backSide,
            idDeck: idDeck
        });
    };
    const deleteFlashcard = (idFlashcard) => {
        return knex(tableF)
        .where({idFlashcard:idFlashcard}).del();
    };

    return {
        createPerson, 
        getPeople ,
        getPersonByEmail,

        createDeck ,
        getDeckByIdPerson,
        updateDeckName,
        deleteDeck ,
        
        createFlashcard,
        getFlashcardByIdDeck,
        updateFlashcard,
        deleteFlashcard
    }

};

module.exports = {
    databaseService
};