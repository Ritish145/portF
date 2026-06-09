pipeline {
  agent any

  environment {
    EC2_HOST = '13.59.134.56'
    EC2_USER = 'ec2-user'
    WEB_ROOT = '/usr/share/nginx/html'
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Pulling latest code from GitHub...'
        checkout scm
      }
    }

    stage('Deploy to EC2') {
      steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'KEYFILE')]) {
          bat '''
            ssh -i "%KEYFILE%" -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "mkdir -p /tmp/site"
            scp -i "%KEYFILE%" -o StrictHostKeyChecking=no -r index.html css js %EC2_USER%@%EC2_HOST%:/tmp/site/
            ssh -i "%KEYFILE%" -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "sudo rm -rf %WEB_ROOT%/* && sudo cp -r /tmp/site/* %WEB_ROOT%/ && sudo systemctl reload nginx"
          '''
        }
      }
    }
  }

  post {
    success { echo 'Deployed! Visit http://13.59.134.56' }
    failure { echo 'Deploy failed - check the stage logs above.' }
  }
}
