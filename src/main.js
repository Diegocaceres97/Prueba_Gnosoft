if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(registro => console.log("Se registro correctamente",registro))
    .catch(error => console.log("Fallo la instalacion",error))
}else{
    console.log("Service worker no es soportado");
}