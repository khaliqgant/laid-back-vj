resource "aws_ecr_repository" "repository" {
  name = "${var.name}"
}
