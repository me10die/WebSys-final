const container = document.getElementById("container")
const getMovies = async () => {
    const response = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en-US&page=1'
    );
    const mymovies = await response.json()
    container.innerHTML = mymovies.results.map((data)=>(
        `
        <div>
            <img src=http://image.tmdb.org/t/p/w500/${data.poster_path}>
            <h1>${data.title}</h1>
        </div>
        `
    )).join("")
};


const searchMovies = async (title) => {
    const response = await fetch(
        'https://api.themoviedb.org/3/search/movie?api_key=1bfdbff05c2698dc917dd28c08d41096&query=the+avengers'
    );
};

getMovies()