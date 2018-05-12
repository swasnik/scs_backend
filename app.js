var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var DbProvider = require('./DbProvider').DbProvider;
var app = express();
var url = require('url');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
var dbProvider= new DbProvider('localhost', 27017);



app.get('/location', function(req, res){
    if(req.query){
        let projectName = req.query.name ;
        let keyword = req.query.keyword? req.query.keyword : "";

        console.log(" project name = " + projectName);
        console.log(" keyword = " + keyword);
        try{
             dbProvider.findData(projectName, keyword, function (results) {
                console.log(results.length);
                 res.send({
                     "status":"success",
                     "data":results
                 }) ;
            });

            // console.log(result);
                // .then(
                //     function() {
                //         // Successfully connected to the database
                //         // Make the database call and pass the returned promise to the next stage
                //         console.log( " finished execution")
                //     },
                //     function(err) {
                //         // DB connection failed, add context to the error and throw it (it will be
                //         // converted to a rejected promise
                //         throw("Failed to connect to the dbProvider: " + err);
                //     })
                // // The following `.then` clause uses the promise returned by the previous one.
                // .then(
                //     function(count) {
                //         // Successfully counted the documents
                //         console.log(count + " documents");
                //         dbProvider.close();
                //     },
                //     function(err) {
                //         // Could have got here by either `dbProvider.connect` or `dbProvider.countDocuments`
                //         // failing
                //         console.log("Failed to create the documents: " + err);
                //         dbProvider.close();
                //     });

            // res.send({ data: result}) ;
        }
        catch(err){
            console.log(err);
            res.send({ status: "error"});
            return { status: "error"};
        }


    }
});

module.exports = app;
