const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
let card = document.getElementsByClassName('card');
let users = [];


fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(res => res.json())
  .then(data => getUsers(data))
  .then(data => randomCard(data))
  .catch(error => console.log('Error 404', error))

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