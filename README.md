# web_crawler
Making a web_crawler


.nvmrc is for setting the node version

`nvm init ` for generating the json file(package.json), i am going to use .gitignore to ignore all the packages that might be installed while building this, so use `nvm install` , package.json is going to handle it all

modifed the script in package.json => `npm start ` for running, main.js is entry point
``` 
"scripts": {
    "start": "node main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

`npm install --save-dev jest`

adding node_modules to .gitignore as specified before  `touch .gitignore`

```
 "test": "echo \"Error: no test specified\" && exit 1" to "jest"
```

`npm test`