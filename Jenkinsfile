#!/usr/bin/env groovy
node {
  def project = 'pimenta'
  def appName = 'nextstep_frontend_react'
  def project_id = "${project}-success"
  def image = "gcr.io/${project_id}/${appName}"
  def imageTag = "${image}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
  checkout scm

  stage 'Build image'
  sh("docker build -t ${imageTag} .")

  withCredentials([file(credentialsId: "${project}", variable: 'key')]) {
    withEnv(["GOOGLE_APPLICATION_CREDENTIALS=${key}"]) {
      sh("gcloud auth activate-service-account --key-file ${key} --project=${project_id}")
      sh("gcloud container clusters get-credentials ${project} --zone europe-west1-b")

      stage('Push image to registry') {
        sh("gcloud docker -- push ${imageTag}")
      }
      stage('Deploy Application') {
        switch (env.BRANCH_NAME) {
          case "master":
            sh("sed -i.bak 's|##image##|${imageTag}|' ./k8s/deployment.yml")
            sh("kubectl -n nextstep apply -f k8s/deployment.yml")
          case "develop":
            sh("sed -i.bak 's|##image##|${imageTag}|' ./k8s/deployment.yml")
            sh("kubectl -n nextstep-staging apply -f k8s/deployment.yml")
          case "debug":
            echo "## Debug Information"
            sh("gcloud -v")
            sh("gcloud info")
            sh("kubectl config view")
            sh("env")
        }
      }
    }
  }
}
