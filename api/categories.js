const app = require( "express" )();
const server = require( "http" ).Server( app );
const bodyParser = require( "body-parser" );
const Datastore = require( "nedb" );
const async = require( "async" );


app.use( bodyParser.json() );

module.exports = app;

 
let categoryDB = new Datastore( {
    filename: process.env.APPDATA +"/POS/server/databases/categories.db",
    autoload: true
} );

console.log(process.env.APPDATA);
categoryDB.ensureIndex({ fieldName: '_id', unique: true });

/*
 * Add the bakery's standard categories without deleting or replacing any
 * categories already entered by the store. Existing names are compared
 * case-insensitively so repeated app starts do not create duplicates.
 */
const defaultCategories = [
    "Mithai",
    "Bakery items",
    "Cakes",
    "Biscuits & Nankhatai",
    "Ice cream",
    "Desi ghee",
    "Snacks & beverages"
];

categoryDB.find({}, function (findError, existingCategories) {
    if (findError) {
        console.error("Could not check default product categories:", findError);
        return;
    }

    const existingNames = new Set(
        existingCategories.map(function (category) {
            return String(category.name || "").trim().toLowerCase();
        })
    );

    const missingCategories = defaultCategories
        .filter(function (name) {
            return !existingNames.has(name.toLowerCase());
        })
        .map(function (name, index) {
            return {
                _id: Date.now() + index,
                name: name
            };
        });

    if (missingCategories.length === 0) {
        return;
    }

    categoryDB.insert(missingCategories, function (insertError) {
        if (insertError) {
            console.error("Could not seed default product categories:", insertError);
        } else {
            console.log("Added " + missingCategories.length + " default bakery categories.");
        }
    });
});

app.get( "/", function ( req, res ) {
    res.send( "Category API" );
} );


  
app.get( "/all", function ( req, res ) {
    categoryDB.find( {}, function ( err, docs ) {
        res.send( docs );
    } );
} );

 
app.post( "/category", function ( req, res ) {
    let newCategory = req.body;
    newCategory._id = Math.floor(Date.now() / 1000); 
    categoryDB.insert( newCategory, function ( err, category) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
} );



app.delete( "/category/:categoryId", function ( req, res ) {
    categoryDB.remove( {
        _id: parseInt(req.params.categoryId)
    }, function ( err, numRemoved ) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
} );

 

 
app.put( "/category", function ( req, res ) {
    categoryDB.update( {
        _id: parseInt(req.body.id)
    }, req.body, {}, function (
        err,
        numReplaced,
        category
    ) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
});



 