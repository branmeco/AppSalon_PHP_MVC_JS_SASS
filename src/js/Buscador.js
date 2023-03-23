document.addEventListener('DOMContentLoaded', function(){
    iniciarAp();
});

const iniciarAp = () => {
    buscarPorfecha();
}

const buscarPorfecha = () => {
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input', function(e){
        const fechaSeleccionada = e.target.value;

        window.location = `fecha=$fechaSeleccionada`;
    });
}