output "app_vpc_id" {
  value = "${aws_vpc.default.id}"
}

output "app_subnet_id" {
    value = "${aws_subnet.app_subnet.*.id}"
}

output "app_security_groups" {
    value = "${aws_security_group.default.id}"
}
