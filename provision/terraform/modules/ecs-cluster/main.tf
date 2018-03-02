# ---------------------------------------------------------------------------------------------------------------------
# CREATE AN ECS CLUSTER
# @see https://www.terraform.io/docs/providers/aws/d/ecs_cluster.html
# ---------------------------------------------------------------------------------------------------------------------
resource "aws_ecs_cluster" "ecs_cluster" {
  name = "${var.name}"
}

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY AN AUTO SCALING GROUP (ASG)
# Each EC2 Instance in the ASG will register as an ECS Cluster Instance.
#
# @see https://www.terraform.io/docs/providers/aws/r/autoscaling_group.html
# ---------------------------------------------------------------------------------------------------------------------
resource "aws_autoscaling_group" "ecs_cluster_instances" {
  name                 = "${var.name}"
  min_size             = "${var.instance_size}"
  max_size             = "${var.instance_size}"
  launch_configuration = "${aws_launch_configuration.ecs_instance.name}"
  vpc_zone_identifier  = ["${var.subnet_id}"]
  load_balancers       = ["${var.elb}"]

  tag {
    key = "Name"
    value = "${var.name}"
    propagate_at_launch = true
  }
}

# The launch configuration for each EC2 Instance that will run in the ECS
# Cluster
# @see https://www.terraform.io/docs/providers/aws/r/launch_configuration.html
resource "aws_launch_configuration" "ecs_instance" {
  name_prefix = "${var.name}-"
  instance_type = "${var.instance_type}"
  key_name = "${var.key_pair_name}"
  iam_instance_profile = "${aws_iam_instance_profile.ecs_instance.name}"
  security_groups = ["${var.security_groups}"]
  image_id = "${data.aws_ami.ecs.id}"

  # A shell script that will execute when on each EC2 instance when it first boots to configure the ECS Agent to talk
  # to the right ECS cluster
  user_data = <<EOF
#!/bin/bash
echo "ECS_CLUSTER=${var.name}" >> /etc/ecs/ecs.config
EOF

  # Important note: whenever using a launch configuration with an auto scaling
  # group, you must set create_before_destroy = true. However, as soon as you
  # set create_before_destroy = true in one resource, you must also set it in
  # every resource that it depends on, or you'll get an error about cyclic
  # dependencies (especially when removing resources). For more info, see:
  #
  # https://www.terraform.io/docs/providers/aws/r/launch_configuration.html
  # https://terraform.io/docs/configuration/resources.html
  lifecycle {
    create_before_destroy = true
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE AN IAM ROLE FOR EACH INSTANCE IN THE CLUSTER
# We export the IAM role ID as an output variable so users of this module can attach custom policies.
# @see https://www.terraform.io/docs/providers/aws/d/iam_role.html
# ---------------------------------------------------------------------------------------------------------------------

resource "aws_iam_role" "ecs_instance" {
  name = "${var.name}"
  assume_role_policy = "${data.aws_iam_policy_document.ecs_instance.json}"

  # aws_iam_instance_profile.ecs_instance sets create_before_destroy to true, which means every resource it depends on,
  # including this one, must also set the create_before_destroy flag to true, or you'll get a cyclic dependency error.
  lifecycle {
    create_before_destroy = true
  }
}

# To attach an IAM Role to an EC2 Instance, you use an IAM Instance Profile
# @see https://www.terraform.io/docs/providers/aws/d/iam_instance_profile.html
resource "aws_iam_instance_profile" "ecs_instance" {
  name = "${var.name}"
  role = "${aws_iam_role.ecs_instance.name}"

  # aws_launch_configuration.ecs_instance sets create_before_destroy to true, which means every resource it depends on,
  # including this one, must also set the create_before_destroy flag to true, or you'll get a cyclic dependency error.
  lifecycle {
    create_before_destroy = true
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# ATTACH IAM POLICIES TO THE IAM ROLE
# The IAM policy allows an ECS Agent running on each EC2 Instance to communicate with the ECS scheduler.
# @see https://www.terraform.io/docs/providers/aws/r/iam_role_policy.html
# ---------------------------------------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "ecs_cluster_permissions" {
  name = "ecs-cluster-permissions"
  role = "${aws_iam_role.ecs_instance.id}"
  policy = "${data.aws_iam_policy_document.ecs_cluster_permissions.json}"
}

# ---------------------------------------------------------------------------------------------------------------------
# Data Blocks
# Define data for the resources to use
# @see https://www.terraform.io/docs/configuration/data-sources.html
# ---------------------------------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "ecs_cluster_permissions" {
  statement {
    effect = "Allow"
    resources = ["*"]
    actions = [
        "ecs:CreateCluster",
        "ecs:DeregisterContainerInstance",
        "ecs:DiscoverPollEndpoint",
        "ecs:Poll",
        "ecs:RegisterContainerInstance",
        "ecs:StartTelemetrySession",
        "ecs:Submit*",
        "ecs:StartTask",
        "ecr:BatchCheckLayerAvailability",
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer",
        "ecr:GetAuthorizationToken",
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogStreams",
    ]
  }
}

# Fetch the AWS ECS Optimized Linux AMI. Note that if you've never launched this AMI before, you have to accept the
# terms and conditions on this webpage or the EC2 instances will fail to launch:
# https://aws.amazon.com/marketplace/pp/B00U6QTYI2
data "aws_ami" "ecs" {
  most_recent = true
  owners = ["amazon"]
  filter {
    name = "name"
    values = ["amzn-ami-*-amazon-ecs-optimized"]
  }
}

data "aws_iam_policy_document" "ecs_instance" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}
