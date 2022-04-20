// 1. Create a middleware function that will check if a movie's release date is older than 2000. If it is, return the message "We only accept movies after 2000".
function validate_movie(req, res, next){
    const release = req.body.release_date;
    if(release < 2000){
        return res.status(400).json({ message: 'We only accept movies after 2000' });
    }
    next()
}


// 2. Create a middleware function that will check if a star's age is younger than 18. If it is, return the message "We only accept stars over 18".
function validate_age(req, res, next){
    const age = req.body.age;
    if(age < 18){
        return res.status(400).json({ message: 'We only accept stars over 18' });
    }
    next()
}
module.exports=  {
    validate_age,
    validate_movie
}