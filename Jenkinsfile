pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "${env.BRANCH_NAME}", url: 'https://github.com/dev-lucasn/ReceitaWs.git'
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'develop') {
                        sh '''
                        docker-compose -f ${COMPOSE_FILE} --env-file .env.dev down
                        docker-compose -f ${COMPOSE_FILE} --env-file .env.dev build
                        docker-compose -f ${COMPOSE_FILE} --env-file .env.dev up -d
                        '''
                    } else if (env.BRANCH_NAME == 'main') {
                        sh '''
                        docker-compose -f ${COMPOSE_FILE} --env-file .env.prod down
                        docker-compose -f ${COMPOSE_FILE} --env-file .env.prod build
                        docker-compose -f ${COMPOSE_FILE} --env-file .env.prod up -d
                        '''
                    } else {
                        error "Branch não suportada para deploy automático."
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Deploy concluído com sucesso no ambiente ${env.BRANCH_NAME}!"
        }
        failure {
            echo "Erro no deploy. Verificar container logs."
        }
    }
}
