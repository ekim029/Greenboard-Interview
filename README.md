# Greenboard-Interview

## Overview

This project allows users to archive a website recursively, saving snapshots of all linked pages on the same domain. 
Each snapshot is stored with assets, and users can view past archived versions by timestamp.

## Setup Instructions

### 1. Backend (Node.js)

#### Clone the repository:

git clone 'repo name'

cd 'repo name'


#### Install dependencies:

npm install

Create a .env file in the root directory with: PORT= 'port number'


#### Run the server:

npm run dev

"dev": "nodemon src/index.js"

### 2. Frontend (React)

#### Start the React frontend (assuming in /client folder):

cd client

npm install

npm start


#### Usage

Input a URL to archive the site recursively.
View past snapshots of the archived site by selecting timestamps.
Preview archived snapshots.