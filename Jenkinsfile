pipeline {
  agent any
  stages {
    stage('AWS Login') {
      steps {
        script {
          sh("$(aws ecr get-login --no-include-email --region=eu-west-1)")
        }

      }
    }
    stage('Build and push docker images') {
      steps {
        script {
          docker.build('nginx', '-f ./provision/nginx/Dockerfile .')
          docker.withRegistry(ECR_REPO)
          {
            docker.image('nginx').push('latest')
          }
          docker.build('node', '-f ./provision/node/Dockerfile .')
          docker.withRegistry(ECR_REPO)
          {
            docker.image('node').push('latest')
          }
        }
      }
    }
    stage('Cluster up') {
        steps {
            script {
sh '''APP="lbv"

CLUSTER="${APP}-cluster"
SERVICE="${APP}-service"
LB="${APP}-elb"
IMAGE="nginx"

ecs-cli compose \\
--file ./docker-compose.prod.yml \\
--project-name ${SERVICE} \\
--cluster ${CLUSTER} \\
--verbose service up \\
--container-name ${IMAGE} \\
--container-port 80 \\
--load-balancer-name ${LB} \\
--deployment-min-healthy-percent 0 \\
--timeout 10
'''
            }
        }
    }
  }
  environment {
    ECR_REPO = credentials('ecr-repo')
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '3'))
  }
}
