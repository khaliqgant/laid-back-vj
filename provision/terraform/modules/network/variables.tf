variable "cidr_block" {
    description = "The CIDR block for the VPC"
}

variable "app_user_ips" {
    description = "IP addresses allowed to SSH in"
    type        = "list"
}

variable "destination_cidr_block" {
    description = "Access for the CIDR Block"
}

variable "cidrs" {
    type    = "list"
    description = "Public CIDRS for the subnet to use"
}

variable "availability_zones" {
    type    = "list"
    description = "Zones we want the network to be available in"
}
