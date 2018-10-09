:: I use following global installed npm modules
:: https://www.npmjs.com/package/uglify-js-es6     v. 2.8.9
:: https://www.npmjs.com/package/uglifycss         v. 0.0.29

cmd /c uglifyjs src\executr.js -o build\executr.min.js
cmd /c uglifycss src\executr.css --output build\executr.min.css
