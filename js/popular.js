const apikey = "2debe0f00b477f3d87075013e384ea67";
const pages = 10

const fetchpopularmovies = async ({ pages }) => {
    try {

        const api = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${pages}`)
        if (api.status === 200)
            return api.data.results

    } catch (error) {
        console.log(error);

    }

}


const popularmovies = async () => {
    try {
        for (let index = 1; index <= pages; ++index) {
            const data = await fetchpopularmovies(
                {
                    pages: index
                }
            )
            document.title = "Popular"
            data.forEach(element => {
                document.querySelector("#popular").innerHTML += generateblock(
                    {
                        title: element.original_title,
                        releaseat: element.release_date,
                        id: element.id,
                        imgsrc: element.backdrop_path,
                        like: element.vote_average,
                        view: element.vote_count

                    }
                )
            });

        }

    } catch (error) {
        console.log(error);

    }
}
const generateblock = ({ title, releaseat, imgsrc, like, view, id }) => {

    return `<div class="movie" id=${id} onclick="return moviedetail(this.id)">
    <h4 class="title" >${title}</h4>
    <p class="releaseat">Released : ${releaseat}</p>
    <img src="https://image.tmdb.org/t/p/w500/${imgsrc}" alt="${title}" loading="lazy" >
    <div class="likeview">
        <span class="like">❤ ${like}</span>
        <span class="views">👁 ${view}</span>
    </div>`

}

window.onload = () => popularmovies()