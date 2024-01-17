import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID // look up record by id

let reviews // reference

export default class ReviewsDAO {
    static async injectDB(conn){
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db("reviews").connection("reviews")
        }catch(e){
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review) {
        try { 
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review,
            }
            return await reviews.insertOne(reviewDoc)
        }catch (e) {
            console.error(`Unable to post review: ${e}`)
            return {error: e}
        }
    }

    static async getReview(reviewId) {
        try {
            return await reviews.findOne({_id: ObjectId(reviewId) })
        }catch (e) {
            console.error(`Unable to get review: ${e}`)
            return {error : e}
        }
    }

    static async updateReview(reviewId, user, review) {
        try{
            const updateResponse = await reviews.updateOne(
                {_id: ObjectId(reviewId)},
                {$set : {user: user, review: review}}
            )
            return updateResponse
        } catch (e) {
            console.error(`Unable to updare review: ${e}`)
            return {error: e}
        }
    }


}
