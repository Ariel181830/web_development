const url = new URL(location.href); //URL object from real URL
const movieId = parseInt(url.searchParams.get("id"), 10) // access to part of URL
const movieTitle = url.searchParams.get("title")

const APILINK = 'http://localhost:8080/api/v1/reviews/';

const main =document.getElementById("section");
const title =document.getElementById("title"); // add title element

title.innerText = movieTitle; // not mess to much by using innerText

// create new review, could be done in html
const div_new = document.createElement('div');
div_new.innerHTML = `
    <div class = "row">
        <div class = "column">
            <div class = "card"> NEW REVIEW 
                <p><strong>Review: </strong>
                <input type = "text" id = "new_review" value="">
                </p>
                <p><strong>User: </strong>
                <input type="text" id="new_user" value="">
                </p>
                <p><a href = "#" onclick="saveReview('new_review','new_user')">SAVE </a>
                </p>
            </div>
        </div>    
    </div>
`;
main.appendChild(div_new);


returnReviews(APILINK);
function returnReviews(url){
    fetch(url + "movie/" + movieId) // based on the url in backend route 
        .then(res => res.json())
        .then(function(data){
            console.log(data); // do not need the .result cuz of the api
            // data is an array of different review element
            data.forEach(review => {
                const div_card = document.createElement('div');
                // replace `appendchild` by insert html
                div_card.innerHTML = `
                <div class = "row">
                    <div class = "column">
                        <div class = "card" id="${review._id}"> 
                            <p><strong>Review: </strong>${review.review}</p>
                            <p><strong>User: </strong>${review.user}</p>
                            <p><a href = "#" onclick="editReview('${review._id}','${review.review}','${review.user}')">EDIT </a><a href="#" onclick="deleteReview('${review._id}')">DELETE</a></p>
                        </div>
                    </div>    
                </div>
                `
                main.appendChild(div_card);
            });
        });
}

function editReview(id, review, user) {
    console.log(review)
    const element = document.getElementById(id) // get access to element
    console.log(element)
    const reviewInputId = "review" + id
    const userInputId = "user" + id
    // switch html
    element.innerHTML = `
    <p><strong>Review: </strong>
        <input type= "text" id = "${reviewInputId}" value="${review}">
        </p>
    <p><strong>User: </strong>
        <input type= "text" id = "${userInputId}" value="${user}">
        </p>
    <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">SAVE</a>
    </p>
    `
}

function saveReview(reviewInputId, userInputId, id=""){ // default empty so can pass only 2 parameters when create a new review 
    const review = document.getElementById(reviewInputId)?.value;
    const user = document.getElementById(userInputId)?.value;

    if(id) { // update or create
        fetch(APILINK  +id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }, // pass another parameter key-value to fetch
            body: JSON.stringify({"user": user,"review":review})
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            location.reload(); // reload the url
        });
    }else {
        fetch(APILINK + "new", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user,"review":review, "movieId":movieId})
        }).then(res => res.json())
        .then(res =>{
            console.log(res)
            location.reload(); 
        })
        .catch(error => {
            console.error('Error creating new review:', error);
        });
    }
    
}

function deleteReview(id) {
    fetch(APILINK + id, {
        method: 'DELETE'
    }).then(res => res.json())
    .then(res =>{
        console.log(res)
        location.reload();
    });
}