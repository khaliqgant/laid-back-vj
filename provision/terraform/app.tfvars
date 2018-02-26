app = "lbv"

aws_profile = "lbv"

aws_region = "eu-west-1"

aws_key_pair = "lbv"

ssh_ips = ["82.164.129.73/32"]

app_repositories = ["nginx", "node"]

instance_type = "t2.micro"

instance_number = 1

lb_healthy_threshold = "2"

lb_unhealthy_threshold = "2"

lb_health_check_path = "api"

lb_port = "80"

lb_protocol = "HTTP"

lb_timeout = "5"

lb_interval = "30"

availability_zones = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
