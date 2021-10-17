pipeline {
  agent any
  tools {nodejs "node14"}

  stages {
    stage('npm check') {
      steps {
      sh '''npm -v

      node -v'''

      }
    }
    stage('git pull') {
      steps {
        sh '''cd /home/api_server_dev
git pull origin build


npm install
'''
      }
    }

    stage('docker build & push') {
      steps {
        sh 'docker build -t baram987/api_server_dev .'
        sh 'docker images'
      }

      steps {
        sh 'docker push baram987/api_server_dev'
      }
    }

  }
}
