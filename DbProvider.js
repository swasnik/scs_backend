var MongoClient = require('mongodb').MongoClient;
// var Db = require('mongodb').Db;
// var Connection = require('mongodb').Connection;
// var Server = require('mongodb').Server;
// var BSON = require('mongodb').BSON;
// var ObjectID = require('mongodb').ObjectID;
// var url ;

var scsDBName = "scs";
var smartDBName = "smart";

DbProvider = function(host, port) {
  this.url = "mongodb://"+host+":"+port;//+"/snick";
    // this.scsDBName = this.url + "/" + scsDBName;
    // this.smartDBName = this.url + "/" + smartDBName;
    this.scsDB = null;
    this.smartDB = null;





};


DbProvider.prototype.findData = function(projectName, keyword, callback){
    var _this = this;
    // var results = null;

    MongoClient.connect(this.url, function (err, client) {
        if (err) {
            console.log("Error connecting: " + err.message);
            // Indicate to the caller that the request failed and pass back
            // the error that was returned from "connect"

            // reject(err.message);
            throw err;
        }

        //get db
       // _this.scsDB = client.db(scsDBName);

       // _this.scsDB.collection(projectName).find({$text: {$search: keyword }}).toArray(function(err, result) {
         //   if (err) {
           //     console.log("Error connecting collection: " + err.message);
                // Indicate to the caller that the request failed and pass back
                // the error that was returned from "connect"

                // reject(err.message);
          //      throw err;
        //    }
        //    console.log(result);
            //_this.scsDB.close();
            //return { status: "Success"};
       // });


        _this.smartDB = client.db(smartDBName);

        return _this.smartDB.collection(projectName).find({}).toArray(function(err, result) {
            if (err) {
                console.log("Error connecting collection: " + err1.message);
                // Indicate to the caller that the request failed and pass back
                // the error that was returned from "connect"

                // reject(err.message);
                throw err;
            }


// console.log(" result == " + JSON.stringify(result));

            client.close();
            callback(result);
            // results = result;
            // return results





        });
        // return { status: "Success"};

    });

    // return dbcall;


};



// var connectDB = function(url){
//     var _this = this;
//
//
//     MongoClient.connect(url, function(err, dbName) {
//         if(err) { return console.dir(err);}
//         if (err) {
//             console.log("Error connecting: " + err.message);
//             // Indicate to the caller that the request failed and pass back
//             // the error that was returned from "connect"
//
//             // reject(err.message);
//         }
//         else{
//             if(url === this.scsDBName){
//                 _this.scscdb = db;
//             }
//             else if(url === this.smartDBName){
//                 _this.smartDB = db;
//             }
//         }
//     });
// };
// DbProvider.prototype.connect = function() {
//
//     // Connect to the database specified by the connect string / uri
//
//     // Trick to cope with the fact that "this" will refer to a different
//     // object once in the promise's function.
//     console.log("url is: " + this.url);
//     connectDB(this.scsDBName);
//     connectDB(this.smartDBName);
//
//     if (this.scsDB == null) {
//         console.log("Error connecting: scsdb");
//     }
//
//     if (this.smartDB == null) {
//         console.log("Error connecting: smartDB");
//     }
// };



DbProvider.prototype.close = function() {

    // Close the database connection. This if the connection isn't open
    // then just ignore, if closing a connection fails then log the fact
    // but then move on. This method returns nothing – the caller can fire
    // and forget.

    if (this.scsDB) {
        this.scsDB.close()
            .then(
                function() {},
                function(error) {
                    console.log("Failed to close the database: " + error.message)
                }
            )
    }


    if (this.smartDB) {
        this.smartDB.close()
            .then(
                function() {},
                function(error) {
                    console.log("Failed to close the database: " + error.message)
                }
            )
    }
};


exports.DbProvider = DbProvider;