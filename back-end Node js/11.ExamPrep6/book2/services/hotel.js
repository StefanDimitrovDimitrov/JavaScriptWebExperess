const Hotel = require('../models/Hotel');


async function getAllHotels(){
    return Hotel.find({}).lean();
    // return Hotel.find({public: true}).sort({createdAt: -1}).lean();
};

async function getHotelById(id){
    const hotel = await Hotel.findById(id).lean()
    return  hotel
    // return Hotel.findById(id).populate('usersLiked').lean();

};

async function createHotel(hotelData){

    // const pattern = new RegExp(`^${playData.title}$`, 'i');
    // const existing = await Play.findOne({ title: {$regex: pattern }});
    // console.log(existing);

    // if (existing) {
    //     throw new Error('A play with this name already exists!');
    // }

    const hotel = new Hotel(hotelData)
    await hotel.save()
    return hotel;

};

async function editHotel(id, hotelData){
    const hotel = await Hotel.findById(id)

    hotel.name= hotelData.name;
    hotel.city= hotelData.city;
    hotel.imageUrl= hotelData.imageUrl;
    hotel.rooms= hotelData.rooms;
    
    return hotel.save()
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
