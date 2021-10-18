/*
  This is deploy branch Pipeline
  After build success..
  Push to remote main branch and deploy server
*/

pipeline {
  agent any
  tools {nodejs "node14"}

  stages {
    stage('check node version') {
      steps {
      sh 'npm -v'
      sh 'node -v'
      }
    }

    stage('git pull') {
      steps {
        sh 'cd /home/api_server_dev'
        sh 'git fetch' 
        sh 'git pull'
      }
    }

    stage('build app') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }

    stage('docker build') {
      steps {
        sh 'docker build -t baram987/api_server_dev .'
        sh 'docker images'
      }
    }

    stage('docker push') {
      steps {
        sh 'docker push baram987/api_server_dev'
      }      
    }
  }

  post {
    always {
      echo 'Pipeline Done!'
    }

    success {
      echo 'Build success!'
      sh 'docker stop api_server'
      sh 'docker run -d --rm -p 4010:4010 --name api_server baram987/api_server_dev'
      echo 'Merge & Push main branch...'
      sh 'git checkout main'
      sh 'git merge deploy'
      sh 'git push origin main'
    }
    
    failure {
      echo 'build fail!'
    }

    cleanup {
      echo 'Cleaning none tag images...'
      sh 'docker rmi $(docker images -q -f dangling=true)'
    }
  }
}
