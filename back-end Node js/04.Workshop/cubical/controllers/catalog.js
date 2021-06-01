module.exports = {
    catalog: (req, res) => {
        console.log('here');
        res.render('index', {title: 'Cubicle'});
    }
}