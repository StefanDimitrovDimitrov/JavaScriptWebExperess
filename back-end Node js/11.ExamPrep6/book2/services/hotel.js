const hotel = require('../models/Hotel');


async function getAllHotels(){
    // // return Play.find({}).lean();
    // return Hotel.find({public: true}).sort({createdAt: -1}).lean();
};

async function getHotelById(id){
    // // return Play.findById(id).lean()
    // return Hotel.findById(id).populate('usersLiked').lean();

};

async function createHotel(playData){

    // const pattern = new RegExp(`^${playData.title}$`, 'i');
    // const existing = await Play.findOne({ title: {$regex: pattern }});
    // console.log(existing);

    // if (existing) {
    //     throw new Error('A play with this name already exists!');
    // }

    // const play = new Play(playData)
    // return play.save()

};

async function editHotel(id, playData){
    // const play = await Play.findById(id)

    // play.title = playData.title;
    // play.description = playData.description;
    // play.imageUrl = playData.imageUrl;
    // play.public = Boolean(playData.public);

    // return play.save()
}

async function deleteHotel(id){
    // return Play.findByIdAndDelete(id)
};

// async function likePlay(playId, userId){
//     const play = await Play.findById(playId);

//     play.userLiked.push(userId);
//     return play.save();

// }


module.exports = {
    getAllHotels,
    getHotelById, 
    createHotel,
    editHotel,
    deleteHotel,
    //likePlay,
};
