# dock-vue
Empty starter app for vue with a docker file.

# Prerequesites
* Docker installed

# Setup Environment Variables
* add .env file to application root
  * VUE_APP_DW_DB_URL=https://api.data.world/v0/datasets/wilfongjt
  * VUE_APP_DW_DB_RW_TOKEN=<data-world-db-token>
  * VUE_APP_DW_DB_A_TOKEN=<data-world-admin-token>
* make sure you add .env to your .gitignore


# Docker first version Using Docker Compose for NodeJS Development
* cd dock-vue
* docker build --force-rm -t dock-vue .  
* docker run --rm -p 8080:8080 dock-vue

# Tests
* create data.world table
* drop data.world table

# Clone Repo
* git clone -b <branch-name> https://github.com/Wilfongjt/dock-vue.git
* cd docke-vue
* Setup Environment Variables

# Test Process
* Clone Repo
* cd dock-vue
* Setup Environment Variables
* npm install
* npm run test

# Run Process
* Clone Repo
* cd dock-vue
* Setup Environment Variables
* npm install
* npm run dev
