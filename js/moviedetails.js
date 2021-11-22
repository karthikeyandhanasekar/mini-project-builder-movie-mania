
const search = new URLSearchParams(window.location.search)

const id = search.get("movieid")

//

const moviedetails = async () => {

    try {
     
        const api = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&append_to_response=videos`)
        const data = api.data
        console.log(data);
        document.title= data.title
        const genre = data.genres.map(ele => ele.name).join(",")
        const languages =  data.spoken_languages.map(ele => ele.english_name).join(",")
        console.log(genre);
        console.log(languages);

        document.querySelector(".movietitle").innerHTML=`${data.title} <span class="rating"><i class="star">☆</i> ${data.vote_average}</span>`
        document.querySelector(".overview").innerHTML= data.overview
        document.querySelector(".runtime").innerHTML= `<b>Runtime</b> : ${data.runtime} min`
        document.querySelector(".language").innerHTML=`<b> Spoken Languages :</b> ${languages}`
        document.querySelector(".genres").innerHTML=`<b>Genres :</b> ${genre}`
        document.querySelector(".imgposter").src=`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
        document.querySelector(".imgposter").alt=data.title

    } catch (error) {   
        console.log(error);
    }
}

window.onload = () => moviedetails()