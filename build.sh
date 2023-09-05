npm cache clear --force

npm config set fetch-retry-mintimeout 20000

npm config set fetch-retry-maxtimeout 120000

rm -rf ./packages/markup/dist/

# npm install -g lerna@5.6.2

# npm install

# npm run refresh
# npm run clean
npm run build:clean
# npm run build

# npm run initialize
npm run build:markup
