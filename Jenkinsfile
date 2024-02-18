pipeline {
    agent any

    tools {
        nodejs 'nodejs_21.6.2'
    }

    stages {
        stage('Build') {
            steps {
                //打包项目
                sh 'npm pack'

                //重命名
                sh 'mv hellonode-1.0.0.tgz hellonode-${GIT_COMMIT}.tgz'
            }
        }
        stage('Archieve') {
            steps {
                archiveArtifacts artifacts: "hellonode-${GIT_COMMIT}.tgz", fingerprint: true
            }
        }
        stage('Deploy with Ansible') {
            steps {
                withCredentials([
                    sshUserPrivateKey(credentialsId: '54e6cd1d-d917-4427-ac13-6d7ff0abdc39', keyFileVariable: 'SSH_KEY'),
                    string(credentialsId: '563e5a99-0d79-4b2d-a2e8-0061db54fbf5', variable: 'ANSIBLE_BECOME_PASS')
                ]) {
                    sh '''
                        ansible-playbook \
                        -u guobin \
                        -e "ansible_ssh_private_key_file=${SSH_KEY}" \
                        -e "artifact=../hellonode-${GIT_COMMIT}.tgz" \
                        -e "ansible_become_password=${ANSIBLE_BECOME_PASS}" \
                        -i ansible/inventory.ini \
                        ansible/deploy.yml
                    '''
                }
            }
        }
    }
}
