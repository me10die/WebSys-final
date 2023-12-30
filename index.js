const container = document.getElementById("container")
const myForm = document.getElementById("myForm")
const search = document.getElementById("search")



myForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const value = search.value
    searchMovies(value)
})

const getMovies = async () => {
    const response = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en-US&page=1'
    );
    const mymovies = await response.json()
   container.innerHTML = `
            <div class=movies>
                ${mymovies.results.map((data)=>(
                    `
                    <div ondblclick=movieDetails(${data.id})>
                        <img src=http://image.tmdb.org/t/p/w500/${data.poster_path}>
                        <h1>${data.title}</h1>
                        <label>
                            <input style="height: 10px;" type="checkbox"> Add To Favorites
                        </label>
                    </div>
                    `
                )).join("")}
            </div>`
};


const searchMovies = async (title) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=1bfdbff05c2698dc917dd28c08d41096&query=${title}`
    );
    const mymovies = await response.json()
    container.innerHTML = mymovies.results.map((data)=>(
       ` <div class=movies>
        ${mymovies.results.map((data)=>(
            `
            <div ondblclick=movieDetails(${data.id})>
                <img src=http://image.tmdb.org/t/p/w500/${data.poster_path}>
                <h1>${data.title}</h1>
            </div>
            `
        )).join("")}
    </div>`
    )).join("")
};

const movieDetails = async (id)=>{
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en -US`
    );
    const mymovies = await response.json()

    const similarResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en-US&page=1`
    );
    const similarMovies = await similarResponse.json()

    container.innerHTML = `
        <div class="details">
            <img class="imgdetails" src=http://image.tmdb.org/t/p/w500/${mymovies.poster_path}>
            <h1>${mymovies.original_title}</h1>
            <p>${mymovies.overview}</p>

            <div class=movies>
                ${similarMovies.results.map((data)=>(
                    `
                    <div ondblclick=movieDetails(${data.id})>
                        <img src=http://image.tmdb.org/t/p/w500/${data.poster_path}>
                        <h1>${data.title}</h1>
                    </div>
                    `
                )).join("")}
            </div>

        </div>
    `
}

getMovies()