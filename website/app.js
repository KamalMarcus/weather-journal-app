// import { url } from "inspector";

/* Global Variables */
const API_KEY='8dd55cd83e819308a10d354b1cb6f8d5'; 
const BASE_URL=`http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=`;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeather= async(zip='',data={})=>{
    const url=BASE_URL+zip
    const response=await fetch(url,{
        method:'GET',
        credentials:'same-origin',
    
    });

    try{
        const newData=await response.json();
        console.log(newData);
        return newData;
    }
    catch(error){
        console.log("error",error);
    }
}
document.getElementById("generate").addEventListener('click',async()=>{
    var zip=document.getElementById("zip").value
    const weatherResponse=await getWeather(zip);
    const data={
        temperature: weatherResponse.main.temp,
        date: newDate,
        userResponse: document.getElementById("feelings").value
    }
    await postWeatherData('/add_data',data)
    updateUI();
})

const postWeatherData = async (path, data = {}) => {
    const response = await fetch(path, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  const updateUI = async () => {
    const weatherResponse = await fetch('/get_data')
    const jsonResponse = await weatherResponse.json()
    document.getElementById('date').innerHTML = `Date: ${jsonResponse.date}`
    document.getElementById('content').innerHTML = `You feel: ${jsonResponse.userResponse}`
    document.getElementById('temp').innerHTML = `Temperature: ${jsonResponse.temperature}`
  }