# Project development flow

[x] initialize NPM project
    - npm init -y 

[x] Create folder structure
    - config
    - controllers
    - middewars
    - services
    - util
    - views
        - layouts
        - partials

[x] Instal Libraries
    npm i express mongoose bcrypt cookie-parser jsonwebtoken express-validator express-handlebars
[x] include resources(HTML & CSS, etc.)
[ ] Arrange templates (without editing)
[ ] create initilization files
[ ] - index - create and start(EXPRESS) application
[ ] - config files - database connect, Express middlewares(body-parser, static), external middleware(Cookie parser, bcrypt, jwt)
[ ] Create generic User model
[ ] Create user servcie and auth middleware
[ ] Create mock routes for register, login and logout
[ ] Create routes guards
[ ] Create generic storage middleware

#Specifics

[ ] Addapt User models
[ ] Implementsregister, login, logout
[ ] create models for project specific data
[ ] create data services and middlewares 
[ ] create actions for project-specific functionality