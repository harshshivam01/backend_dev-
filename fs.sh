#!/bin/bash

# Function to display options and capture user selection
show_menu() {
    echo "Select a project type:"
    options=("Frontend" "Backend")
    select opt in "${options[@]}"; do
        case $opt in
            "Frontend")
                setup_frontend
                break
                ;;
            "Backend")
                setup_backend
                break
                ;;
            *)
                echo "Invalid option. Try again."
                ;;
        esac
    done
}

# Function to set up a frontend project
setup_frontend() {
    echo "Setting up a Frontend project..."
    npm create vite@latest $project_name -- --template react
    cd $project_name || exit
    npm install
    npm install axios react-router-dom
    npm install -D tailwindcss postcss autoprefixer
    echo "Setting up Tailwind CSS config ..."
    npx tailwindcss init
    cat > tailwind.config.js <<EOF
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF
    echo -e "\033[1A\033[KSetting up Tailwind CSS config ... Done"
    echo "Setting up Tailwind directives in src/index.css file ..."
    echo "@tailwind base;
@tailwind components;
@tailwind utilities;
" | cat - src/index.css > src/index.temp.css && mv src/index.temp.css src/index.css
    echo -e "\033[1A\033[KSetting up Tailwind directives in src/index.css file... Done"
    echo "Frontend project setup complete."
}

@tailwind base;
@tailwind components;
@tailwind utilities;

# Function to set up a backend project
setup_backend() {
    echo "Setting up a Backend project..."
    mkdir $project_name
    cd $project_name || exit
    echo "Initializing project..."
    echo "Creating package.json file..."
    # npm init -y
    cat > package.json <<EOF
    {
  "name": "$project_name",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
  "keywords": ["Backend", "ExpressJS", "NodeJS", "EshanTyagi"],
  "author": "Mr. Eshank Tyagi",
  "license": "MIT",
  "description": "This is a backend project setup by Eshank Tyagi.",
  "dependencies": {},
  "devDependencies": {}
}
EOF
    echo "Creating package.json file... Done"
    echo "Installing dependencies..."
    npm install express dotenv jsonwebtoken cors mongoose nodemon bcrypt 
    npm install -D nodemon
    echo "Creating index.js..."
    cat > index.js <<EOF
require("dotenv").config();
const http = require("http");
const express = require("express");
const server = express();
let PORT = process.env.PORT || 5050;

// ------------------ Middlewares ------------------

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(express.static("public"));

// ------------------ Routes Configuration Middlewares ------------------

server.get("/", (req, res) => {
  res.send("Hello Doston!\nThis is Eshank Tyagi :)");
});

// ------------------ Server Listning & It's Error Handling ------------------

const httpServer = http.createServer(server);
function listen() {
  httpServer.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}
httpServer.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log("Port " + PORT + " is already in use...");
    PORT = PORT + 1;
    console.log("Retrying with port " + PORT + "...");
    listen();
  }
});

// ------------------ Server Listning Call ------------------

// server.listen(PORT, () => {
//   console.log("Server is running on port " + PORT);
// });

listen();

EOF
    echo "Creating .env file..."
    cat > .env <<EOF
AUTHOR=EshankTyagi
PORT=5050
YOUR_SECRET_KEY=your_secret_key
EOF
    echo "Creating .env file... Done"
    echo "Creating .gitignore file..."
    cat > .gitignore <<EOF
node_modules
.env
EOF
    echo "Creating .gitignore file... Done"
    echo "Initializing MVC Architecture..."
    mkdir models controllers routes middlewares utils
    echo "Initializing MVC Architecture... Done"
    echo "Backend project setup complete."
}

# Main script
echo "Enter your project name: (without spaces) (hyphen separated)"
read -r project_name

if [[ -z "$project_name" ]]; then
    echo "Project name cannot be empty. Exiting..."
    exit 1
fi

show_menu

# export PATH=~/bin:Documents/mr.eshank.dev/dev-init.sh
# alias dev-init="~/Documents/mr.eshank.dev/dev-init.sh"