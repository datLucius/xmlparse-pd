# xmlparse-pd
XML parsing for meta data, aimed at page designer components

## About Page Designer Meta Data Management
Within the SFCC framework, Page Designer pages are content assets that contain child content assets.

It is a massive time suck whenever you need to manage these meta data files as you currently need to parse these files manually.

... enter some script I've built

## How to use
example usage:
`npm run parsexml homepage-example '/sample.xml' '/parsed'`

This node script accepts three parameters
1. Page Designer page level id
2. Read path, ie. the XML to parse
3. Write path, ie. where you want the parsed XML

NOTE: the paths are relative to index.js

## Related Package
This script leverages [xml2json](https://www.npmjs.com/package/xml2json)
