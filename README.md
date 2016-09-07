# React ATM Simulator
A basic ATM simulator

![alt tag](https://raw.githubusercontent.com/rolandaugusto/tree/master/react-atm-simulator/screenshots/home.png)

This project uses the webpack-express-boilerplate as boilerplate.

Main technologies used:
- Node.js with express
- Webpack
- ES6
- React
- CSS modules

## Install and Running

**NOTE!** Use node 5 or higher

1. npm install
2. npm start
3. navigate to http://localhost:3000 in your browser of choice (Tested in Chrome51).


## Overview

The basic idea behind my implementation is a state machine. This means that the machine, in this case the ATM, renders information based on the user input given some preconditions. I found React perfect for developing this task since React is itself a state  machine :)

The code I wrote is the one inside the folder /app the rest is just the code that came with the boilerplate I used to start the project. I made some small changes in the webpack config files too.

### Limitations

- The user does not have the option to choose what action they desire to take. The only option is to withdraw.
- The code could use some optimization and refactoring. Due to time limitations I couldn't invest more time.(It was made just for fun :))
