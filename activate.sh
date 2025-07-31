#!/bin/bash

# Activate pyenv virtual environment
eval "$(pyenv init -)"
pyenv activate bcn-bicing

# Navigate to frontend and start expo
cd frontend
npm install

# Navigate back to project root
cd ..
