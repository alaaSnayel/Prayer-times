let cities = ["Cairo", "Riyadh", "Manama", "Abu Dhabi", "Amman", "Kuwait City"];
let citie = [
  {
    name: "Cairo",
    code: "EG",
  },
  {
    name: "Riyadh",
    code: "SA",
  },
  {
    name: "Manama",
    code: "BH",
  },
  {
    name: "Abu Dhabi",
    code: "AE",
  },
  {
    name: "Amman",
    code: "JO",
  },
  {
    name: "Kuwait City",
    code: "KW",
  },
  {
    name: "Algiers",
    code: "DZ",
  },
];
for (let city of citie) {
  const content = `
    <option>${city.name}</option>
  `;
  document.getElementById("cities").innerHTML += content;
}
document.getElementById("cities").addEventListener("change", (e) => {
  let cityName = "";
  let cityCode = "";
  for (let city of citie) {
    if (city.name == e.target.value) {
      cityName = city.name;
      cityCode = city.code;
    }
  }
  document.getElementById("city-name").innerHTML = cityName;
  getPrayersTimingsOfCity(cityCode, cityName);
});

function getPrayersTimingsOfCity(countryCode, cityName) {
  let params = {
    country: countryCode,
    city: cityName,
  };

  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      const timings = response.data.data.timings;

      fillTimeForPrayer("fajr", timings.Fajr);
      fillTimeForPrayer("dhuhr", timings.Dhuhr);
      fillTimeForPrayer("asr", timings.Asr);
      fillTimeForPrayer("maghrib", timings.Sunset);
      fillTimeForPrayer("isha", timings.Isha);

      const today = new Date();
      const dayName = today.toLocaleString("en-US", { weekday: "long" });
      const readableDate = response.data.data.date.readable;

      document.getElementById("date").innerHTML = dayName + " " + readableDate;

      console.log(response.data.data.timings);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getPrayersTimingsOfCity("EG", "Cairo");

function fillTimeForPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}
