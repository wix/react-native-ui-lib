echo "You will need to enter github username in order to deploy docs"
read username

echo "Building components docs files..."
npm run docs:build;

echo "Building docs site..."
(cd ./packages/uilib-docs && npm run build)

echo "Deploying docs..."
(cd ./packages/uilib-docs && GIT_USER=$username USE_SSH=true npm run deploy)
