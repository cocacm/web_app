# Web Application
Below are the guides for running the examples from our web application workshops.
Please join us Thursdays from 5 to 8 in the TLC, Room 133 in you're interested!

## [WEEK 1](https://github.com/cocacmclub/web_app/tree/master/week1)
Here are some basic commands for navigating in Terminal or Command Prompt:
- In **Terminal**, for listing the files and folders in your current directory use `ls`. To view hidden files and folders
as well, add the **all** flag, `ls -a`
- In **Command Prompt**, for listing the files and folders in your current directory use `dir`. To view hidden files and
folders as well, add the **all** flag, `dir /a`
- For changing directories in either **Terminal** or **Command Prompt**, use `cd <DIRECTORY>`
 

After downloading or copying the examples for [week 1](https://github.com/cocacmclub/web_app/tree/master/week1),
navigate into the directory using `cd <DIRECTORY>`. Using `start index.html` in **Command Prompt**, or `open index.html`
in **Terminal** will open the **index.html** file in your default browser, which should then display, *hello from HTML!*
using the style specified in our *index.css* file.

### Setting up the Express server framework
Inside of the *week1* folder, run the following commands to save **Express** as a dependency in the current directory:
```
npm init
npm install express --save
```
This should create *package.json* and *node_modules* in our project folder, which includes packages that are required to run **Nodejs**. Now you can execute `node index.js` to run our server-side javascript file using **Nodejs**. This time, the **Terminal** or **Command Prompt** should pause as it maintains the server connection. Navigating to *http://localhost:3000* should display our *hello from HTML!* message. This time, clicking the message will pop up a dialog that says *hello world*.
Upon closing this, the box containing our original message will turn orange. Try experimenting with the code in the *index.css* file to change the colors or modify the message in the *index.html* file to display something else. Good luck, have fun!
