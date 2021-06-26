const Play = require('../models/Play');


async function getAllPlays(){
    // return Play.find({}).lean();
    console.log('find_all');
    return Play.find({public: true}).sort({createdAt: -1}).lean();
};

async function getPlayById(id){
    // return Play.findById(id).lean()
    console.log('find one');
    return Play.findById(id).populate('usersLiked').lean();

};

async function createPlay(playData){

    //custom valdation//

    const pattern = new RegExp(`^${playData.title}$`, 'i');
    const existing = await Play.findOne({ title: {$regex: pattern }});
    console.log(existing);

    if (existing) {
        throw new Error('A play with this name already exists!');
    }
    //custom validation//

    const play = new Play(playData)
    return play.save()

};

async function editPlay(id, playData){
    const play = await Play.findById(id)

    play.title = playData.title;
    play.description = playData.description;
    play.imageUrl = playData.imageUrl;
    play.public = Boolean(playData.public);

    return play.save()
}

async function deletePlay(id){
    return Play.findByIdAndDelete(id)
};

async function likePlay(playId, userId){
    const play = await Play.findById(playId);

    play.userLiked.push(userId);
    return play.save();

}


module.exports = {
    getAllPlays,
    getPlayById, 
    createPlay,
    editPlay,
    deletePlay,
    likePlay,
};
