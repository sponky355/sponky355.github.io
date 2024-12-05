// Agregar funcionalidad al botón de dropdown
document.querySelector('.dropdown-button').addEventListener('click', function () {
    const dropdown = this.parentElement;
    dropdown.classList.toggle('active'); // Alternar entre mostrar y ocultar
});

// Cerrar el menú si se hace clic fuera de él
window.addEventListener('click', function (e) {
    if (!e.target.matches('.dropdown-button')) {
        const dropdowns = document.querySelectorAll('.language-dropdown');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});
