import app from './server.js';
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@test.qag9dty.mongodb.net/?retryWrites=true&w=majority`

const port = 8080

MongoClient.connect(
    uri,
    // connection pool settings
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500, 
        // useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1) //status code 1
    }) // if the connection is succssful: 
    .then(async client=> {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () =>{
            console.log(`listening on port ${port}`)
        })
    })

