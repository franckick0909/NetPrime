const apikey = '1e93c6df58e7f3f360d4dbba44795906'
const url = 'https://api.themoviedb.org/3/movie/upcoming?language=fr-en-US&page=1&api_key=' + apikey + '&language=fr-en-US&page=1'
const imageSize = 'https://image.tmdb.org/t/p/original/'
const erreur = "Erreur lors de la récupération des données"


const divBanner = document.getElementById("banner");
const image = document.querySelector(".image");
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const bullets = document.querySelector('.bullets')

let count = 0;

async function fetchImages() {
    try {
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data.results)

        

        localStorage.setItem("slide", JSON.stringify(data.results))
    
    } catch (error) {
        alert(erreur)
    }
}

fetchImages()

    const slides = JSON.parse(localStorage.getItem("slide"))
    // console.log(slides[0]);

    slideShow(count);


for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add("dot");
    bullets.appendChild(dot);

    dot.addEventListener("click", () => {
        count = i;
        dotSlidingIndicatorClassList();
        slideShow(count);
        
    });
}


const dot = document.querySelectorAll(".dot");

function dotSlidingIndicatorClassList() {
    for (let i = 0; i < dot.length; i++) {
        dot[i].classList.remove("active");	
    }
    dot[count].classList.add("active");
    // console.log(dot[count]);
        
    slideShow(count);
}

    dotSlidingIndicatorClassList();
next.addEventListener("click", () => {        
	slideSuivante();                            
})

function slideSuivante() {        
	count++;                            
	if (count == slides.length) {      
		count = 0; 
    }                    
	// console.log(count);       

	slideShow(count);          
	dotSlidingIndicatorClassList();
}

prev.addEventListener("click",  () => {       
	slidePrecedant();  
})

function slidePrecedant() {           
	count--;                        
	if (count < 0) {                   
		count = slides.length -1;	
	}
	// console.log(count);          

	slideShow(count);  
	dotSlidingIndicatorClassList()  
}

function slideShow(count) {

    image.classList.add("fade");
    setTimeout(() => {
        image.classList.remove("fade");
    }, 600);

    image.innerHTML = 
    `
    <img class="banner-img" src="${imageSize}${slides[count].backdrop_path}" alt="${slides[count].title}">
    <p>${slides[count].title}</p>
    <h4 class="date-carousel">Sortie prévue le : ${slides[count].release_date}</h4>
    
    `
	// imageSlide.src = `https://image.tmdb.org/t/p/original/${slides[count].backdrop_path}`; 
	// tagSlide.innerHTML = slides[count].title;  
}

// setInterval("slideSuivante(0)", 6000);


// ***** Menu burger ***** //


const buttonHamburger = document.querySelector(".button-burger");
const ul = document.querySelector('.nav-ul')

buttonHamburger.addEventListener("click", () => {
    const currentState = buttonHamburger.getAttribute("data-state");

    if (!currentState || currentState === "closed") {
      buttonHamburger.setAttribute("data-state", "opened");
      buttonHamburger.setAttribute("aria-expanded", "true");
      ul.style.right = '0'
    } else {
      buttonHamburger.setAttribute("data-state", "closed");
      buttonHamburger.setAttribute("aria-expanded", "false");
      ul.style.right = '-100%'
    }
});



// ***** Liens du menu ***** //

const link = document.querySelectorAll(".nav-link");
