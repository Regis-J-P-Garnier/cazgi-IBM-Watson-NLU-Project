#!/bin/bash
rep=$(pwd)
cd "/home/project/cazgi-IBM-Watson-NLU-Project"
git config --global user.email "regis.garnier@wanadoo.fr"&&
git config --global user.name "regis garnier"&&
git add . && git commit -m "tmp"&& git push origin --all
cd "${rep}"