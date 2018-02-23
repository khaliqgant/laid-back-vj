AWS_PROFILE = lbv
AWS_REGION := $(shell aws configure get region --profile $(AWS_PROFILE))
AWS_CLUSTER := $(shell aws configure get cluster --profile $(AWS_PROFILE))
AWS_KEYPAIR := $(shell aws configure get keypair --profile $(AWS_PROFILE))
NGINX_REPO = 568063086568.dkr.ecr.eu-west-1.amazonaws.com
NODE_REPO = 568063086568.dkr.ecr.eu-west-1.amazonaws.com

.PHONY: provision
provision:
	cd ./provision/terraform
	terraform apply -var-file="app.tfvars"

.PHONY: provision-plan
provision-plan:
	cd ./provision/terraform && terraform plan -var-file="app.tfvars"

.PHONY: jenkins
jenkins:
	docker-compose -f docker-compose.jenkins.yml up


.PHONY: show-config
show-config:
	@echo $(AWS_PROFILE)
	@echo $(AWS_REGION)
	@echo $(AWS_CLUSTER)
	@echo $(AWS_KEYPAIR)

.PHONY: deploy
deploy:
	docker build -t lbv-nginx -f ./provision/nginx/Dockerfile .
	docker tag lbv-nginx $(NGINX_REPO)/lbv-nginx
	docker push $(NGINX_REPO)/lbv-nginx
	docker build -t lbv-node -f ./provision/node/Dockerfile .
	docker tag lbv-node $(NODE_REPO)/lbv-node
	docker push $(NODE_REPO)/lbv-node
	ecs-cli compose --file ./docker-compose.yml --verbose up

.PHONY: create-repositories
create-repositories:
	aws ecr create-repository --repository-name lbv-nginx --profile $(AWS_PROFILE)
	aws ecr create-repository --repository-name lbv-node --profile $(AWS_PROFILE)

.PHONY: get-login
get-login:
	aws ecr get-login --no-include-email --region $(AWS_REGION) --profile $(AWS_PROFILE)

.PHONY: configure
configure:
	ecs-cli configure --cluster $(AWS_CLUSTER) --profile $(AWS_PROFILE)

.PHONY: create-cluster
create-cluster: configure
	ecs-cli up --keypair $(AWS_KEYPAIR) --force --capability-iam --size 1 --cluster $(AWS_CLUSTER)

