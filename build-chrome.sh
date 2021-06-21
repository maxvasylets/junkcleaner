#!/bin/bash -e

# TODO: Replace this file with Webpack or something else

# clean up #####
rm -rf dist && mkdir dist && mkdir dist/js

# build #####
cp -R src/_locales dist/_locales
cp -R src/images dist/images
cp src/*.* dist/

# minify json files
find dist/ -type f -name '*.json' -print0 |
    while IFS= read -r -d '' file
    do
        JSON=$(cat ${file})
        echo "${JSON}" | jq --compact-output > "${file}"
    done

# process js files
cat src/js/settings.js | uglifyjs >> dist/js/bundle.js
cat src/js/ga.js | uglifyjs >> dist/js/bundle.js
cat src/js/lib.js | uglifyjs >> dist/js/bundle.js
cat src/js/background.js | uglifyjs >> dist/js/bundle.js

cat src/js/content.js | uglifyjs >> dist/js/content.js
cat src/js/options.js | uglifyjs >> dist/js/options.js

# archive #####
(cd dist/; zip -rq "../junkcleaner.zip" *)

echo "DONE"
