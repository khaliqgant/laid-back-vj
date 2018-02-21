Terraform Provisioning
==================

# Overview
* Inspiration taken from [provision-ecs-cluster-tarraform](https://github.com/devops-recipes/provision-ecs-cluster-terraform),
[infrastructure-as-code](https://github.com/brikis98/infrastructure-as-code-talk),
and [koding/terraform](https://github.com/koding/terraform/blob/master/examples/aws-elb/main.tf)
* All configuration is handled in the top level variables.tf file for
organizational purposes. Dynamically filled in variables are nested
in the individual modules
