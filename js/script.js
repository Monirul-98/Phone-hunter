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
    .then((data) => console.log(data.data));
};
