#!/bin/bash
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo "~~~~~~~~~~~~ START DEPLOYING THE BUILD ~~~~~~~~~~~~"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
docker build  -t bueffelundkoi/next-website .
echo "~~~~~~~~~~~~  BUILD DOCKER IMAGE COMPLETED   ~~~~~~~~~~~~"
docker tag bueffelundkoi/next-website eu.gcr.io/bueffelundkoi-website/next-website
echo "~~~~~~~~~~~~  TAGGING DOCKER IMAGE COMPLETED   ~~~~~~~~~~~~"
docker push eu.gcr.io/bueffelundkoi-website/next-website
echo "~~~~~~~~~~~~  PUSHING DOCKER IMAGE COMPLETED   ~~~~~~~~~~~~"
gcloud run deploy next-website --image=eu.gcr.io/bueffelundkoi-website/next-website --region europe-west9 --platform managed --allow-unauthenticated --port 8080
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo "~~~~~~~~~~~  BUILD SUCCESSFULLY DEPLOYED ~~~~~~~~~~~"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"