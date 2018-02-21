# https://www.terraform.io/docs/providers/aws/r/vpc.html
resource "aws_vpc" "default" {
  cidr_block                       = "${var.cidr_block}"
  assign_generated_ipv6_cidr_block = true
}

resource "aws_internet_gateway" "igw" {
  vpc_id = "${aws_vpc.default.id}"
}

# https://www.terraform.io/docs/providers/aws/d/subnet.html
# Multiple subets example: https://github.com/devops-recipes/provision-ecs-cluster-terraform/blob/master/provision-cluster/vpc.tf#L23
resource "aws_subnet" "app_subnet" {
  vpc_id                  = "${aws_vpc.default.id}"
  cidr_block              = "${aws_vpc.default.cidr_block}"
  map_public_ip_on_launch = true
}

resource "aws_route_table" "public-route-table" {
  vpc_id = "${aws_vpc.default.id}"

  route {
    cidr_block = "${var.destination_cidr_block}"
    gateway_id = "${aws_internet_gateway.igw.id}"
  }
}

resource "aws_route_table_association" "public-rtb" {
  count          = "${length(var.availability_zones)}"
  subnet_id      = "${element(aws_subnet.app_subnet.*.id, count.index)}"
  route_table_id = "${aws_route_table.public-route-table.id}"
}

# https://www.terraform.io/docs/providers/aws/d/security_group.html
resource "aws_security_group" "default" {
  name   = "ecs_sg"
  vpc_id = "${aws_vpc.default.id}"

  # SSH access from specified users
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = "${var.app_user_ips}"
  }

  # HTTP access from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "tcp"

    cidr_blocks = [
      "${var.cidr_block}",
    ]
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
