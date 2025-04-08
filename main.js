// main.js

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
  enlace.addEventListener('click', function(e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Animación al hacer scroll
const observer = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('animado');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.producto-card').forEach(el => observer.observe(el));

// carrusel //
const imagenes = document.querySelectorAll('.carrusel-imagenes img');
const puntos = document.querySelectorAll('.punto');
const btnIzquierda = document.querySelector('.flecha.izquierda');
const btnDerecha = document.querySelector('.flecha.derecha');

let indice = 0;
let intervalo;

function mostrarImagen(indiceNuevo) {
  imagenes[indice].classList.remove('activa');
  puntos[indice].classList.remove('activo');

  indice = (indiceNuevo + imagenes.length) % imagenes.length;

  imagenes[indice].classList.add('activa');
  puntos[indice].classList.add('activo');
}

function siguienteImagen() {
  mostrarImagen(indice + 1);
}

function iniciarCarrusel() {
  intervalo = setInterval(siguienteImagen, 5000);
}

function pausarCarrusel() {
  clearInterval(intervalo);
}

btnIzquierda.addEventListener('click', () => {
  pausarCarrusel();
  mostrarImagen(indice - 1);
  iniciarCarrusel();
});

btnDerecha.addEventListener('click', () => {
  pausarCarrusel();
  mostrarImagen(indice + 1);
  iniciarCarrusel();
});

puntos.forEach((punto, i) => {
  punto.addEventListener('click', () => {
    pausarCarrusel();
    mostrarImagen(i);
    iniciarCarrusel();
  });
});

iniciarCarrusel();

