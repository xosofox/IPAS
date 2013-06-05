echo "//" `date` >COMPRESS.js
cat models/* >>COMPRESS.js
cat views/* >>COMPRESS.js
yui-compressor COMPRESS.js >ipas.min.js
