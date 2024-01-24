const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d0ad7607c939274bc2d4c6089b5131a2&page=1';
// const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
//https://api.themoviedb.org/3/movie/11?api_key=d0ad7607c939274bc2d4c6089b5131a2
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=d0ad7607c939274bc2d4c6089b5131a2&query=";
// 'search' > send query to API > API response (image/name/..) > modify the <div> tag 

const main =document.getElementById("section");
const form =document.getElementById("form");
const query =document.getElementById("query");
// .getElementById('ID'): html element; .querySelector('.class'): CSS;

returnMovies(APILINK);
function returnMovies(url){
    fetch(url) 
        .then(res => res.json()) // JSON response and logs it into console
        .then(function(data){
            console.log(data.results);
            // iterates every single result
            data.results.forEach(element => {
                // create HTML elements dynamically
                // 1.1 create subsections in the 'section' tag
                // 1.2 add attributes, in CSS we use attris to  style them
                const div_card = document.createElement('div');
                const div_row = document.createElement('div');
                const div_column = document.createElement('div');
                const image = document.createElement('img');
                const title = document.createElement('h3');
                const center = document.createElement('center');
                div_card.setAttribute('class', 'card');
                div_row.setAttribute('class', 'row');
                div_column.setAttribute('class', 'column');
                image.setAttribute('id', 'image');
                image.setAttribute('class', 'thumbnail');
                title.setAttribute('id', 'title');



                // pass the information from movie.html to index.html
                title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">review</a>`;
                image.src = IMG_PATH + element.poster_path; // img tag has no value, replace the src label

                // 3.structure the page. 
                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);

                main.appendChild(div_row);
            });
        });
}

// !!!! submit a search query
// set an event listener for the form's submit event
// (e)vent is a parameter representing the event object: mouse clicks, keyboard presses
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    main.innerHTML = ''; // clear all initial contents of the 'main' element  

    const searchItem = query.value; // 'search' input

    if(searchItem) {
        returnMovies(SEARCHAPI + searchItem); 
        query.value = ""; // clear

    }
});