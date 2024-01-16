import express from "express"; //Express framework to create web server
import cors from "cors"; // CORS middleware for Cross-Orighin Resource Sharing 
import reviews from "./api/reviews.route.js" // import the router for handleing reviews from a separate file

// get access to express
const app = express(); // create web server

// middleware configuration
app.use(cors()); 
app.use(express.json()); 

// define a route for handing reviews(URL -> routes defined in the 'reviews.route.js')
app.use("/api/v1/reviews", reviews) ;
app.use("*",(req, res) => 
res.status(404).json({error: "not found"})); //backup route:

// connecting files together
// export statement: (apply)
// connect server code and database code
export default app ;