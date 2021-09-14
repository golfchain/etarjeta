export CI_REGISTRY=docker.nextagilesoft.com
export IMAGE_CDN_CLI="$CI_REGISTRY/saas2/cdn/cli:latest"
export IMAGE_HAPROXY_CLI="$CI_REGISTRY/saas2/haproxy-letsencrypt:latest"
export HAPROXY_BACKEND="http://cicd:6300"
export CDN_BACKEND="http://cicd:7001"
export CDN_STATIC_SERVER="cicd:7000"
export APP_HOST="etarjeta.golfchain.golf"
docker login $CI_REGISTRY
docker run --rm ${IMAGE_HAPROXY_CLI} backend add --backend-url=${HAPROXY_BACKEND} --host=${APP_HOST} --frontend=https -a=${CDN_STATIC_SERVER}
