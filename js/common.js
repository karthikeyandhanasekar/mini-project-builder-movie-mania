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
        window.open(`moviedetails.html?movieid=${id}`)
    } catch (error) {
        console.log(error);
    }
}
generatelanguage()

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

