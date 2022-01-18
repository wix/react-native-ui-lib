echo "You will need to enter github username in order to deploy docs"
read username

echo "Building components docs files..."
npm run docs:build;

echo "Building docs site..."
(cd ./docuilib && npm run build)

echo "Deploying docs..."
(cd ./docuilib && GIT_USER=$username npm run deploy)