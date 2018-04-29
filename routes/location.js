var express = require('express');
var DbProvider = require('../DbProvider').DbProvider;
var router = express.Router();
var dbProvider= new DbProvider('localhost', 27017);

router.post('/', function(req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', '*');

    if(req.body){
        var projectName = req.body.name ;
        var keyword = req.body.keyword? req.body.keyword : "";

        dbProvider.connect()
            .then(
                function() {
                    // Successfully connected to the database
                    // Make the database call and pass the returned promise to the next stage
                    return dbProvider.save(feedback);
                },
                function(err) {
                    // DB connection failed, add context to the error and throw it (it will be
                    // converted to a rejected promise
                    throw("Failed to connect to the dbProvider: " + err);
                })
            // The following `.then` clause uses the promise returned by the previous one.
            .then(
                function(count) {
                    // Successfully counted the documents
                    console.log(count + " documents");
                    dbProvider.close();
                },
                function(err) {
                    // Could have got here by either `dbProvider.connect` or `dbProvider.countDocuments`
                    // failing
                    console.log("Failed to create the documents: " + err);
                    dbProvider.close();
                });
        // dbProvider.save(feedback,  function( error, docs) {
        //     res.send(' user details : ' + JSON.stringify(error));
        //
        // });
    }



});

module.exports = router;