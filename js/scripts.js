const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
let card = document.getElementsByClassName('card');
let users = [];


/*
Fetches the API from randomuser.me
*/
fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(res => res.json())
  .then(data => getUsers(data))
  .then(data => randomCard(data))
  .catch(error => console.log('Error 404', error))

/*
Function which adds 12 random users and their displays.
*/

function getUsers(data) {
  users = data.results;
  const randomUsers = users;
  
  randomUsers.forEach(user => {
  
    const html = `
      <div class = "card">
        <div class = "card-img-container">
          <img class="card-img" src="${user.picture.medium}" alt="profile picture">
        </div> 
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
      </div>
      `
    
    gallery.innerHTML += html;
    
  });

}

/*
Function which adds the modal window.
*/

const div = document.createElement('div');
div.className = "modal-container"
body.append(div);
const modalContainer = document.querySelector('.modal-container');
modalContainer.style.display = 'none';


function modalWindow(i) {

   const user = users[i];
   const birthdayDay = user.dob.date.substring(8, 10);
   const birthdayMonth = user.dob.date.substring(5, 7);
   const birthdayYear = user.dob.date.substring(0, 4);
   const birthday = `Birthday: ${birthdayMonth}/${birthdayDay}/${birthdayYear}`;
  
   const phone = user.phone;
   const phoneFormat = phone.replace(/\D+/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  
  /*
  Generates HTML for modal window.
  */
  
  const modalHTML = `
          <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${phoneFormat}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}. ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">${birthday}</p>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
          `;
  modalContainer.innerHTML = modalHTML;
  
  /*
  Buttons for closing, selecting next and previous for modal window.
  */
  
  
  $('#modal-close-btn').click(function() {
    $('.modal-container').hide();
  })
  
  
  $('button#modal-next').click(function() {
    modalWindow(i + 1);
    $('.modal-container').show()
  
  })
  
  $('button#modal-prev').click(function() {
    modalWindow(i - 1);
    $('.modal-container').show()
  
  })
  userNumber(i);
  
}

/*
Function which checks the next and previous buttons.
*/


function userNumber(i) {
  if (i <= 0) {
    $('button#modal-prev').hide();
  } else if (i >= 11) {
    $('button#modal-next').hide();
  }

}

/*
Add Event Listener for the randomCard data.
*/


function randomCard() {
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener('click', function() {
      modalWindow(i);
      $('.modal-container').show();
    })
  
  }
}


/*
Search Bar
*/

const search = document.querySelector('.search-container');
const userSearch = document.createElement('form');

search.appendChild(userSearch);
search.innerHTML = `
    <form action="#" method="get">
                   <input type="search" id="search-input" class="search-input" placeholder="Search...">
                   <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
           </form>
`;


const searchSubmit = document.querySelector('#search-submit');
let input = document.querySelector('#search-input');
input.addEventListener('keyup', search_user);
searchSubmit.addEventListener('click', search_user);


function search_user(event) {
  for (i = 0; i < card.length; i++) {
    if (!name.includes(input.value.toLowerCase())) {
      event.preventDefault();
      card[i].style.display = "none";
    } else {
      card[i].style.display = "flex";
    }
  }

}


