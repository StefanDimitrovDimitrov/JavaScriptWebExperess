const router = require('express').Router();

const { isUser } = require('../middlewares/guards')
const { parserError } = require('../util/parser');


router.get('/create', isUser(), (req, res)=>{
    res.render('trips/create');
});

router.post('/create', isUser(), async(req,res)=>{
    console.log(req.body);
    

    try {
        const tripData = {
            startPoint: req.body.startPoint,
            endPoint: req.body.endPoint,
            date: new Date(req.body.date).toLocaleString(),
            time: req.body.time,
            imgUrl:req.body.imgUrl,
            carBrand: req.body.carBrand,
            seats: req.body.seats,
            price: req.body.price,
            description:req.body.description,
            creator:req.user._id,
        };

        await req.storage.createTrip(tripData)

        res.redirect('/');
    }catch (err){
        console.log(err.message);

        const ctx = {
            //errors: parserError(err),
            errors: [err.message],
            tripData: {
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date,
                time: req.body.time,
                imgUrl:req.body.imgUrl,
                carBrand: req.body.carBrand,
                seats: req.body.seats,
                price:req.body.price,
                description:req.body.description,

            }
        };
        res.render('trips/create', ctx);
    }
});

router.get('/shared', async(req,res)=>{
    const trips = await req.storage.getAllTrips()
    trips.forEach(trip => trip.date =(trip.date.getFullYear() + '-' + ('0' + (trip.date.getMonth()+1)).slice(-2) + '-' + ('0' + trip.date.getDate()).slice(-2)))
    res.render('trips/shared', { trips });

})

router.get('/details/:id', async (req, res)=>{
    try{
        const trip = await req.storage.getTripById(req.params.id);
        trip.hasUser = Boolean(req.user);
        trip.email = req.user.email
        trip.isCreator = req.user && req.user._id == trip.creator;
        trip.date = trip.date.getFullYear() + '-' + ('0' + (trip.date.getMonth()+1)).slice(-2) + '-' + ('0' + trip.date.getDate()).slice(-2)
        const buddies = req.user.buddies
        const inBuddyList = false
        if (buddies != undefined){
            for (buddy in buddies){
                if (buddy.email == req.user.email) {
                    inBuddyList = true
                }
            }
        }
        console.log(inBuddyList);

        trip.inBuddyList = inBuddyList
        trip.availableseats = trip.seats -  (buddies ? biddies.lenght() : 0)


        // play.liked = req.user && play.userLiked.find(u => u._id == req.user._id);
        res.render('trips/details', { trip });
    }catch (err) {
        console.log(err.message);
        res. redirect('/404');
    }
});

router.get('/edit/:id', isUser(), async(req, res)=>{
    try {
        const trip = await req.storage.getTripById(req.params.id);
        if (trip.creator != req.user._id) {
            throw new Error('Cannot edit play you haven\'t created');
        }
        trip.date = trip.date.getFullYear() + '-' + ('0' + (trip.date.getMonth()+1)).slice(-2) + '-' + ('0' + trip.date.getDate()).slice(-2)
        res.render('trips/edit', { trip });
    }catch(err){
        console.log(err.message);
        res.redirect('/trips/details/' + req.params.id)
    }
})

router.post('/edit/:id', isUser(), async (req, res)=>{
    try {
        const trip = await req.storage.getTripById(req.params.id);
        if (trip.creator != req.user._id) {
            throw new Error('Cannot edit play you haven\'t created');
        }

        await req.storage.editTrip(req.params.id, req.body);
    
        res.redirect('/');
    } catch (err) {

        const ctx = {
            errors: parseError(err),
            tripData: {
                _id: req.params.id,
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date,
                time: req.body.time,
                imgUrl:req.body.imgUrl,
                carBrand: req.body.carBrand,
                seats: req.body.seats,
                price:req.body.price,
                description: req.body.description,
            }
        
        };

        res.render('trips/edit', ctx);
    }
});

router.get('/delete/:id', async (req,res)=>{
    try {
        const trip = await req.storage.deleteTrip(req.params.id);

        if (trip.creator != req.user._id) {
            throw new Error('Cannot delete play you haven\'t created');
        }

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/play/details/' + req.params.id); 
    }
})

// router.get('/like/:id', isUser(), async(req, res)=>{
//     try {
//         const play = await req.storage.getPlayById(req.params.id);

//         if (play.author == req.user._id) {
//             throw new Error('Cannot like your own play.');
//         }

//         await req.storage.likePlay(req.params.id, req.user._id);
//         res.redirect('/play/details/' + req.params.id);
//     } catch (err) {
//         console.log(err.message);
//         res.redirect('/play/details/' + req.params.id); 
//     }
// })

module.exports = router;
