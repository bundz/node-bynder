var Promise = require("bluebird");
var OAuth = require("oauth");

class Bynder {

    constructor(keys, url) {
        this.consumer_key = keys.consumer_key;
        this.consumer_secret = keys.consumer_secret;
        this.token = keys.token;
        this.token_secret = keys.token_secret;
        this.url = url;
        this.oauth = new OAuth.OAuth(this.url + '/api/v4/oauth/request_token', this.url + '/api/v4/oauth/access_token', this.consumer_key, this.consumer_secret, '1.0A', null, 'HMAC-SHA1');
        
        this.init();
    }

    init () {
        this.get = {};
        this.get.assets = this.getAssets.bind(this);
        this.get.asset = this.getAssetById.bind(this);
    }

    formatQueryString (options) {

        var query = ''

        if(!options) {

            return query;

        }

        query += '?';

        var keys = Object.keys(options);

        keys.forEach(function (key) {

            query += key;
            query += '=';
            query += options[key];
            query += '&';

        });

        return query.slice(0, query.length - 1);

    }

    getAssets (options) {

        var self = this;

        var query = self.formatQueryString(options);

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/media' + query, self.token, self.token_secret, function (err, data, res) {

                if(err) reject(err);

                resolve(data);
                
            });

        });
    }

    getAssetById (id, version = 0) {
        var self = this;

        var query = self.formatQueryString({version: version});
        
        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/media/' + id + query,
                           self.token,
                           self.token_secret, function (err, data, res) {

                            if(err) reject(err);

                            resolve(data);
            });

        });
    }
}

module.exports = Bynder;
