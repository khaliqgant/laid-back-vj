resource "aws_ecr_repository" "repository" {
  count = "${length(var.repositories)}"
  name  = "${element(var.repositories, count.index)}"
}
