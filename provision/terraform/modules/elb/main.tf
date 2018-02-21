# ---------------------------------------------------------------------------------------------------------------------
# CREATE AN ELB
# @see https://www.terraform.io/docs/providers/aws/d/elb.html
# ---------------------------------------------------------------------------------------------------------------------
resource "aws_elb" "elb" {
  name = "${var.name}"
  subnets = ["${var.subnet_id}"]
  security_groups = ["${var.security_groups}"]
  cross_zone_load_balancing = true

  health_check {
    healthy_threshold = "${var.healthy_threshold}"
    unhealthy_threshold = "${var.unhealthy_threshold}"
    timeout = "${var.timeout}"
    interval = "${var.interval}"

    target = "HTTP:${var.port}/${var.health_check_path}"
  }

  listener {
    instance_port = "${var.port}"
    instance_protocol = "${var.protocol}"
    lb_port = "${var.port}"
    lb_protocol = "${var.protocol}"
  }
}
