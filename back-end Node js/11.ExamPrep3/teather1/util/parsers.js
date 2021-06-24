function parserError(err){
    if (err.name == 'ValidationError'){
        return Object.values(err.errors).map(e=> e.properies.message)
    }else {
        return [err.message];
    }


}

module.exports={
    parserError
}