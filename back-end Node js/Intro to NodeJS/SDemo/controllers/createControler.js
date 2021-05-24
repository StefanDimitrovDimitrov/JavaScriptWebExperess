const formidable = require('formidable');
const database = require('../util/db');


module.exports = (req,res) => {
    // const form = new formidable.IncomingForm();

    // form.parse(req, (err, fields)=>{

    //     database.addItem(fields);

    //     res.writeHead(301, {
    //         'Location': '/catalog'
    //     });
    //     res.end();
    // });

    let body = '';
    req.on('data', data =>{
        body+=data;
    });
    req.on('end',() =>{
        console.log(body);
    })

    res.writeHead(301, {
        'Location': '/catalog'
    });
    res.end();

};