

//when se install serviceWorker
self.addEventListener('install', e=>{
    console.log("Instalado el service worker");

    console.log(e);
})

//Activate serviceWorker
self.addEventListener('activate', e=>{
    console.log("Service worker activado");

    console.log(e);
})

//Event fecth for download statics files
self.addEventListener('fetch',e=>{
    console.log('Fetch...',e);
});