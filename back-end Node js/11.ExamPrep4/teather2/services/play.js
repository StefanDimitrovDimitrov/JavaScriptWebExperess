const New = require('../models/Play');


async function getAllPlays(){
    // New.find({}).lean();
};

async function getPlayById(id){
    // return New.findById(id).populate('usersLiked').lean();

};

async function createPlay(playData){

    //custom valdation//

    // const pattern = new ReqExp(`^${playdata.title}$`, 'i');
    // const existing = await New.findOne({ title: {$regex: pattern }});

    // if (existing) {
    //     throw new Error('A play with this name already exists!');
    // }

    // const new_model = new New(playData)
    // return new_model.save()

};

async function editPlay(id, playData){
    // const play = await Play.findById(id)

    // play.title = playData.title;
    // play.description = playData.description;
    // play.imageUrl = playData.imageUrl;
    // play.public = Boolean(playData.public);

    // return play.save()
}

async function deletePlay(id){
    // return New.findByIdAndDelete(id)
};

async function likePlay(playId, userId){
    // const play = await Play.findById(playId);

    // play.userLiked.push(userId);
    // return play.save();

}


module.exports = {
    getAllPlays,
    getPlayById, 
    createPlay,
    editPlay,
    deletePlay,
    likePlay,
};
