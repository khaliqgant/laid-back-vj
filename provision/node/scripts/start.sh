#!/bin/bash

sudo chown -R node:node /src/storage

forever /src/app.js
