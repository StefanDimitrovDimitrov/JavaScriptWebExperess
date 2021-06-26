const router = require('express').Router();

const { isUser } = require('../middlewares/guards')
const { parserError } = require('../util/parser');


router.get('/create', isUser(), (req, res)=>{
    res.render('hotel/create');
});

router.post('/create', isUser(), async(req,res)=>{
    console.log(req.body);
    try {
        const playData = {

            NEW_REQUIREMENTS

            // <!-- title: req.body.title,
            // description: req.body.description,
            // imageUrl: req.body.imageUrl,
            // public: Boolean(req.body.public),
            // author: req.user._id, -->
        };

        await req.storage.createHotel(playData)

        res.redirect('/');
    }catch (err){
        console.log(err.message);

        const ctx = {
            errors: parserError(err),
            hotelData: {
                NEW_REQUIREMENTS

                // <!-- title: req.body.title,
                // description: req.body.description,
                // imageUrl: req.body.imageUrl,
                // public: Boolean(req.body.public), -->

            }
        };
        res.render('hotel/create', ctx);
    }
});
router.get('/details/:id', async (req, res)=>{
    // try{
    //     const hotel = await req.storage.getHotelById(req.params.id);
    //     hotel.hasUser = Boolean(req.user);
    //     hotel.isAuthor = req.user && req.user._id == hotel.author;
    //     console.log(play.isAuthor);
    //     hotel.liked = req.user && play.userLiked.find(u => u._id == req.user._id);
    //     res.render('hotel/details', { play });
    // }catch (err) {
    //     console.log(err.message);
    //     res. redirect('/404');
    // }
});

router.get('/edit/:id', isUser(), async(req, res)=>{
    // try {
    //     const play = await req.storage.getPlayById(req.params.id);
    //     if (play.author != req.user._id) {
    //         throw new Error('Cannot edit play you haven\'t created');
    //     }
    //     res.render('play/edit', { play });
    // }catch(err){
    //     console.log(err.message);
    //     res.redirect('/play/details/' + req.params.id)
    // }
})

router.post('/edit/:id', isUser(), async (req, res)=>{
    // try {
    //     const play = await req.storage.getPlayById(req.params.id);
    //     if (play.author != req.user._id) {
    //         throw new Error('Cannot edit play you haven\'t created');
    //     }

    //     await req.storage.editPlay(req.params.id, req.body);
    
    //     res.redirect('/');
    // } catch (err) {

    //     const ctx = {
    //         errors: parseError(err),
    //         play: {
    //             _id: req.params.id,
    //             title: req.body.title,
    //             description: req.body.description,
    //             imageUrl: req.body.imageUrl,
    //             public: Boolean(req.body.public),
    //         }
        
    //     };

    //     res.render('play/edit', ctx);
    // }
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
