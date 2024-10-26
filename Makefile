GOOGLE_CLOUD_PROJECT=youyaku-ai
GOOGLE_REGION=asia-northeast1
DOCKER_BASE_URL=${GOOGLE_REGION}-docker.pkg.dev
DOCKER_URL=${DOCKER_BASE_URL}/${GOOGLE_CLOUD_PROJECT}/line-sakamomo-family-api/vr_chat_front
SERVICE_NAME=sakamomo-family-vr-front
API_PORT=8080
CPU=2
MEMORY_SIZE=4
include .env

setup:
	gcloud auth configure-docker ${DOCKER_BASE_URL}

build:
	docker build -t ${DOCKER_URL}:latest .

push_image:
	docker push ${DOCKER_URL}:latest

local_run:
	docker run --name ${SERVICE_NAME} --env-file ./.env -p 8080:8080 --rm ${DOCKER_URL}

deploy_run:
	gcloud run deploy ${SERVICE_NAME} \
		--region ${GOOGLE_REGION} \
		--image ${DOCKER_URL} \
		--cpu ${CPU} \
		--memory ${MEMORY_SIZE}G \
		--update-env-vars NEXT_PUBLIC_OPEN_AI_API_KEY=${NEXT_PUBLIC_OPEN_AI_API_KEY} \
		--update-env-vars NEXT_PUBLIC_KOEMOTION_API_KEY=${NEXT_PUBLIC_KOEMOTION_API_KEY} \
		--update-env-vars NEXT_PUBLIC_IAP_API_KEY=${NEXT_PUBLIC_IAP_API_KEY} \
		--update-env-vars NEXT_PUBLIC_IAP_AUTH_DOMAIN=${NEXT_PUBLIC_IAP_AUTH_DOMAIN} \
		--port ${API_PORT} \
		--allow-unauthenticated
