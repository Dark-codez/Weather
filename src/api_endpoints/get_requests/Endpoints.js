export const getWeather = async ({queryKey}) => {
    // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queryKey[1]}&appid=424a66d400fb78f1051e40ef109cd9d2`);
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queryKey[1]}&appid=424a66d400fb78f1051e40ef109cd9d2`);
    const data = await res.json();  
    return data;
}
