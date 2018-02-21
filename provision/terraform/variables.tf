variable "app" {
    default = "lbv"
}

variable "instance_number" {
    default = 2
}

variable "instance_type" {
    default = "t2.micro"
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

variable "lb_healthy_threshold" {
    default = "2"
}

variable "lb_unhealthy_threshold" {
    default = "2"
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
