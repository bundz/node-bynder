var Promise = require("bluebird");
var OAuth = require("oauth");
var request = require('request');
var xml = require('xml2js');

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

    init() {

        this.get = {};
        this.get.assets = this.getAssets.bind(this);
        this.get.asset = this.getAssetById.bind(this);
        this.get.metaproperties = this.getMetaproperties.bind(this);
        this.get.brands = this.getBrands.bind(this);
        this.get.categories = this.getCategories.bind(this);
        this.download = {};
        this.download.asset = this.downloadAsset.bind(this);
        this.download.assetVersion = this.downloadAssetByVersion.bind(this);
        this.get.tags = this.getTags.bind(this);
        this.get.collections = this.getCollections.bind(this);

    }

    formatQueryString(options) {

        var query = ''

        if (!options) {

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

    getAssets(options) {

        var self = this;

        var query = self.formatQueryString(options);

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/media/' + query, self.token, self.token_secret, function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });
    }

    getAssetById(id, versions = 0) {
        var self = this;

        var query = self.formatQueryString({
            versions: versions
        });

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/media/' + id + '/' + query,
                self.token,
                self.token_secret,
                function (err, data, res) {

                    if (err) reject(err);

                    if (data) {
                        data = JSON.parse(data);
                    }

                    resolve(data);
                });

        });
    }

    downloadAsset(id) {
        var self = this;

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/media/' + id + '/download/', self.token, self.token_secret, function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });
    }

    downloadAssetByVersion(id, version) {
        var self = this;

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/media/' + id + '/' + version + '/download/', self.token, self.token_secret, function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });
    }

    getTags(options) {

        var self = this;

        var query = self.formatQueryString(options);

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/tags/' + query, self.token, self.token_secret, function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });

    }

    getCollections(options) {

        var self = this;

        var query = self.formatQueryString(options);

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/collections/' + query, self.token, self.token_secret, function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });
    }

    getMetaproperties(options) {

        var self = this;

        var query = self.formatQueryString(options);

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/metaproperties/', self.token, self.token_secret, function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });
    }

    getBrands() {

         var self = this;

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/brands', self.token, self.token_secret, function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });

    }

    getCategories() {

        var self = this;

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/categories', self.token, self.token_secret, function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });

    }

    async getUploadEndPoint() {

        var self = this;

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/upload/endpoint', self.token, self.token_secret, function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });
    }

    initializeUpload(filename) {
        var self = this;

        var query = self.formatQueryString({filename: filename});

        return new Promise(function (resolve, reject) {

            self.oauth.post(self.url + '/api/upload/init/', self.token, self.token_secret, {filename: filename}, 'application/x-www-form-urlencoded', function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });
    }

    uploadChunk(url, options) {

        var self = this;

        return new Promise(function (resolve, reject) {

            request.post({url: url, formData: options}, function (err, httpResponse, data) {

                if (err) reject(err);

                if (data) {
                    xml.parseString(data, function (err, result) {

                        if(err) return reject(err);

                        return resolve(result);

                    });
                }

            });

        });
    
    }

    registerChunk(options) {

        var self = this;

        return new Promise(function (resolve, reject) {

            self.oauth.post(self.url + '/api/v4/upload/', self.token, self.token_secret, options, 'application/x-www-form-urlencoded', function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });

    }

    finalizeUploadFile(options, id) {

        var self = this;

        return new Promise(function (resolve, reject) {

            self.oauth.post(self.url + '/api/v4/upload/' + id + '/', self.token, self.token_secret, options, 'application/x-www-form-urlencoded', function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });

    }

    saveAsNewAsset(options, id) {

        var self = this;

        return new Promise(function (resolve, reject) {

            self.oauth.post(self.url + '/api/v4/media/save/' + id + '/', self.token, self.token_secret, options, 'application/x-www-form-urlencoded', function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });

    }

    processStateOfFiles(ids) {

        var self = this;

        var query = self.formatQueryString({items: ids});

        return new Promise(function (resolve, reject) {

            self.oauth.get(self.url + '/api/v4/upload/poll/' + query, self.token, self.token_secret, function (err, data, res) {

                if (err) reject(err);

                if (data) {
                    data = JSON.parse(data);
                }

                resolve(data);

            });

        });

    }

}

module.exports = Bynder;
