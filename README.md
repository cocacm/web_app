# Web Application
Below are the guides for running the examples from our web application workshops.
Please join us Thursdays from 5 to 8 in the The Learning Center (TLC), Room 133 in you're interested!

## [WEEK 1](https://github.com/cocacmclub/web_app/tree/master/week1)
Here are some basic commands for navigating in Terminal or Command Prompt:
- In **Terminal**, for listing the files and folders in your current directory use `ls`. To view hidden files and folders
as well, add the **all** flag, `ls -a`
- In **Command Prompt**, for listing the files and folders in your current directory use `dir`. To view hidden files and
folders as well, add the **all** flag, `dir /a`
- For changing directories in either **Terminal** or **Command Prompt**, use `cd <DIRECTORY>`
 

After downloading or copying the examples for [week 1](https://github.com/cocacmclub/web_app/tree/master/week1),
navigate into the directory using `cd <DIRECTORY>`. Using `start index.html` in **Command Prompt**, or `open index.html`
in **Terminal** will open the *index.html* file in your default browser, which should then display, *hello from HTML!*
using the style specified in our *index.css* file.

### Setting up the [express](https://www.npmjs.com/package/express) server framework
Inside of the *week1* folder, run the following [**npm**](https://www.npmjs.com/) install commands to save [**express**](https://www.npmjs.com/package/express) as a dependency in the current directory. After running, `npm init` keep pressing enter through the configuration until you are prompted to save, then hit enter again:
```
npm init
npm install express --save
```
This should create *package.json* and *node_modules* in our project folder, which includes packages that are required to run [**nodejs**](https://nodejs.org/en/about/) with our project. Now you can execute `node index.js` to run our server-side **javascript** file. This time, the **Terminal** or **Command Prompt** should pause as it maintains the server connection. Navigating to *http://localhost:3000* should display our *hello from HTML!* message. This time, clicking the message will pop up a dialog that says *hello world*. Upon closing this, the box containing our original message will turn orange. Try experimenting with the code in the *index.css* file to change the colors or modify the message in the *index.html* file to display something else. Good luck, have fun!~

## [WEEK 2](mailto:cocacmclub@gmail.com)
This week we examined the code and configuration for a project our club is working on for the arduinoff competition. We would like to keep it private for the time being, and will not be posting it here on GitHub. If you would like a zip copy of these examples please [email us](mailto:cocacmclub@gmail.com) and you will be added to the mailing list for this workshop series.

### Adding dependencies for our backend
Navigate into the *week2* folder through **Terminal** or **Command Prompt** and then into the *backend* directory. Run the following commands to install the dependencies needed for this project ([**express**](https://www.npmjs.com/package/express), [**mongoose**](https://www.npmjs.com/package/mongoose), and [**body-parser**](https://www.npmjs.com/package/body-parser-json)):
```
npm install express
npm install mongoose
npm install body-parser
```
### Adding dependencies for our frontend
For this frontend we used [**react**](https://reactjs.org/) to simplify the building of dynamic UIs. In this case, a [**google maps**](https://www.npmjs.com/package/google-map-react) component that we will use to spoof an interactive map of fire sensors for our demo. The packages that are required for that are already installed, so simply run `npm install` to locate and install any other dependencies needed to run the app.

### Running the application
To run this demo, you will need to start [**mongodb**](https://www.mongodb.com/what-is-mongodb). In a **Terminal** or **Command Prompt** session, do this by using the following command `<MONGODB-INSTALL-DIRECTORY>/bin/mongod`. Upon successful initialization, you will see some details about the configuration, and at the very end something like, *waiting for connections on port 27017*. The database is now up and running.

Next, in another window, navigate to the *backend* directory and run `node index.js` to run the server-side **javascript** file. This should pause execution as [**nodejs**](http://nodeguide.com/beginner.html) waits for instructions on what to do next, which it will recieve from the client who makes a request by navigating to the url specified in the code.

Now the application is ready to launch, from another **Terminal** or **Command Prompt** window, move into the *frontend* directory and run `npm start`. If prompted, enter `y` to switch to another port. A new browser window will then open with our [**react**](https://reactjs.org/docs/hello-world.html) application. Try inspecting the different parts of this code in the backend and frontend to learn more about how this example works!~
