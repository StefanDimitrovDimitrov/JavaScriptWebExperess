services - play 

async function getAllPlays(){
    return Play.find({}).lean();
};


___________________________

services/play

    //custom valdation//

    const pattern = new RegExp(`^${playData.title}$`, 'i');
    const existing = await Play.findOne({ title: {$regex: pattern }});
    console.log(existing);

    if (existing) {
        throw new Error('A play with this name already exists!');
    }
    //custom validation//