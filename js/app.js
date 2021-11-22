const apikey = "2debe0f00b477f3d87075013e384ea67";
const main = document.querySelector("main")
const pages = 10






const fetchmovies = async ({ pageno, sortby }) => {
    try {

        const api = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&page=${pageno}&sort_by=vote_count.desc`)

        if (api.status === 200)
            return api.data.results

    } catch (error) {
        console.log(error);

    }

}



const displaydata = async (event) => {
    main.innerHTML = ""

    for (let index = 1; index <= pages; ++index) {
        const data = await fetchmovies({
            pageno: index
        })

        //const filterdata = data.filter(element => new Date(element.release_date).valueOf() < date)
        //console.log(filterdata);
        data.forEach(element => {

            document.querySelector("main").innerHTML += generateblock(
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



window.onload = () => displaydata()
