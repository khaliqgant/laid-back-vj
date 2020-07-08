provision:
	cd ./provision/terraform && terraform apply -var-file="app.tfvars"

provision-plan:
	cd ./provision/terraform && terraform plan -var-file="app.tfvars"

provision-destroy:
	cd ./provision/terraform && terraform destroy -var-file="app.tfvars"

jenkins:
	docker-compose -f docker-compose.jenkins.yml up

dev:
	npm run dev

.PHONY: provision provision-plan provision-destroy jenkins dev
