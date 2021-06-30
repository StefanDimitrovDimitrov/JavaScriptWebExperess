const Trip = require('../models/Trip');


async function getAllTrips(){
    return Trip.find({}).lean();
    //return Play.find({public: true}).sort({createdAt: -1}).lean();
};

async function getTripById(id){
    // return Play.findById(id).lean()
    return Trip.findById(id).populate('usersLiked').lean();

};

async function createTrip(tripData){

    // const pattern = new RegExp(`^${tripData._id}$`, 'i');
    // const existing = await Trip.findOne({ _id: {$regex: pattern }});
    // console.log(existing);

    // if (existing) {
    //     throw new Error('A trip with this name already exists!');
    // }

    const trip = new Trip(tripData)
    return trip.save()

};

async function editTrip(id, tripData){
    const trip = await Trip.findById(id)

    // play.title = playData.title;
    // play.description = playData.description;
    // play.imageUrl = playData.imageUrl;
    // play.public = Boolean(playData.public);

    return trip.save()
}

async function deleteTrip(id){
    return Trip.findByIdAndDelete(id)
};

// async function likePlay(playId, userId){
//     const play = await Play.findById(playId);

//     play.userLiked.push(userId);
//     return play.save();

// }


module.exports = {
    getAllTrips,
    getTripById, 
    createTrip,
    editTrip,
    deleteTrip,
    //likePlay,
};
