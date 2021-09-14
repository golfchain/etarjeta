export CI_REGISTRY=docker.nextagilesoft.com
export IMAGE_CDN_CLI="$CI_REGISTRY/saas2/cdn/cli:latest"
export IMAGE_HAPROXY_CLI="$CI_REGISTRY/saas2/haproxy-letsencrypt:latest"
export HAPROXY_BACKEND="http://cicd:6300"
export CDN_BACKEND="http://cicd:7001"
export CDN_STATIC_SERVER="cicd:7000"
export APP_HOST="etarjeta.golfchain.golf"
docker login $CI_REGISTRY
docker run --rm -v `pwd`/dist:/dist ${IMAGE_CDN_CLI} upload --host ${APP_HOST} --directory /dist -m ${CDN_BACKEND}
