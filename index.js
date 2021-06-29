/* eslint no-console: 0 */
var parser = require('xml2json');
var myArgs = process.argv.slice(2);
var fs = require('fs');

var readPath = myArgs[1];
var writePath = myArgs[2];
if (!readPath) {
    console.error('Read path not provided; please provide path to your xml.');
    process.exit(1);
}
if (!writePath) {
    console.error('Write path not provided; please provide path for your parsed xml.');
    process.exit(1);
}

var xml = fs.readFileSync(__dirname + readPath, 'utf8');
var json = parser.toJson(xml, { object: true, reversible: true });
var contentCollection = [];
var content = json && json.library && json.library.content;
var xmlns = json.library.xmlns;
var headtag = `<?xml version="1.0" encoding="UTF-8"?>`;
var libtag = `</library>`;
var xmlStructure = { library: {} };
var collector = function (id) {
    content.forEach(function (el) {
        // grab the content that matches the id passed
        if (el['content-id'] && el['content-id'] === id) {
            contentCollection.push(el);

            // grab the related children
            if (el['content-links'] && el['content-links']['content-link'] && el['content-links']['content-link'].length) {
                var childContent = el['content-links']['content-link'];
                childContent.forEach(function (c) {
                    var cid = c['content-id'];
                    collector(cid);
                });
            }
        }
    });
};
if (!content) {
    console.error('XML Content inaccessible. Please check structure.');
    process.exit(1);
} else {
    collector(myArgs[0]);
}
xmlStructure.library.content = contentCollection;
xmlStructure.library.xmlns = xmlns;

var parsedXml = parser.toXml(JSON.stringify(xmlStructure), { sanitize: true });
parsedXml = headtag + parsedXml;

fs.writeFile(__dirname + writePath, parsedXml, function (err) {
    if (err) {
        console.error(err);
        return;
    }

    console.log('file successfully written at ' + __dirname + writePath);
});
