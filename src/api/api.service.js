export async function getWeather(location) {
  const startDate = location.data.description.event_opened.split("T")[0];
    const endDate = location.data.description.event_closed.split("T")[0];
    const url = `https://meteostat.p.rapidapi.com/point/daily?units=imperial&lat=${location.data.address.latitude}&lon=${location.data.address.longitude}&alt=43&start=${startDate}&end=${endDate}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "2b26d22999msh777e3b4d45cf340p1c6b95jsn25357dbdfe0a", // Would definitely abstract this value out
        "x-rapidapi-host": "meteostat.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      // location.weather = JSON.parse(result);
      return JSON.parse(result);
      // props.incidents[index].weather = JSON.parse(result);
      // weatherData.value.push(JSON.parse(result));
      // console.log("RESULT", fileArray);
    } catch (error) {
      console.error(error);
    }
} 