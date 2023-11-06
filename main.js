let pagina = 1;
const btnAnteriorEl = document.getElementById('btnAnterior');
const btnSiguienteEl = document.getElementById('btnSiguiente');

btnSiguienteEl.addEventListener("click", () => {  //EVENTO PARA QUE AL HACER CLICK EN EL BOTON DE "SIGUIENTE", VAYA A LA PAGINA SIGUIENTE
  if(pagina < 1000){
    pagina += 1;
    CargarPeliculas();
  }
});

btnAnteriorEl.addEventListener("click", () => {   //EVENTO PARA QUE AL HACER CLICK EN EL BOTON DE "ANTERIOR", VAYA A LA PAGINA ANTERIOR
  if(pagina > 1){
    pagina -= 1;
    CargarPeliculas();
  }
})

//FUNCION PARA CARGAR LA PAGINA CON LAS PELICULAS
async function CargarPeliculas() {
  try{
      const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ae67b520ccbaec1116a6f72fa3310d63&languaje=es-MX&page=${pagina}`);

      console.log(respuesta);

      if(respuesta.status === 200){
    const datos = await respuesta.json();
     
    let peliculas = ''
    datos.results.forEach(pelicula => {
      peliculas += `
      <div class="pelicula">
      <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
      <h3 class="titulo">${pelicula.title}</h3>
      </div>
      `
    });
  document.getElementById('contenedor-favoriteMovies').innerHTML = peliculas

      }else if(respuesta.status === 401){
        console.log("Dato ingresado incorrecto");
      } else if(respuesta.status === 404){
        console.log("La pelicula que busca no existe");
      }
  }
   catch(error){
      console.log(error);
   }
}
CargarPeliculas();


const searchEl = document.getElementById('#search');
const moviesEl = document.getElementById('#contenedor-favoriteMovies');
