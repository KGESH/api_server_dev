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
            git pull origin main
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

    stage('docker run') {
      steps {
        sh 'docker run -d -p 4010:4010 --name api_server baram987/api_server_dev'
      }
    }
  }
}
