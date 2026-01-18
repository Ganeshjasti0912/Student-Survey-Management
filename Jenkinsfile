pipeline {
  agent any

  environment {
    DOCKERHUB_CREDS = 'dockerhub-creds'     // Jenkins credential id (usernamePassword)
    DB_USER_CREDS   = 'db-username'         // Jenkins credential id (Secret text)
    DB_PASS_CREDS   = 'db-password'         // Jenkins credential id (Secret text)

    BACKEND_IMAGE   = 'ganesh0912/student-survey-backend'
    FRONTEND_IMAGE  = 'ganesh0912/student-survey-frontend'

    KUBECONFIG      = '/var/lib/jenkins/.kube/config'

    // K8s settings
    NAMESPACE       = 'default'
    DB_SECRET_NAME  = 'survey-db-secret'    // must match your backend-deployment.yaml secretKeyRef name
  }

  stages {

    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build & Push Backend Image') {
      steps {
        script {
          def tag = "${env.BUILD_NUMBER}"

          withCredentials([
            usernamePassword(credentialsId: env.DOCKERHUB_CREDS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
          ]) {
            sh """
              set -e
              docker login -u "$DOCKER_USER" -p "$DOCKER_PASS"
              docker build -t ${BACKEND_IMAGE}:${tag} backend/
              docker push ${BACKEND_IMAGE}:${tag}
            """
          }
        }
      }
    }

    stage('Build & Push Frontend Image') {
      steps {
        script {
          def tag = "${env.BUILD_NUMBER}"

          withCredentials([
            usernamePassword(credentialsId: env.DOCKERHUB_CREDS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
          ]) {
            sh """
              set -e
              docker login -u "$DOCKER_USER" -p "$DOCKER_PASS"
              docker build -t ${FRONTEND_IMAGE}:${tag} frontend/
              docker push ${FRONTEND_IMAGE}:${tag}
            """
          }
        }
      }
    }

    stage('Create/Update DB Secret in K8s') {
      steps {
        script {
          withCredentials([
            string(credentialsId: env.DB_USER_CREDS, variable: 'DB_USERNAME'),
            string(credentialsId: env.DB_PASS_CREDS, variable: 'DB_PASSWORD')
          ]) {
            sh """
              set -e
              # create/update secret safely (no "already exists" problem)
              kubectl -n ${NAMESPACE} create secret generic ${DB_SECRET_NAME} \
                --from-literal=DB_USERNAME="$DB_USERNAME" \
                --from-literal=DB_PASSWORD="$DB_PASSWORD" \
                --dry-run=client -o yaml | kubectl -n ${NAMESPACE} apply -f -
            """
          }
        }
      }
    }

    stage('Apply K8s Manifests') {
      steps {
        sh """
          set -e
          kubectl -n ${NAMESPACE} apply -f k8s/backend-deployment.yaml
          kubectl -n ${NAMESPACE} apply -f k8s/backend-service.yaml
          kubectl -n ${NAMESPACE} apply -f k8s/frontend-deployment.yaml
          kubectl -n ${NAMESPACE} apply -f k8s/frontend-service.yaml
        """
      }
    }

    stage('Rollout New Images') {
      steps {
        script {
          def tag = "${env.BUILD_NUMBER}"

          sh """
            set -e
            # IMPORTANT: container names must match your YAML: backend container name + frontend container name
            kubectl -n ${NAMESPACE} set image deployment/student-survey-backend backend=${BACKEND_IMAGE}:${tag}
            kubectl -n ${NAMESPACE} set image deployment/student-survey-frontend frontend=${FRONTEND_IMAGE}:${tag}

            kubectl -n ${NAMESPACE} rollout status deployment/student-survey-backend
            kubectl -n ${NAMESPACE} rollout status deployment/student-survey-frontend
          """
        }
      }
    }

    stage('Show Service URLs') {
      steps {
        sh """
          echo "----- Services -----"
          kubectl -n ${NAMESPACE} get svc
          echo ""
          echo "Frontend URL:  http://3.128.142.229:30081/survey"
          echo "Backend URL:   http://3.128.142.229:30080/api/surveys"
        """
      }
    }
  }

  post {
    always {
      echo "Pipeline finished."
    }
  }
}
