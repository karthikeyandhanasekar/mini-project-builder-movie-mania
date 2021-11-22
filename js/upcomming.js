

const upcommingmovie = async ({ page }) => {
    try {
        const api = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&page=${page}`)
        if (api.status === 200)
            return api.data.results

    } catch (error) {
        console.log(error);
    }
}

const upcomming = async () => {
    try {
        for (let index = 3; index <= pages; ++index) {
            const data = await upcommingmovie(
                {
                    page: index
                })
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

    } catch (error) {
        console.log(error);
    }
}

window.onload = () => upcomming()