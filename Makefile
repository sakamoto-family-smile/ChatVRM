GOOGLE_CLOUD_PROJECT=youyaku-ai
GOOGLE_REGION=asia-northeast1
DOCKER_BASE_URL=${GOOGLE_REGION}-docker.pkg.dev
DOCKER_URL=${DOCKER_BASE_URL}/${GOOGLE_CLOUD_PROJECT}/line-sakamomo-family-api/vr_chat_front
SERVICE_NAME=sakamomo-family-vr-front
API_PORT=8080
include .env

setup:
	gcloud auth configure-docker ${DOCKER_BASE_URL}

build:
	docker build -t ${DOCKER_URL}:latest .

push_image:
	docker push ${DOCKER_URL}:latest

local_run:
	docker run --name ${SERVICE_NAME} --env-file ./env -p 9000:8080 ${DOCKER_URL}

deploy_run:
	gcloud run deploy ${SERVICE_NAME} \
		--region ${GOOGLE_REGION} \
		--image ${DOCKER_URL} \
		--update-env-vars OPEN_AI_API_KEY=${OPEN_AI_API_KEY} \
		--update-env-vars KOEMOTION_API_KEY=${KOEMOTION_API_KEY} \
		--port ${API_PORT}
