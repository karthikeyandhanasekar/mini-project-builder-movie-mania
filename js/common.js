const apikey = "2debe0f00b477f3d87075013e384ea67";
const pages = 10


document.querySelector("main").onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.querySelector("main").scrollTop > 600) {

        document.querySelector("#scrolltotop").style.display = "block";
    } else {
        document.querySelector("#scrolltotop").style.display = "none";
    }
}

const scrolltotop = () => {
    document.querySelector("main").scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

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
                        title: element.title,
                        releaseat: element.release_date,
                        id: element.id,
                        imgsrc: element.backdrop_path,
                        like: element.vote_average,
                        view: element.vote_count

                    }
                )
            });
        }
        if (document.querySelector("main").innerHTML === "") {
            document.querySelector("main").innerHTML = "<h1 class='notfound'>Sorry for the Inconvience.</h1>"
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

const moviedetail = async (id) => {

    try {
        window.open(`../pages/moviedetails.html?movieid=${id}`)
    } catch (error) {
        console.log(error);
    }
}
generatelanguage()
/*
adult: false
backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg"
belongs_to_collection:
backdrop_path: "/xfKot7lqaiW4XpL5TtDlVBA9ei9.jpg"
id: 263
name: "The Dark Knight Collection"
poster_path: "/l4T8JVwircGZlZuSl29U3TS9mpl.jpg"
[[Prototype]]: Object
budget: 185000000
genres: Array(4)
0: {id: 18, name: 'Drama'}
1: {id: 28, name: 'Action'}
2: {id: 80, name: 'Crime'}
3: {id: 53, name: 'Thriller'}
length: 4
[[Prototype]]: Array(0)
homepage: "https://www.warnerbros.com/movies/dark-knight/"
id: 155
imdb_id: "tt0468569"
original_language: "en"
original_title: "The Dark Knight"
overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker."
popularity: 72.831
poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
production_companies: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
production_countries: (2) [{…}, {…}]
release_date: "2008-07-14"
revenue: 1004558444
runtime: 152
spoken_languages: Array(2)
0: {english_name: 'English', iso_639_1: 'en', name: 'English'}
1: {english_name: 'Mandarin', iso_639_1: 'zh', name: '普通话'}
length: 2
[[Prototype]]: Array(0)
status: "Released"
tagline: "Why So Serious?"
title: "The Dark Knight"
video: false
vote_average: 8.5
vote_count: 26233*/


const searchmovie = async () => {
    try {
        document.querySelector("main").innerHTML = ""
        console.log(document.querySelector("#search").value);
        const keyword = document.querySelector("#search").value.trim().split(" ").join("-")
        console.log(keyword);
        if (keyword === '') {
            location.reload(true)
        }
        for (let index = 1; index <= pages; ++index) {
            console.log(`https://api.themoviedb.org/3/search/multi?api_key=2debe0f00b477f3d87075013e384ea67&query=${keyword}&page=${index}`);
            const api = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=2debe0f00b477f3d87075013e384ea67&query=${keyword}&page=${index}`)
            const data = api.data.results
            if (data !== []) {

                data.forEach(element => {
                    if (element.title) {
                        document.querySelector("main").innerHTML += generateblock(
                            {
                                title: element.title,
                                releaseat: element.release_date,
                                id: element.id,
                                imgsrc: element.backdrop_path,
                                like: element.vote_average,
                                view: element.vote_count

                            }
                        )
                    }
                });
            }

        }
    } catch (error) {
        console.log(error);

    }

}

