import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReviews(req, res, next) {
        try {
            const movieId = req.body.movieId
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            )
            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({ error: e.message}) // catch the error and respond
        }
    }
    static async apiGetReviews(req, res, next){
        try {
            let id = req.params.id || {} // /:id or empty object
            let reviews = await ReviewsDAO.getReview(id)
            if (!reviews) {
                res.status(404).json({error: "Not Found"})
                return
            }
            res.json(reviews) // respond with the reviews based on the id
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiGetReviews(req, res, next){
        try {
            let id = req.params.id || {} 
            let reviews = await ReviewsDAO.getReviewByMovieId(id) //movieid
            if (!reviews) {
                res.status(404).json({error: "Not Found"})
                return
            }
            res.json(reviews) // respond with the reviews based on the movie_id
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiUpdateReviews(req, res, next) {
        try {
            const reviewId = req.params.id
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            )

            var { error } = reviewResponse
            if(error){
                res.status(400).json({error})
            }
            if(reviewResponse.modifiedCount === 0){ // nothing was changed
                throw new Error(
                    "unable to update review", // go to the catch block
                )
            }
            res.json({status: "success"})
        } catch(e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteReviews(req, res, next) {
        try {
            const reviewId = req.params.id
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({error : e.message})
        }
    }

}

