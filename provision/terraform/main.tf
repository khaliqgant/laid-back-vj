# https://www.terraform.io/docs/providers/aws/index.html
provider "aws" {
  profile = "${var.profile}"
  region  = "${var.region}"
}

module "network" {
  source = "./network"
}

module "ecs-cluster" {
  source = "./ecs-cluster"

  name          = "${var.app}-cluster"
  instance_size = "${var.instance_number}"
  instance_type = "${var.instance_type}"
  key_pair_name = "${var.key_pair}"

  # Reference the network module outputs
  vpc_id          = "${module.network.app_vpc_id}"
  subnet_id       = "${module.network.app_subnet_id}"
  security_groups = "${module.network.app_security_groups}"
  elb             = "${var.app}-elb"

}

# Custom ECR Image for each required
module "nginx_ecr_repository" {
  source = "./ecr-repository"
  name   = "nginx"
}

module "app_ecr_repository" {
  source = "./ecr-repository"
  name   = "app"
}

module "ecs-service-elb" {
  source = "./elb"

  name = "${var.app}-elb"

  vpc_id          = "${module.network.app_vpc_id}"
  subnet_id       = "${module.network.app_subnet_id}"
  security_groups = "${module.network.app_security_groups}"

  healthy_threshold   = "${var.lb_healthy_threshold}"
  unhealthy_threshold = "${var.lb_unhealthy_threshold}"
  timeout             = "${var.lb_timeout}"
  interval            = "${var.lb_interval}"
  port                = "${var.lb_port}"
  health_check_path   = "${var.lb_health_check_path}"
  protocol            = "${var.lb_protocol}"
}

module "ecs-service" {
  source = "./ecs-service"

  name           = "${var.app}-service"
  ecs_cluster_id = "${module.ecs-cluster.app_ecs_cluster_id}"

  nginx_image  = "${module.nginx_ecr_repository.ecr_url}"
  nginx_memory = "${var.app_nginx_memory}"

  image_version  = "${var.app_image_version}"
  app_image      = "${module.nginx_ecr_repository.ecr_url}"
  cpu            = "${var.app_cpu}"
  memory         = "${var.app_memory}"
  desired_count  = "${var.instance_number}"

  app_port       = "${var.app_port}"
  host_port      = "${var.lb_port}"
  container_port = "${var.lb_port}"
  elb_name       = "${var.app}-elb"

  env_vars     = "${var.app_env_vars}"
  num_env_vars = "${var.app_num_env_vars}"
}
