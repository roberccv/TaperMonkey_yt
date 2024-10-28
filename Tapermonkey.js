// ==UserScript==
// @name         YouTube modificacion
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Personaliza YouTube: añade un botón para ocultar/mostrar la sección de comentarios y cambiar de modo
// @author       TuNombre
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Variable para rastrear el estado de los comentarios (ocultos o visibles)
    let commentsVisible = true;

    // Función para alternar la visibilidad de la sección de comentarios
    const toggleCommentsSection = () => {
        const commentsSection = document.querySelector('#comments'); // Selecciona el contenedor de comentarios
        if (commentsSection) {
            commentsSection.style.display = commentsVisible ? 'none' : ''; // Oculta o muestra la sección de comentarios
            commentsVisible = !commentsVisible; // Alterna el estado
        }
    };

    // Función para añadir un botón para poner y quitar los comentarios de cualquier disco
    const addCommentToggleButton = () => {
        const header = document.querySelector('#container.ytd-masthead'); // Selecciona el encabezado superior
        if (header && !document.querySelector('#commentToggleButton')) {
            const button = document.createElement('button');
            button.id = 'commentToggleButton';
            button.innerText = 'Ocultar Comentarios';
            button.style.marginLeft = '10px';
            button.style.padding = '5px 10px';
            button.style.fontWeight = 'bold';
            button.style.cursor = 'pointer';
            button.style.backgroundColor = '#FF4500';
            button.style.color = '#FFFFFF';
            button.style.border = 'none';
            button.style.borderRadius = '5px';

            // Alternar la visibilidad de la sección de comentarios al hacer clic
            button.onclick = () => {
                toggleCommentsSection();
                button.innerText = commentsVisible ? 'Ocultar Comentarios' : 'Mostrar Comentarios'; // Cambia el texto del botón
            };

            header.appendChild(button); // Añade el botón en el encabezado
        }
    };

    // Función para añadir un botón de cambio de modo y cambiar entre claro y oscuro -> función añadida
    const addDarkModeToggleButton = () => {
        const header = document.querySelector('#container.ytd-masthead'); // Selecciona el encabezado superior
        if (header && !document.querySelector('#darkModeToggleButton')) {
            const button = document.createElement('button');
            button.id = 'darkModeToggleButton';
            button.innerText = 'Cambiar Modo';
            button.style.marginLeft = '20px';
            button.style.padding = '5px 10px';
            button.style.fontWeight = 'bold';
            button.style.cursor = 'pointer';
            button.style.backgroundColor = '#1DA1F2';
            button.style.color = '#FFFFFF';
            button.style.border = 'none';
            button.style.borderRadius = '5px';

            // Alternar el modo claro/oscuro al hacer clic
            button.onclick = () => {
                document.documentElement.toggleAttribute('dark'); // Activa o desactiva el modo oscuro
            };

            header.appendChild(button); // Añade el botón en el encabezado
        }
    };

    const init = () => {
        addDarkModeToggleButton();
        addCommentToggleButton();
    };

    window.addEventListener('load', init);
    setInterval(init, 2000);
})();
