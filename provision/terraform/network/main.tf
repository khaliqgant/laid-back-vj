# https://www.terraform.io/docs/providers/aws/r/vpc.html
resource "aws_vpc" "default" {
  cidr_block = "10.0.0.0/16"
}

# https://www.terraform.io/docs/providers/aws/d/subnet.html
# TODO https://github.com/devops-recipes/provision-ecs-cluster-terraform/blob/master/provision-cluster/vpc.tf
# https://github.com/devops-recipes/provision-ecs-cluster-terraform/blob/master/provision-cluster/terraform.tfvars
resource "aws_subnet" "app_subnet_1" {
  vpc_id                  = "${aws_vpc.default.id}"
  cidr_block              = "10.0.0.0/24"
  map_public_ip_on_launch = true
  tags                    = {
      name: "app_subnet_1"
  }
}

# https://www.terraform.io/docs/providers/aws/d/subnet.html
resource "aws_subnet" "app_subnet_2" {
  vpc_id                  = "${aws_vpc.default.id}"
  cidr_block              = "10.0.0.0/24"
  map_public_ip_on_launch = true
  tags                    = {
      name: "app_subnet_2"
  }

}

# https://www.terraform.io/docs/providers/aws/d/internet_gateway.html
resource "aws_internet_gateway" "gw" {
  vpc_id = "${aws_vpc.default.id}"
}

# https://www.terraform.io/docs/providers/aws/d/security_group.html
resource "aws_security_group" "default" {
  name   = "ecs_sg"
  vpc_id = "${aws_vpc.default.id}"

  # SSH access from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP access from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# https://www.terraform.io/docs/providers/aws/d/security_group.html
resource "aws_security_group" "elb" {
  name = "ecs_elb_sg"

  vpc_id = "${aws_vpc.default.id}"

  # HTTP access from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
