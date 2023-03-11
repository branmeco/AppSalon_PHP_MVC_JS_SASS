let paso = 1;

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

const iniciarApp = () => {
    tabs(); //Cambia la sección cuando se presione los tabs
}

const mostrarSeccion = () => {
    console.log('Mostrando seccion...');
}

const tabs = () => {
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton =>{
        boton.addEventListener('click', function(e){
            paso = parseInt(e.target.dataset.paso);

            mostrarSeccion();
        });
    });
}