const router = require('express').Router();

const { isUser } = require('../middlewares/guards')
const { parserError } = require('../util/parser');


router.get('/create', isUser(), (req, res)=>{
    res.render('hotels/create');
});

router.post('/create', isUser(), async(req,res)=>{
    console.log(req.body);
    try {
        const hotelData = {

            name: req.body.name,
            city: req.body.city,
            imageUrl: req.body.imageUrl,
            rooms: req.body.rooms,
            bookedBy: [],
            owner: req.user._id,
        };

        await req.storage.createHotel(hotelData)

        res.redirect('/');
    }catch (err){
        console.log(err.message);

        const ctx = {
            errors: parserError(err),
            hotelData: {
                name: req.body.name,
                city: req.body.city,
                imageUrl: req.body.imageUrl,
                rooms:req.body.rooms,
            }
        };
        res.render('hotels/create', ctx);
    }
});
router.get('/details/:id', async (req, res)=>{
    try{
        const hotel = await req.storage.getHotelById(req.params.id);
        hotel.hasUser = Boolean(req.user);
        hotel.isOwner = req.user && req.user._id == hotel.owner;
        // console.log(hotel.isAuthor);
        hotel.isBooked = req.user && hotel.bookedBy.find(u => u._id == req.user._id);
        res.render('hotels/details', { hotel });
    }catch (err) {
        console.log(err.message);
        res. redirect('/404');
    }
});

router.get('/edit/:id', isUser(), async(req, res)=>{
    try {
        const hotelData = await req.storage.getHotelById(req.params.id);
        if (hotelData.owner != req.user._id) {
            throw new Error('Cannot edit play you haven\'t created!');
        }
        res.render('hotels/edit', { hotelData });
    }catch(err){
        console.log(err.message);
        res.redirect('/hotels/details/' + req.params.id)
    }
})

router.post('/edit/:id', isUser(), async (req, res)=>{
    try {
        const hotelData = await req.storage.getHotelById(req.params.id);
        if (hotelData.owner != req.user._id) {
            throw new Error('Cannot edit play you haven\'t created!');
        }

        await req.storage.editHotel(req.params.id, req.body);
    
        res.redirect('/');
    } catch (err) {

        const ctx = {
            errors: parserError(err),
            hotelData: {
                _id: req.params.id,
                name: req.body.name,
                city: req.body.city,
                imageUrl: req.body.imageUrl,
                rooms:req.body.rooms,
            }
        };

        res.render('hotels/edit', ctx);
    }
});

router.get('/delete/:id', async (req,res)=>{
    // try {
    //     const play = await req.storage.deletePlay(req.params.id);

    //     if (play.author != req.user._id) {
    //         throw new Error('Cannot delete play you haven\'t created');
    //     }

    //     res.redirect('/');
    // } catch (err) {
    //     console.log(err.message);
    //     res.redirect('/play/details/' + req.params.id); 
    // }
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
