
const searchBtn = document.getElementById('search__button')
const searchInput = document.getElementById('search__input')
const results = document.getElementById('movie-results')


const modal = document.getElementById('modal')
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".fa-xmark");
const movieCard = document.querySelectorAll('.movie-card')
const containerModal = document.getElementById('modal-container')


openModal.addEventListener("click", () => {
  modal.showModal();
});

// closeModal.addEventListener("click", () => {
//   modal.setAttribute("closing", "");

//   modal.addEventListener(
//     "animationend",
//     () => {
//       modal.removeAttribute("closing");
//       modal.close();
//     },
//     { once: true }
//   );
// });


searchBtn.addEventListener('click', () => {
    const searchResults = searchInput.value
try {
  
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTkzYzZkZjU4ZTdmM2YzNjBkNGRiYmE0NDc5NTkwNiIsInN1YiI6IjY1MTJkZGU3ZTFmYWVkMDBlM2Y3Y2VkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LynkxMvqFrVIp7sZpBgPb4SmsuXHnoUQIgBgxoBsDVg'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/search/multi?query=${searchResults}&include_adult=true&language=fr-en-US&page=1`, options)
        .then(response => response.json())
        .then(dataAll => {
            console.log(dataAll.results)
                
                
                


            localStorage.setItem('data', JSON.stringify(dataAll.results))
        
        results.innerHTML = ''
        dataAll.results.forEach(movie => {
            const title = movie.title
            const overview = movie.overview
            const poster = movie.poster_path
            const vote = movie.vote_average
            const date = movie.release_date
            const popularity = movie.popularity
            const count = movie.vote_count
            const id = movie.id
            const genre = movie.genre_ids
            const name = movie.name

            const card = document.createElement('div')
            card.dataset.id = movie.id
            card.setAttribute('class', 'movie-card')
            card.innerHTML = 
            `
            <div class="image">
                <a href="#" class="result-img"><img loading="lazy" src="https://image.tmdb.org/t/p/w500/${poster}" alt="${title}"></a>      
            </div>

            <div class="profile-details">
                <div class="title">
                    <h3 class="name">${movie.title}</h3>
                </div>

                <div class="between">
                    <div class="year">
                        <span class="date">${movie.release_date}</span>
                    </div>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <span class="number ${vote_average(movie.vote_average)} vote">${movie.vote_average}</span>
                    </div>
                </div>
            </div>
            `
            results.appendChild(card);

// ******************************************************




// ******************************************************

            if (movie.title === undefined || movie.title === null || movie.title === '' || movie.release_date === undefined || movie.release_date === null || movie.release_date === '' || movie.vote_average === undefined || movie.vote_average === null || movie.vote_average === '' || movie.poster_path === undefined || movie.poster_path === null || movie.poster_path === '') {
                card.innerHTML = 
                `
                <div class="image">
                    <a href="#" class="result-img"><img loading="lazy" src="https://image.tmdb.org/t/p/w500/${poster}" alt="${name}"></a>      
                </div>

                <div class="profile-details">
                    <div class="title">
                        <h3 class="name">${movie.name}</h3>
                    </div>

                    <div class="between">
                        <div class="year">
                            <span class="date">${movie.first_air_date}</span>
                        </div>
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <span class="number ${vote_average(movie.vote_average)} vote">${movie.vote_average}</span>
                        </div>
                    </div>
                `
                results.appendChild(card);
                
            }

            if (movie.poster_path === undefined || movie.poster_path === null || movie.poster_path === '') {
                card.innerHTML = 
                `
                <div class="image">
                    <a href="#" class="result-img"><img loading="lazy" src="https://via.placeholder.com/500x750/000000/FFFFFF/?text=No+image" alt="No image"></a>      
                </div>

                <div class="profile-details">
                    <div class="title">
                        <h3 class="name">No title</h3>
                    </div>

                    <div class="between">
                        <div class="year">
                            <span class="date">No year</span>
                        </div>
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <span class="number ${vote_average(movie.vote_average)} vote">0</span>
                        </div>
                    </div>
                `
                results.appendChild(card);
            }


            const containerModal = document.getElementById('container-modal')

            card.addEventListener('click', () => {
                modal.showModal();

                const btnClose = document.createElement('i')
                btnClose.setAttribute('class', 'close-button fa-solid fa-xmark')


                btnClose.addEventListener("click", () => {
                    modal.setAttribute("closing", "");
                  
                    modal.addEventListener(
                      "animationend",
                      () => {
                        modal.removeAttribute("closing");
                        modal.close();
                      },
                      { once: true }
                    );
                  });

                  if (movie.title === undefined || movie.title === null || movie.title === '' || movie.release_date === undefined || movie.release_date === null || movie.release_date === '') {
                    containerModal.innerHTML = 
                    `            
                    <div class="modal__image">
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.name}">
                    </div>

                    <div class="modal__content">
                        <h2 class="modal__title">${movie.name}</h2>

                        <div class="modal__details">
                            <p class="date"><b>Date de sortie : </b> ${movie.first_air_date}</p>
                            <p class="genre"><b>Genre : </b>${movie.genre_ids}</p>
                            <span class="number ${vote_average(movie.vote_average)} vote"><b>Classement des votes : </b>${movie.vote_average}</span>
                            <p class="overview"><b>Résumé de l'histoire : </b>${movie.overview}</p>
                            <p class="popularity"><b>Popularité : </b>${movie.popularity}</p>
                            <p class="count"><b>Nombre de votes : </b>${movie.vote_count}</p>
                            <p class="id"><b>Id : </b>${movie.id}</p>
                            <p class="name"><b>Nom : </b>${movie.name}</p>
                            <p class="original_name"><b>Nom original : </b>${movie.original_name}</p>
                            <p class="original_language"><b>Langue originale : </b>${movie.original_language}</p>
                            <p class="adult"><b>Adulte : </b>${movie.adult}</p>
                            <p class="video"><b>Vidéo : </b>${movie.video}</p>

                        </div>
                    `
                    closeModal.addEventListener("click", () => {
                        modal.setAttribute("closing", "");
                      
                        modal.addEventListener(
                          "animationend",
                          () => {
                            modal.removeAttribute("closing");
                            modal.close();
                          },
                          { once: true }
                        );
                      });

                      containerModal.appendChild(btnClose)
                    
                  } else {

                    containerModal.innerHTML = 
                    `            
                    <div class="modal__image">
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                    </div>

                    <div class="modal__content">
                        <h2 class="modal__title">${movie.title}</h2>

                        <div class="modal__details">

                            <p class="date"><b>Date de sortie : </b> ${movie.release_date}</p>
                            <p class="genre"><b>Genre : </b>${movie.genre_ids}</p>
                            <span class="number ${vote_average(movie.vote_average)} vote"><b>Classement des votes : </b>${movie.vote_average}</span>
                            <p class="overview"><b>Résumé de l'histoire : </b>${movie.overview}</p>
                            <p class="popularity"><b>Popularité : </b>${movie.popularity}</p>
                            <p class="count"><b>Nombre de votes : </b>${movie.vote_count}</p>
                            <p class="id"><b>Id : </b>${movie.id}</p>
                            <p class="name"><b>Nom : </b>${movie.name}</p>
                            <p class="original_name"><b>Nom original : </b>${movie.original_name}</p>
                            <p class="original_language"><b>Langue originale : </b>${movie.original_language}</p>
                            <p class="adult"><b>Adulte : </b>${movie.adult}</p>
                            <p class="video"><b>Vidéo : </b>${movie.video}</p>

                            

                        </div>
                    `

                    closeModal.addEventListener("click", () => {
                        modal.setAttribute("closing", "");
                      
                        modal.addEventListener(
                          "animationend",
                          () => {
                            modal.removeAttribute("closing");
                            modal.close();
                          },
                          { once: true }
                        );
                      });

                      containerModal.appendChild(btnClose)
                    }

                })
        });
    });  

  } catch (error) {
    alert('Erreur du serveur !')
  }
});

function vote_average(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}