const withdraw = document.getElementById("withdraw-amount");

const apiKey = "33980044ee81551f9abe638d67dd1337";
const main = document.getElementById("main");
const weather = document.getElementById("weather");
const search = document.getElementById("search");

const url = (code) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${code}&appid=${apiKey}&units=imperial`;

let code = 84074;
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${code}&appid=${apiKey}&units=imperial`
)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
  });

async function getWeatherByLocation(code) {
  const resp = await fetch(url(code), {
    origin: "cros",
  });
  const respData = await resp.json();

  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = Math.floor(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `<h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°F <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
  <h3>${data.weather[0].main}</h3>`;

  //   cleanup
  main.innerHTML = "";
  main.appendChild(weather);
}

weather.addEventListener("submit", (e) => {
  e.preventDefault();

  const code = search.value;

  if (code) {
    getWeatherByLocation(code);
  }
});

//deposit button event handler
const deposit_btn = document.getElementById("deposit-btn");
deposit_btn.addEventListener("click", function () {
  const depositStringToInt = getInputNumb("deposit-amount");

  updateSpanTest("current-deposit", depositStringToInt);
  updateSpanTest("current-balance", depositStringToInt);

  //setting up the input field blank when clicked
  document.getElementById("deposit-amount").value = "";
});

//withdraw button event handler
const withdraw_btn = document.getElementById("withdraw-btn");
withdraw_btn.addEventListener("click", function () {
  const withdrawNumb = getInputNumb("withdraw-amount");

  updateSpanTest("current-withdraw", withdrawNumb);
  updateSpanTest("current-balance", -1 * withdrawNumb);
  //setting up the input field blank when clicked
  document.getElementById("withdraw-amount").value = "";
});

//function to parse string input to int
function getInputNumb(idName) {
  const amount = document.getElementById(idName).value;
  const amountNumber = parseFloat(amount);
  return amountNumber;
}

function updateSpanTest(idName, addedNumber) {
  //x1.1 updating balance the same way
  const current = document.getElementById(idName).innerText;
  const currentStringToInt = parseFloat(current);

  const total = currentStringToInt + addedNumber;

  //x1.2 setting this value in balance
  document.getElementById(idName).innerText = total;
}

// btnSuccess.addEventListener("click", validate);

// function validate(e) {
//   e.preventDefault();

//   const btnSuccess = document.getElementsByClassName("btn-success");
//   let valid = true;

//   if (!depositAmount.value) {
//     const inputError = document.getElementById("inputError");
//     inputError.classList.add("visible");
//     btnSuccess.classList.add("invalid");
//     inputError.setAttribute("aria-hidden", false);
//     inputError.setAttribute("aria-invalid", true);
//   }

//   return valid;
// }

// function validateForm() {
//   if (document.getElementById("deposit-amount").value === "") {
//     btnSuccess.disabled = true;
//   } else {
//     btnSuccess.disabled = false;
//   }
// }
