const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const mOne1 = document.querySelector(".p11");
const mTwo2 = document.querySelector(".p22");
const mOne = document.querySelector(".p1");
const mTwo = document.querySelector(".p2");
const alert = document.querySelector(".alertIcon");
const loc = document.querySelector(".locIcon");

mOne1.classList.add("hid");
mTwo2.classList.add("hid");
alert.classList.add("hid");
loc.classList.add("hid");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  mOne1.classList.remove("hid");
  fetch(`/weather?address=${searchInput.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        mTwo2.classList.add("hid");
        mOne1.classList.remove("success");
        mOne1.classList.add("error");
        loc.classList.add("hid");
        alert.classList.remove("hid");
        mOne.textContent = data.error;
        mTwo.textContent = "";
      } else {
        mTwo2.classList.remove("hid");
        mOne1.classList.add("success");
        mTwo2.classList.add("weather");
        loc.classList.remove("hid");
        alert.classList.add("hid");
        mOne.textContent = `Location: ${data[0].location}`;
        mTwo.textContent = `Weather is ${data[0].weather} with ${data[0].temp}°C. It feels like ${data[0].feelsLike}°C and the rain probability is ${data[0].precip}%`;
      }
    });
  });
});
