# node-bynder
Bynder sdk for nodejs.

## How it works?

```javascript
var Bynder = require("node-bynder");
var bynder = new Bynder({ consumer_key: "12345678-1234-1234-1234567890123456",
                          consumer_secret: "0000000000000000000",
                          token: "12345678-1234-1234-1234567890123456",
                          token_secret: "aaaaa23232312312312asd"
                        }, "http://yourbynder.url");

bynder.get.asset("86B09440-FB61-450F-AFA65FABF4F5D628", 1)
    .then(function (data) {
        console.log(data);
    });

//It should return something like this
/*
{"userCreated":"User","fileSize":240161,"dateCreated":"2017-05-30T16:47:44Z","copyright":"","width":1967,"archive":0,"brandId":"2D389252-91A2-4EFF-967F62ED8F25382C","tags":["tags"],"id":"86B02440-
FB61-450F-AFA65FABF4F5D628","isPublic":1,"idHash":"4bd9969d0037c178","dateModified":"2017-05-31T13:10:21Z","datePublished":"2017-05-30T16:44:58Z","name":"name","description":"","extension":["jpg"],"heigh
t":1311,"type":"image","orientation":"landscape","watermarked":0,"limited":0,"thumbnails":{"mini":"https://d3cy9zaslanhfa.cloudfront.net/media/592A4778-B008-4791-8B34AA56BBFCA3C5/86209440-FB61-450F-AFA65FABF4F5
D628/mini-B4FCBF62-6C30-4A9E-8ACF59453F4E62A3.jpg","webimage":"https://d3cy9zhslanhfa.cloudfront.net/media/592A4778-B018-4791-8B34AA56BBFCA3C5/86B09440-FB61-450F-AFA65FABF4F5D628/webimage-15E4704B-54D2-4FC7-84B
D8C55D60ADDC3.jpg","thul":"https://d3cy9zhslanhfa.cloudfront.net/media/592A4778-B008-4792-8B34AA56BBFCA3C5/86B09440-FB61-450F-AFA65FABF4F5D628/thul-1790E4F3-BC4D-4608-BCBF17860057D72C.jpg"},"views":9,"downloads
":0,"activeOriginalFocusPoint":{"y":655.5,"x":983.5}}
*/

```

## Which methods are available?

I am still working in this project, so right now we have four methods:

### Get asset by id

bynder.get.asset(id, version=0): It returns an object.

### Get assets by options

bynder.get.assets(options): Options should be an object. There is a lot of parameters you can send to:

**brandId** *(String)*: Brand id, can be retrieved using the Retrieve brands and subbrands call.

**subBrandId** *(String)*: Sub-brand id, can be retrieved using the Retrieve brands and subbrands call.

**categoryId** *(String)*: Category id, can be retrieved using the Retrieve categories call.

**collectionId** *(String)*: Collection id, can be retrieved using the Retrieve collections call.

**ids** *(String)*: Comma-separated list of asset ids. Will return a asset for each existing id.

**propertyOptionId** *(String)*: Comma-separated list of (metaproperty) option ids, can be retrieved using the Retrieve metaproperties call.

**tags** *(String)*: Comma-separated list of tags, can be retrieved using the Retrieve tags call.

**type** *(String)*: Comma-separated list of asset types.

**orientation** *(String)*: Asset orientation.

**property_METAPROPERTY_NAME** *(String)*: Metaproperty option name.

**keyVisual** *(Bool)*: Indicates whether or not the return should only contain assets marked as "limited usage".

**keyword** *(String)*: Search on filenames, tags, extensions, collection names, guidelines, brandstore, campaigns in workflow, enriched PDFs, word documents.

**dateCreated** *(ISO8601 format String)*: Retrieve assets created after this date.

**dateCreatedTo** *(ISO8601 format String)*: Set a date range together with the "dateCreated" parameter.

**dateCreatedOn** *(ISO8601 format String)*: Retrieve assets created on this specific date.

**dateModified** *(ISO8601 format String)*: Retrieve assets modified after this date.

**dateModifiedTo** *(ISO8601 format String)*: Set a date range together with the "dateModified" parameter.

**dateModifiedOn** *(ISO8601 format String)*: Retrieve assets modified on this specific date.

**orderBy** *(String)*: Order of the returned list of assets.

**limit** *(Number)*: Maximum number of results.

**page** *(Number)*: Offset page for results: return the N-th set of limit-results.

**count** *(Number)*: Indicating whether or not the return should include count results.

### Download asset by id
bynder.download.asset(id): It should return an object with "s3_file" attribute which is the url to file.

### Download asset by id and version

bynder.download.assetVersion(id, version): It should return an object with "s3_file" attribute which is the url to file.

### Thank you