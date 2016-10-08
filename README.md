# Description

This is the official **upstream** repository for the CS353 project. It is the single public server-side repository that contains the codebase for the project. 

# Resources

Extra information, tutorials and documentation can be found here.

- Learn more about the Git Forking Workflow [here](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)
- Learn more about forking and cloning an upstream repository [here](https://guides.github.com/activities/forking/)
- Useful article on forking [here](https://www.atlassian.com/git/articles/git-forks-and-upstreams)
- Angular Material documentation available [here](https://material.angularjs.org/latest/)
- Firebase documentation available [here](https://www.firebase.com/) and [here](https://firebase.google.com/)
- Learn more about angularfire, the firebase implementation for angular apps [here](https://www.firebase.com/docs/web/libraries/angular/)

# Access

Read access to this is repository is permitted to:

- Aidan Donnelly aidandonnelly96@hotmail.com
- Tomek Gawrysiak tommygaw95@gmail.com
- Henrie Wainaina wainainah@gmail.com
- Sam Roche samroche64@gmail.com

Read/Write access to this repository is limited to:

- Gregory Kelleher gregory@gregorykelleher.com

# Forking Workflow

The workflow implemented for the project is a **forking workflow** which is a distributed and flexible means of team collaboration.

Each team member has two Git repositories:
- Private Local Repository i.e. origin (private)
- Public Server-Side Repository i.e. upstream (public)

The objective to the Forking Workflow is to allow contributions to be integrated without the need to publish to a single central repository. Instead team members push to _their_ own private repository, and only the project maintainer can push to the official repository.

Therefore, this allows the project maintainer to accept commits from a team member without giving them write access to the official codebase.

# Getting Started

1. In order to contribute to the official repository, you must first **fork** it on GitHub, and in turn create your own server-side repository (which is really a copy of the official repository). 

2. The forked repository only exists on GitHub and hence to be able to work on it you must clone your public forked server-side repository to your local machine. You can do this inside GitHub by clicking the green button marked _clone or download_ to clone the repository to your desktop. 

3. From there, you have an isolated personal public repository which serves as your own private development environment. You can add, commit and push as always but in order to push to the official upstream repository, a **pull request** must be invoked. Likewise, you can keep up-to-date with the upstream repository by pulling. 

4. A pull request can be issued from your public server-side repository page on Github. A pull request must first be inspected and compared before merging to the master branch of the official repository. Once a contribution is part of the official project, other team members can pull the integrated changes and sync their local repositories.

5. More information can be found in the Resources section of this README. Otherwise, post a question in the Slack #git channel.

# NPM Dependencies

The template for the application requires certain dependencies which can be installed using NPM (node package manager). When you first fork and clone this repository, you will have to do the same. Install NPM CLI on your local machine and use **NPM install** to resolve the missing dependencies in your project.

You can run the **npm list** command to list dependencies and installed modules:

```
$ npm list
cs353_project@1.0.0 /Users/admin/Documents/CS353_project
├── angular@1.5.8
├── angular-animate@1.5.8
├── angular-aria@1.5.8
├── angular-material@1.1.1
├── angular-messages@1.5.8
├── angular-router@0.0.2
├── angularfire@2.0.2
└── firebase@3.4.1
```

Likewise, the dependencies are listed inside the **package.json** file:

```
"dependencies": {
	"angular": "^1.5.8",
	"angular-animate": "^1.5.8",
	"angular-aria": "^1.5.8",
	"angular-material": "^1.1.1",
	"angular-messages": "^1.5.8",
	"angular-router": "0.0.2",
	"angularfire": "^2.0.2",
	"firebase": "^3.4.1"
}
```

# Template Directory Structuring

The template is structured _by type_ as an Angular JS application. The initial tree looks like this:

```
CS353_project/
├── logs/                        : log files
├── public/                      : Common project folder
|   ├── app/                     : directory for angular web application
|   |   ├── controllers/         : angular controller directory
|   |   ├── directives/          : angular directives directory
|   |   ├── js/                  : JavaScript directory
|   |   ├── services/            : angular services directory
|   |   └── app.js               : application JavaScript file
|	├── node_modules/                : dependencies installed via NPM 
|	│   ├── angular-animate/         : animation hooks
|	│   ├── angular-aria/            : accessibility 
|	│   ├── angular-messages/        : messages 
|	│   ├── angular-router/          : routing 
|	|   ├── angular-material/        : angular material theming & styling
|	|   ├── angularfire/             : angular bindings for firebase
|	│   └── firebase/                : firebase backend service
│   └── index.html               : main html page
├── .firebaserc                  : named alias definition for firebase CLI
├── .gitignore                   : git ignore file
├── database.rules.json          : firebase database rules
├── firebase.json                : firebase settings
└── package.json                 : NPM package file
└── README.md                    : project readme file
```

Note that the **node_modules** directory is referenced in the .gitignore and hence is not pushed to the upstream repository. Instead NPM will generate this directory locally based on the **package.json** file. 

# Firebase

Firebase has been initialised in the project directory based on the **firebase.json** file. Firebase has a CLI tool (firebase-tools) and it's recommend you use **firebase serve** to launch a local server. 

Likewise, **firebase deploy** will deploy the project to **cs353-project.firebaseapp.com**.

More information on firebase to follow. 
