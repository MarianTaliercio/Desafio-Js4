const requestAPI = async (pokemon) => {
    const baseURL = "https://pokeapi.co/api/v2/pokemon/";

    const conexion = await fetch (baseURL + pokemon)
    .then(response => response.json())
    .catch(reject => console.log(reject));
    
    // console.log(conexion);
    return conexion;
    
}
   
requestAPI();