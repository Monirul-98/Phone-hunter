// Getting the input value
document.getElementById("button-search").addEventListener("click", function () {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadMobiles(searchText);
  searchField.value = "";
});
// Getting mobile data
const loadMobiles = (phoneName) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getMobiles(data));
};
//Showing mobiles in UI
const getMobiles = (phones) => {
  const PhoneCards = document.getElementById("phone-cards");
  PhoneCards.textContent = "";
  //Giving an error messange if no mobile found
  if (phones.status === false) {
    const error = document.createElement("div");
    error.classList.add("mx-auto", "p-3");
    error.innerHTML = `<h2>Sorry!No phones found.</h2>`;
    PhoneCards.appendChild(error);
  }
  phones.data?.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card p-3">
        <div class="mx-auto mb-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
        </div>
        <div class="card-body text-center card-body-style">
            <h5 class="card-title fw-bolder">${phone.phone_name}</h5>
            <h6>${phone.brand}</h6>
            <button type="button" class="btn btn-outline-dark">Details</button>
        </div>
    </div>
      `;
    PhoneCards.appendChild(div);
  });
};
