
window.addEventListener("load", function () {
    // Grab the existing history from local storage IF it exists
    var existingHistory;
    if (!JSON.parse(localStorage.getItem("history"))) {
      existingHistory = [];
    } else {
      existingHistory = JSON.parse(localStorage.getItem("history"));
    }
  
    var historyItems = [];
  
    // Function to get the forecast, loop through only the days of the week and render data to the page
    function getForecast(searchValue) {
      if (!searchValue) {
        return;
      }
      var endpoint = `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`;
      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
          // Select our forecast element and add a header to it
          var forecastEl = document.querySelector('#forecast');
          forecastEl.innerHTML = "<h4 class="mt-3">5-Day Forecast:</h4>";
  
          // Create a div and give it a class of row
          forecastRowEl = document.createElement("div");
          forecastRowEl.className = "row";
  
          // Loop over all forecasts (by 3-hour increments)
          for (var i = 0; i < data.list.length; i++) {
            // Only look at forecasts around 3:00pm
            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
              // Create HTML elements for a bootstrap card
              var colEl = document.createElement("div");
              colEl.classList.add("col-md-2");
              var cardEl = document.createElement("div");
              cardEl.classList.add("card", "bg-primary", "text-white");
              var windEl = document.createElement("p");
              windEl.classList.add("card-text");
              windEl.textContent = "Wind Speed: ${data.list[i].wind.speed} MPH";
              var humidityEl = document.createElement("p");
              humidityEl.classList.add("card-text");
              humidityEl.textContent = "Humidity : ${data.list[i].main.humidity} %";
              var bodyEl = document.createElement("div");
              bodyEl.classList.add("card-body", "p-2");
              var titleEl = document.createElement("h5");
              titleEl.classList.add("card-title");
              titleEl.textContent = new Date(
                data.list[i].dt_txt
              ).toLocaleDateString();
              var imgEl = document.createElement("img");
              imgEl.setAttribute(
                "src",
                `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
              );
              var p1El = document.createElement("p");
              p1El.classList.add("card-text");
              p1El.textContent = `Temp: ${data.list[i].main.temp_max} °F`;
              var p2El = document.createElement("p");
              p2El.classList.add("card-text");
              p2El.textContent = `Humidity: ${data.list[i].main.humidity}%`;
  
              // Merge together and put on page
              colEl.appendChild(cardEl);
              bodyEl.appendChild(titleEl);
              bodyEl.appendChild(imgEl);
              bodyEl.appendChild(windEl);
              bodyEl.appendChild(humidityEl);
              bodyEl.appendChild(p1El);
              bodyEl.appendChild(p2El);
              cardEl.appendChild(bodyEl);
              forecastEl.appendChild(colEl);
            }
          }
        });
    }
  
   
    // Attach our getSearchVal function to the search button
    document
      .querySelector('#search-button')
      .addEventListener('click', getSearchVal);
  });
  
  