pipeline {
  agent any

  environment {
    DOCKERHUB_CREDS = 'dockerhub-creds'

    BACKEND_IMAGE   = 'ganesh0912/student-survey-backend'
    FRONTEND_IMAGE  = 'ganesh0912/student-survey-frontend'

    KUBECONFIG      = '/var/lib/jenkins/.kube/config'

    // Flags
    KUBE_APPLY_FLAGS = '--validate=false --insecure-skip-tls-verify=true'
    KUBE_TLS_FLAGS   = '--insecure-skip-tls-verify=true'

    NAMESPACE       = 'default'
    DB_SECRET_NAME  = 'survey-db-secret'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build & Push Images') {
      steps {
        script {
          def tag = "${env.BUILD_NUMBER}"

          withCredentials([
            usernamePassword(credentialsId: env.DOCKERHUB_CREDS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
          ]) {
            sh """
              set -e
              echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin

              docker build -t ${BACKEND_IMAGE}:${tag} -f backend/survey_page/Dockerfile backend/survey_page
              docker push ${BACKEND_IMAGE}:${tag}

              docker build -t ${FRONTEND_IMAGE}:${tag} -f frontend/Dockerfile frontend
              docker push ${FRONTEND_IMAGE}:${tag}
            """
          }
        }
      }
    }

    stage('Update DB Secret') {
      steps {
        withCredentials([
          string(credentialsId: 'db-username', variable: 'DB_USERNAME'),
          string(credentialsId: 'db-password', variable: 'DB_PASSWORD')
        ]) {
          sh """
            set -e
            kubectl \$KUBE_APPLY_FLAGS -n ${NAMESPACE} create secret generic ${DB_SECRET_NAME} \
              --from-literal=DB_USERNAME="\$DB_USERNAME" \
              --from-literal=DB_PASSWORD="\$DB_PASSWORD" \
              --dry-run=client -o yaml | kubectl \$KUBE_APPLY_FLAGS -n ${NAMESPACE} apply -f -
          """
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          def tag = "${env.BUILD_NUMBER}"

          sh """
            set -e
            kubectl \$KUBE_APPLY_FLAGS -n ${NAMESPACE} apply -f k8s/backend-deployment.yaml
            kubectl \$KUBE_APPLY_FLAGS -n ${NAMESPACE} apply -f k8s/backend-service.yaml
            kubectl \$KUBE_APPLY_FLAGS -n ${NAMESPACE} apply -f k8s/frontend-deployment.yaml
            kubectl \$KUBE_APPLY_FLAGS -n ${NAMESPACE} apply -f k8s/frontend-service.yaml

            kubectl \$KUBE_TLS_FLAGS -n ${NAMESPACE} set image deployment/student-survey-backend backend=${BACKEND_IMAGE}:${tag}
            kubectl \$KUBE_TLS_FLAGS -n ${NAMESPACE} set image deployment/student-survey-frontend frontend=${FRONTEND_IMAGE}:${tag}

            kubectl \$KUBE_TLS_FLAGS -n ${NAMESPACE} rollout status deployment/student-survey-backend
            kubectl \$KUBE_TLS_FLAGS -n ${NAMESPACE} rollout status deployment/student-survey-frontend
          """
        }
      }
    }

    stage('URLs') {
      steps {
        echo 'Frontend: http://3.128.142.229:30081/survey'
        echo 'Backend : http://3.128.142.229:30080/api/surveys'
      }
    }
  }
}
