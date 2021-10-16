pipeline {
  agent any
  stages {
    stage('git pull') {
      steps {
        sh '''cd /home/api_server_dev

git pull origin dockerize


npm install
'''
      }
    }

    stage('docker build push') {
      steps {
        sh 'docker build -t baram987/api_server_dev .'
        sh '''docker images

docker push baram987/api_server_dev'''
      }
    }

  }
}