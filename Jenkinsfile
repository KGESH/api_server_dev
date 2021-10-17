pipeline {
  agent any
  tools {nodejs "node14"}

  stages {
    stage('npm') {
      steps {
      sh '''npm -v
      node -v
    '''

      }
    }
    stage('git pull') {
      steps {
        sh '''cd /home/api_server_dev
git pull origin build-path


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