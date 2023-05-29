
// ------------------------- owl carousel script ------------------------------

$('.owl-carousel').owlCarousel({
  stagePadding: 80,
  loop:true,
  margin:10,
  nav:true,
  autoplay:true,
  autoplayTimeout:1000,
  autoplayHoverPause:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:1
      }
  }
})

// ------------------------- Get data from api ----------------------------

const apiUrl = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=04c35731a5ee918f014970082a0088b1&page=9';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

// ------------ function for fetch data from api ----------------------------
async function getMovies() {
  try {
    const fetchData = await fetch(apiUrl);
    const data = await fetchData.text()
    const obj = await JSON.parse(data);
    console.log(obj)
    for(let j = 0; j <= obj.results.length; j++) {

      const voteCount = obj.results[j].vote_count;
      const formattedVoteCount = formatVoteCount(voteCount);
      
      // console.log(formattedVoteCount); // Example: 134K

    let apiPath = obj.results[j].poster_path;
    let moviePoster = IMGPATH + apiPath;
      document.getElementById("pr-id").innerHTML += `
              <div class="product-box d-flex">
                  <div class="card w-100 my-2">
                      <img src="${moviePoster}" class="card-img-top image position-relative" style="aspect-ratio: 1 / 1">
                      <div class="middle">
                      <form method='POST' action="booking.html?id=${j}">
                      <button type="submit" class="text">Book Ticket</button>
                      </form>
                      
                      </div>
                      <div class="card-body d-flex flex-column align-items-center p-0">
                      <div class="top w-100 d-flex flex-row align-items-center p-0">
                      <i class="fa-solid fa-star"></i>  <p class="card-title mb-0">${obj.results[j].vote_average+"/10"}</p>
                      <p class="mb-0">${formattedVoteCount}</p>
                      </div>
                     <div class="w-100 align-items-start py-2"><h5>${obj.results[j].title}</h5></div>
                     <div>
                     </div>
                      </div>
                  </div>

              </div>
              `;
    }
  } catch (error) {
    console.log('Error:', error);
  }
}
getMovies();
// ------------ function for count votes of movies --------------------
function formatVoteCount(count) {
  if (count >= 1000) {
    const formattedCount = (count / 1000).toFixed(1);
    return `${formattedCount}K votes`;
  } else {
    return `${count} votes`;
  }
}

// ------ Sign up form data store into local storage --------------------------
let btn = document.getElementById("modalData")
let dataFromLocal = JSON.parse(localStorage.getItem("USER"));
btn.addEventListener("click", function(){
  const user = {
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("pass").value,
    cPassword: document.getElementById("confirm-pass").value
  }

  dataFromLocal = !dataFromLocal ? [] : dataFromLocal;
  dataFromLocal.push(user);
  localStorage.setItem("USER",JSON.stringify(dataFromLocal));
})

// Window onload
window.onload = function (){
if(dataFromLocal){
  document.getElementById("sign-up-button").style = "display: none;";
  document.getElementById("here").style = "display: block;";
}
}

// logout button functionality
function logout(){
  localStorage.clear();
  window.location.reload();
}

// ---------- function for get particular movie data in booking.html page -----
async function show(){
  try {
    const fetchData = await fetch(apiUrl);
    const data = await fetchData.text()
    const obj = await JSON.parse(data);

    // get index from url for selected movie
    let full_url = document.URL;
    let url_array = full_url.split('/').pop();
    let last_value = url_array[url_array.length - 1];
      const voteCount = obj.results[last_value].vote_count;
      const formattedVoteCount = formatVoteCount(voteCount);
      // console.log(formattedVoteCount); // Example: 134K
    let apiPath = obj.results[last_value].poster_path;
    let moviePoster = IMGPATH + apiPath;
    document.getElementById("content-id").style = `background-image: url(${moviePoster});
    background-size: fill;
    height:450px;`
      document.getElementById("card-data-id").innerHTML += `
                  <div class="card w-100 my-2">
                      <img src="${moviePoster}" class="card-img-top position-relative" style="aspect-ratio: 1 / 1">
                      <div class="card-body d-flex flex-column align-items-center p-0">
                      <div class="top w-100 d-flex flex-row align-items-center p-0">
                      <i class="fa-solid fa-star"></i>  <p class="card-title mb-0">${obj.results[last_value].vote_average+"/10"}</p>
                      <p class="mb-0">${formattedVoteCount}</p>
                      </div>
                     <div>
                     </div>
                      </div>
                  </div>
              `;
    
  } catch (error) {
    console.log('Error:', error);
  }

}
show()

