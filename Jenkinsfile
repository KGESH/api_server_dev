pipeline {
  agent any
  stages {
    stage('git') {
      steps {
        sh '''cd /home/api_server_dev

git pull origin dockerize

ls
pwd
whoami'''
      }
    }

  }
}