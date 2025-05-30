#!/usr/bin/env sh
set -e
npm run build
cp dist/index.html dist/404.html
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:prohetamine/tonbingo.git master:gh-pages
cd -