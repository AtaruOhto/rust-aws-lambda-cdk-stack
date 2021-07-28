rm -r lambda
DOCKER_BUILDKIT=1 docker build -o target . 
mkdir lambda
cp target/release/bootstrap lambda
