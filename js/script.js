// Getting the input value
document.getElementById("button-search").addEventListener("click", function () {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadMobiles(searchText);
  toggleSpinner("block");
  searchField.value = "";
});
// Getting mobile data
const loadMobiles = (phoneName) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getMobiles(data));
};
//Spinner display
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};

//Showing mobiles in UI
const getMobiles = (phones) => {
  const PhoneCards = document.getElementById("phone-cards");
  const details = document.getElementById("details-card");
  details.textContent = "";
  toggleSpinner("none");
  PhoneCards.textContent = "";
  //Giving an error messange if no mobile found
  if (phones.status === false) {
    const error = document.createElement("div");
    error.classList.add("mx-auto", "p-3");
    error.innerHTML = `<h2>Sorry!No phones found.</h2>`;
    PhoneCards.appendChild(error);
    details.textContent = "";
  }
  for (let i = 0; i <= 19; i++) {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card p-3">
        <div class="mx-auto mb-3">
            <img src="${phones.data[i].image}" class="card-img-top" alt="...">
        </div>
        <div class="card-body text-center card-body-style">
            <h5 class="card-title fw-bolder">${phones.data[i].phone_name}</h5>
            <h6>${phones.data[i].brand}</h6>
            <button onclick="loadDetails('${phones.data[i].slug}')" type="button" class="btn btn-outline-dark">Details</button>
        </div>
    </div>
      `;
    PhoneCards.appendChild(div);
  }
};

//Details section

//Fetching details data
const loadDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getDetails(data.data));
};
//Shwing details in UI
const getDetails = (features) => {
  const details = document.getElementById("details-card");
  details.innerHTML = `
    <div class="card mb-3 mx-auto p-3 detail-card-style" style="max-width: 840px;" >
        <div class="row g-0">
            <div class="col-md-2">
                <img src="${
                  features.image
                }" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-2">
                <div class="card-body">
                    <h5 class="card-title">${features.name}</h5>
                    <p class="card-text"><small class="text-muted">${
                      features.releaseDate ? features.releaseDate : "Not found"
                    }</small></p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card-body">
                    <h5 class="card-title fw-bolder">Main features</h5>
                    <p><span class="fw-bold">Chip Set:</span>${
                      features.mainFeatures.chipSet
                        ? features.mainFeatures.chipSet
                        : "Not Found"
                    }</p>
                    <p><span class="fw-bold">Display Size:</span>${
                      features.mainFeatures.displaySize
                        ? features.mainFeatures.displaySize
                        : "Not Found"
                    }</p>
                    <p><span class="fw-bold">Memory:</span>${
                      features.mainFeatures.memory
                        ? features.mainFeatures.memory
                        : "Not Found"
                    }</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card-body">
                <h5 class="card-title fw-bolder">Others</h5>
                <p><span class="fw-bold">Bluetooth:</span>${
                  features?.others?.Bluetooth
                    ? features?.others?.Bluetooth
                    : "Not Found"
                }</p>
                <p><span class="fw-bold">GPS:</span>${
                  features?.others?.GPS ? features?.others?.GPS : "Not found"
                }</p>
                <p><span class="fw-bold">NFC:</span>${
                  features?.others?.NFC ? features?.others?.NFC : "Not Found"
                }</p>
                <p><span class="fw-bold">Radio:</span>${
                  features?.others?.Radio
                    ? features?.others?.Radio
                    : "Not found"
                }</p>
                <p><span class="fw-bold">USB:</span>${
                  features?.others?.USB ? features?.others?.USB : "Not Found"
                }</p>
                <p><span class="fw-bold">WLAN:</span>${
                  features?.others?.WLAN ? features?.others?.WLAN : "Not found"
                }</p>
                </div>
            </div>
            <div class="col-md-2">
                <div class="card-body">
                    <h5 class="card-title fw-bolder">Sensors</h5>
                    <span>${
                      features.mainFeatures.sensors[0]
                        ? features.mainFeatures.sensors[0]
                        : ""
                    }</span>,
                    <span>${
                      features.mainFeatures.sensors[1]
                        ? features.mainFeatures.sensors[1]
                        : ""
                    }</span>,
                    <span>${
                      features.mainFeatures.sensors[2]
                        ? features.mainFeatures.sensors[2]
                        : ""
                    }</span>,
                    <span>${
                      features.mainFeatures.sensors[3]
                        ? features.mainFeatures.sensors[3]
                        : ""
                    }</span>,
                    <span>${
                      features.mainFeatures.sensors[4]
                        ? features.mainFeatures.sensors[4]
                        : ""
                    }</span>,
                    <span>${
                      features.mainFeatures.sensors[5]
                        ? features.mainFeatures.sensors[5]
                        : ""
                    }</span>
                </div>
            </div>
        </div>
    </div>
  `;
};
