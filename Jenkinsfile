#!/usr/bin/env groovy

pipeline {
  agent any
    stages {
      stage('Build') {
        steps {
          checkout scm
          sh 'docker build -t opendigitaleducation/node-pdf-generator:latest .'
        }
      }
      stage('Publish') {
        steps {
          checkout scm
          sh 'docker push opendigitaleducation/node-pdf-generator:latest'
        }
      }
    }
}

