variable "name" {
  description = "Name of the ECS Cluster"
}

variable "instance_size" {
  description = "The number of ec2 instances to run in the ECS Cluster"
}

variable "instance_type" {
  description = "Type of instance to run in the Cluster"
}

variable "key_pair_name" {
  description = "Name of the key pair to use for each instance"
}

variable "vpc_id" {
  description = "The ID of the VPC in which to deploy the ECS Cluster."
}

variable "subnet_id" {
  description = "The subnet IDs in which to deploy the EC2 Instances of the ECS Cluster."
}

variable "security_groups" {
  description = "Security group(s) for the instances"
}

variable "elb" {
    description = "Name of the ELB the cluster should attach to"
}
