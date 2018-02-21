variable "app" {
    default = "lbv"
}

variable "instance_number" {
    default = 1
}

variable "lb_healthy_threshold" {
    default = "2"
}

variable "lb_unhealthy_threshold" {
    default = "2"
}

variable "app_user_ips" {
    type    = "list"
    default = ["82.164.129.73/32"]
}

variable "instance_type" {
    default = "t2.micro"
}

variable "cidr_block" {
    default     =  "10.0.0.0/16"
}

variable "public_cidrs" {
    type    = "list"
    default = ["10.0.0.0/24", "10.0.1.0/24"]
}

variable "availability_zones" {
    type    = "list"
    default = ["eu-west-1a","eu-west-1b","eu-west-1c"]
}

variable "destination_cidr_block" {
  default     = "0.0.0.0/0"
  description = "Specify all traffic to be routed either trough Internet Gateway or NAT to access the internet"
}

variable "profile" {
    default = "lbv"
}

variable "region" {
    default = "eu-west-1"
}

variable "key_pair" {
    default = "lbv"
}

variable "app_type" {
    default = "node"
}
variable "app_version" {
    default = "8"
}

variable "app_port" {
    default = "80"
}

variable "lb_health_check_path" {
    default = "api"
}

variable "lb_port" {
    default = "80"
}

variable "lb_protocol" {
    default = "HTTP"
}

variable "lb_timeout" {
    default = "5"
}

variable "lb_interval" {
    default = "30"
}

variable "app_image_version" {
    default = "latest"
}

variable "app_nginx_memory" {
    default = "250"
}
variable "app_memory" {
    default = "500"
}

variable "app_cpu" {
    default = "1024"
}

variable "app_num_env_vars" {
    default = "1"
}

variable "app_env_vars" {
    type = "map"
    default = {
        NODE_ENV = "production"
    }
}

