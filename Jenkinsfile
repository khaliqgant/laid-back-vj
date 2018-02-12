pipeline {
  agent any
  stages {
    stage('ECR login') {
      steps {
        script {
          sh("eval \$(aws ecr get-login --no-include-email --region eu-west-1 | sed 's|https://||')")
        }

      }
    }
    stage('Build and push docker images') {
      steps {
        script {
          docker.build('lbv-nginx', '-f ./provision/nginx/Dockerfile .')
          docker.withRegistry(ECR_REPO, ECRCRED)
          {
            docker.image('lbv-nginx').push('latest')
          }
          docker.build('lbv-node', '-f ./provision/node/Dockerfile .')
          docker.withRegistry(ECR_REPO, ECRCRED)
          {
            docker.image('lbv-node').push('latest')
          }
        }
      }
    }
  }
  environment {
    PROJECT = 'lbv'
    ECR_REPO = 'http://568063086568.dkr.ecr.eu-west-1.amazonaws.com'
    ECRCRED = 'ecr:eu-west-1:lbv-deployer'
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '3'))
  }
}
