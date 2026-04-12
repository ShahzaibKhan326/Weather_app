
let city_name = document.getElementById("user_city");
let default_city = "Karachi";

let temp_box = document.querySelector(".temp_box")

const api_key = "711bc8780457bd2f4156dc13cd40d08a";

let search_btn = document.getElementById("input_search_btn");
let error_message = document.querySelector(".city_not_found_err");


// let afterDay01 = document.querySelector(".AfterDay01");
// let afterDay02 = document.querySelector(".AfterDay02");
// let afterDay03 = document.querySelector(".AfterDay03");

let tab_days = document.querySelectorAll(".tab_days")

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let today = new Date();
    for(let i = 0 ; i < 3 ; i++)
{
    let dayIndex = (today.getDay()+i+1)%7;
    tab_days[i].innerText = days[dayIndex]
    console.log(tab_days.innerText)
}




function renderWeatherCard()
{

    // console.log(today)  

    search_btn.addEventListener("click", handleSearch);

    city_name.addEventListener("keypress",(e) => 
    {
        if(e.key === "Enter") handleSearch();
    })


     function renderError(ErrorMessage)
      {
        error_message.style.display = "block";
        error_message.innerHTML = `
          <h3>${ErrorMessage}</h3>
        `
      }

      function hideError()
      {
        error_message.style.display = "none";
      }

    function handleSearch()
    {
        let city = city_name.value.trim();

        if(!city)
        {
            renderError("Please enter a city name!");
            return;
        }
       
        getWeatherData(city)

    }
     

    function renderDate()
    {
        const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
        const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        
        let calender = document.querySelector(".calender_box")
        let date = new Date()       

        calender.innerHTML = `
        <p class="day">${date.getDate()}</p>
        <p class="month">${months[date.getMonth()]}</p>
        <p class="year">${date.getFullYear()}</p>
        <p class="week_day">${days[date.getDay()]}</p>
        `
    }

    function renderTemp()
    {

        async function getWeatherData(city)
        {
            try {
                let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
                
                if(!res.ok)
                {
                 throw new Error("City Not Found")
                }

                let data = await res.json()
              
                hideError()

                console.log(data)
                
                 temp_box.innerHTML =
                    `
                <p class="temp">${Math.round(data.main.temp)}<span id="deg-symbol">°</span></p>
                <p class="clear">${data.weather[0].main}</p>
                <div class="city_name">${data.name}</div>
                <div class="humidity">Humidity <span>${data.main.humidity}%</span></div>
                `

       
            }
            catch(error)
            {
               console.log(error)
               renderError("City Not Found!")
            }
        }

        return getWeatherData;
    }

    renderDate()

    let getWeatherData = renderTemp();   // to learn this later

    getWeatherData(default_city);

}


renderWeatherCard()



    
