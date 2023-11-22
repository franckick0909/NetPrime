
function vote_average(vote) {
  let color = ''
  if (vote >= 8) {
    color = 'green'
  } else if (vote >= 6) {
    color = 'orange'
  } else {  
    color = 'red'
  }
  return color
}
let vote = document.querySelectorAll('.vote')
vote.forEach(vote => {
  vote.classList.add(vote_average(vote.textContent))
})


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTkzYzZkZjU4ZTdmM2YzNjBkNGRiYmE0NDc5NTkwNiIsInN1YiI6IjY1MTJkZGU3ZTFmYWVkMDBlM2Y3Y2VkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LynkxMvqFrVIp7sZpBgPb4SmsuXHnoUQIgBgxoBsDVg'
  }
};

fetch('https://api.themoviedb.org/3/discover/movie?certification_country=France&include_adult=true&include_video=true&language=fr-en-US&page=1&sort_by=popularity.desc&with_cast=%28OR%29&with_companies=%28OR%29&with_crew=%28OR%29&with_genres=%28OR%29&with_keywords=%28OR%29&with_people=%28OR%29&with_watch_monetization_types=%28OR%29&with_watch_providers=%28OR%29', options)
.then(response => response.json())
.then(data => {
    console.log(data)
  
    const wrapper1 = document.querySelector('.swiper-wrapper');
    data.results.forEach(movie => {
      const slide1 = document.createElement('div');
      slide1.className = 'swiper-slide';
      slide1.innerHTML = 
      `
      <div class="card">
        <div class="card-image">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
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
      </div>
      `

      wrapper1.appendChild(slide1);
    });
  })
.catch(err => console.error(err));

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1300: {
      slidesPerView: 6,
    },
    1200: {
      slidesPerView: 5,
    },
    900: {
      slidesPerView: 4,
    },
    700: {
      slidesPerView: 3,
    },
    500: {
      slidesPerView: 2,
    },
  },
});



const option = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTkzYzZkZjU4ZTdmM2YzNjBkNGRiYmE0NDc5NTkwNiIsInN1YiI6IjY1MTJkZGU3ZTFmYWVkMDBlM2Y3Y2VkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LynkxMvqFrVIp7sZpBgPb4SmsuXHnoUQIgBgxoBsDVg'
  }
};

fetch('https://api.themoviedb.org/3/tv/popular?language=fr-en-US&page=1', option)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  
    const wrapper2 = document.querySelector('.wrapper2');
    data.results.forEach(serie => {
      const slide2 = document.createElement('div');
      slide2.className = 'swiper-slide';
      slide2.innerHTML = 
      `
      <div class="card">
        <div class="card-image">
          <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" alt="${serie.title}">
        </div>
        <div class="profile-details">
          <div class="title">
            <h3 class="name">${serie.name}</h3>
          </div>
          <div class="between">
            <div class="year">
              <span class="date">${serie.first_air_date}</span>
            </div>
            <div class="stars">
            <i class="fas fa-star"></i>
            <span class="number ${vote_average(serie.vote_average)} vote">${serie.vote_average}</span>
          </div>
          </div>
        </div>
      </div>
      `
      wrapper2.appendChild(slide2);
    });
  })
.catch(err => console.error(err));

var swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 1,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1300: {
      slidesPerView: 6,
    },
    1200: {
      slidesPerView: 5,
    },
    900: {
      slidesPerView: 4,
    },
    700: {
      slidesPerView: 3,
    },
    500: {
      slidesPerView: 2,
    },
  },
});