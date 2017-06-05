// load module
const vufo = require('vuforiajs');
const request = require('request');
const fs = require('fs');

let tempImg = 'temporary.jpg'

let options = {
    // provision_access_key
    'accessKey': '58cdd20f6c529853080e9b40e26aad0e83ba8cbb',
    // server_secret_key
    'secretKey': 'e04ef47448b678c3cf1480d520d0c1aa6052b163'
};

class Vuforia {

  constructor() {
    // init client with valid credentials
    this.client = vufo.client(options);
    // util for base64 encoding and decoding
    this.util = vufo.util();
  }

  addTarget( name, uri ) {
    const scope = this
    this.download( uri, tempImg, function() {
      console.log("uri", uri, "tempimg", tempImg);
      var target = {

        // name of the target, unique within a database
        'name':tempImg,
        // width of the target in scene unit
        'width': 32.0,
        // the base64 encoded binary recognition image data
        'image': scope.util.encodeFileBase64( tempImg ),
        // indicates whether or not the target is active for query
        'active_flag': true,
        // the base64 encoded application metadata associated with the target
        'application_metadata': scope.util.encodeBase64( tempImg )
      };

      return new Promise((resolve, reject) => {
        scope.client.addTarget(target, function (error, result) {
          if (error) {
               reject(error);
          } else {
              console.log(result);
              resolve(result);
          }
        } );
      } );
    } )


  }

  listTargets() {
    return new Promise((resolve, reject) => {
      this.client.listTargets(function (error, result) {
        if (error) {
             reject(error);
        } else {
             resolve(result);
        }

      });
    });
  }

  retrieveTarget( id ) {
    return new Promise((resolve, reject) => {
      this.client.retrieveTarget( id, function (error, result) {
        if (error) {
             reject(error);
        } else {
             resolve(result);
        }
      });
    });
  }

  updateTarget( id, update ) {
    return new Promise((resolve, reject) => {
      this.client.updateTarget( id, update, function (error, result) {
        if (error) {
             reject(error);
        } else {
            // util.decodeBase64(application_metadata);
            resolve(result);
        }

      });
    });
  }

  deleteTarget( id ) {
    return new Promise((resolve, reject) => {
      this.client.deleteTarget( id, function (error, result) {
        if (error) {
             reject(error);
        } else {
            resolve(result);
        }
      });
    });
  }

  download( uri, filename, callback ) {
    request.head( uri, function( err, res, body ) {
      request( uri ).pipe( fs.createWriteStream( filename ) ).on( 'close', callback );
    });
  }
}

module.exports = new Vuforia();
