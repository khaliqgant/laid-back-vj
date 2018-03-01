variable "app" {
  description = "Application name"
}

variable "instance_number" {
  description = "Number of instances to use in the ECS service"
}

variable "lb_healthy_threshold" {
  description = "Number of healthy instances required for the lb to be healthy"
}

variable "lb_unhealthy_threshold" {
  description = "Number of unhealthy instances required for the lb to be unhealthy"
}

variable "ssh_ips" {
  type        = "list"
  description = "List of IP addresses that can SSH into the instances"
}

variable "instance_type" {
  description = "EC2 instance type"
}

variable "cidr_block" {
  default     = "10.0.0.0/16"
  description = "CIDR block for the VPC"
}

variable "public_cidrs" {
  type        = "list"
  default     = ["10.0.0.0/24", "10.0.1.0/24", "10.0.3.0/24"]
  description = "Public CIDR block for the VPC"
}

variable "availability_zones" {
  type        = "list"
  description = "Availability zones for the app"
}

variable "destination_cidr_block" {
  description = "Specify all traffic to be routed either trough Internet Gateway or NAT to access the internet"
  default     = "0.0.0.0/0"
}

variable "aws_profile" {
  description = "AWS profile to use when provisioning the app. This is set in the ~/.aws directory"
}

variable "aws_region" {
  description = "AWS Region to place your app in"
}

variable "aws_key_pair" {
  description = "AWS key pair to use when creating your ecs instance"
}

variable "app_port" {
  default     = "80"
  description = "Port to run the application off of"
}

variable "lb_health_check_path" {
  description = "Path for the health check to hit when checking for healthy instances"
}

variable "lb_port" {
  description = "Port used when running a health check to the LB"
}

variable "lb_protocol" {
  description = "Protocol used when checking the LB"
  default     = "HTTP"
}

variable "lb_timeout" {
  description = "Timeout allowed when checking the instances in the LB"
}

variable "lb_interval" {
  description = "Interval at which to check the LB instances"
}

variable "app_image_version" {
  description = "Repository version to use when provisoning the app"
  default     = "latest"
}

variable "app_repositories" {
  type        = "list"
  description = "ECR repositories to create when making the app"
}

variable "app_ports" {
    type        = "list"
    description = "The ports for each repository in the app"
}

variable "app_memory_repositories" {
    type        = "list"
    description = "The memory required for each repository"
}
