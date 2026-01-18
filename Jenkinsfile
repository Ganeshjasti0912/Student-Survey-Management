pipeline {
  agent any

  environment {
    DOCKERHUB_CREDS = 'dockerhub-creds'

    BACKEND_IMAGE = 'ganesh0912/student-survey-backend'
    FRONTEND_IMAGE = 'ganesh0912/student-survey-frontend'

    KUBECONFIG = '/var/lib/jenkins/.kube/config'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build & Push Backend') {
      steps {
        script {
          def tag = "${env.BUILD_NUMBER}"
          env.BACKEND_TAG = tag
          dir('backend') {
            sh """
              docker build -t ${BACKEND_IMAGE}:${tag} .
              echo \$DOCKERHUB_PASS | docker login -u \$DOCKERHUB_USER --password-stdin
              docker push ${BACKEND_IMAGE}:${tag}
            """
          }
        }
      }
      environment {
        DOCKERHUB_USER = credentials('dockerhub-creds').username
        DOCKERHUB_PASS = credentials('dockerhub-creds').password
      }
    }

    stage('Build & Push Frontend') {
      steps {
        script {
          def tag = "${env.BUILD_NUMBER}"
          env.FRONTEND_TAG = tag
          dir('frontend') {
            sh """
              docker build -t ${FRONTEND_IMAGE}:${tag} .
              echo \$DOCKERHUB_PASS | docker login -u \$DOCKERHUB_USER --password-stdin
              docker push ${FRONTEND_IMAGE}:${tag}
            """
          }
        }
      }
      environment {
        DOCKERHUB_USER = credentials('dockerhub-creds').username
        DOCKERHUB_PASS = credentials('dockerhub-creds').password
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh """
          kubectl --kubeconfig=${KUBECONFIG} apply -f k8s/

          kubectl --kubeconfig=${KUBECONFIG} set image deployment/student-survey-backend \
            backend=${BACKEND_IMAGE}:${BACKEND_TAG}

          kubectl --kubeconfig=${KUBECONFIG} set image deployment/student-survey-frontend \
            frontend=${FRONTEND_IMAGE}:${FRONTEND_TAG}

          kubectl --kubeconfig=${KUBECONFIG} rollout status deployment/student-survey-backend
          kubectl --kubeconfig=${KUBECONFIG} rollout status deployment/student-survey-frontend
        """
      }
    }
  }
}
