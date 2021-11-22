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
const getlanguages = async () => {
    try {

        const api = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${apikey}`)
        if (api.status === 200)
            return await api.data

    } catch (error) {
        console.log(error);

    }
}

const generatelanguage = async () => {
    const avaiablelang = await getlanguages()
    avaiablelang.forEach(element => {

        document.querySelector("#lang").innerHTML += `<option label="${element.english_name}" value="${element.iso_639_1}" ${element.iso_639_1 === "en" ? selected = "selected" : ""} ></option>\n`
    });
}
generatelanguage()
const getlang = async () => {
    try {
        const lang = document.querySelector("#language").value
        console.log(lang);
        document.querySelector("main").innerHTML = ""
        for (let index = 1; index <= pages; ++index) {

            const api = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&page=${index}`)

            const data = await api.data.results
            const filterdata = data.filter(ele => ele.original_language === lang)
            filterdata.forEach(element => {
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