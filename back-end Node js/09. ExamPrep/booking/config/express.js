const express = require('express');


module.exprorts = (app) => {
    app.use('/static', express.static('static'));
    app.use(express.urlendcoded({extended:true}))
    app.use(cookieParser())
}