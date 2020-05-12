#!/bin/bash

function waitForHerokuPendingBuilds() {
    echo 'starting: wait for heroku pending builds script'
    local MAX_RETRIES=20
    for i in $(seq 1 ${MAX_RETRIES}); do
        local buildStatus
        buildStatus=$(heroku builds --app ${HEROKU_APP})
        if [[ $buildStatus == *"pending"* ]]; then
            echo "Retry $i unsuccessful. Pending build on heroku. Retrying in 1 min."
            sleep 1m
        else
            echo 'No pending builds on heroku. Continuing the deployment.'
            return
        fi

        if [[ $i -eq ${MAX_RETRIES} ]]; then
            echo "Wait timeout for pending heroku builds exceeded. Exiting."
            exit 1
        fi
    done
    echo 'finished waiting'
}

waitForHerokuPendingBuilds
