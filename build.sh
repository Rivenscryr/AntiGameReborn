#!/usr/bin/env bash
mkdir tmp
cp -r js loca skin bootstrap.js chrome.manifest icon.png install.rdf license.txt tmp
cd tmp
for i in js/*.js; do uglifyjs $i -o $i; done
for i in skin/*.css skin/*/*.css; do yuicompressor --type css -o $i $i; done
zip -qr antigameorigin.xpi js loca skin bootstrap.js chrome.manifest icon.png install.rdf license.txt
zip -qr antigameorigin.xpi js loca skin bootstrap.js chrome.manifest icon.png install.rdf license.txt
cd ..
cp tmp/antigameorigin.xpi .
rm -rf tmp
sha1sum antigameorigin.xpi