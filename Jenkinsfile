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
        sh 'git remote update'
        sh 'git checkout deploy'
        sh 'git fetch' 
        sh 'git pull origin deploy'
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
        echo 'docker login..'
        script {
          withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'password', usernameVariable: 'username')]) {
            sh '''
            echo ${password} | docker login -u ${username} -p ${password}
            '''
            def app = docker.build("baram987/api_server_dev")
            app.push("latest")
          }
        }
      }
    }
  }

  post {
    always {
      echo 'Pipeline Done!'
    }

    success {
      echo 'Build success!'
      sh 'docker stop api_server || true'
      sh 'docker run -d --rm -p 4010:4010 --name api_server baram987/api_server_dev'
    }
    
    failure {
      echo 'build fail!!'
    }

    cleanup {
      echo 'Cleaning none tag images...'
      sh 'docker rmi $(docker images -q -f dangling=true)'
    }
  }
}
