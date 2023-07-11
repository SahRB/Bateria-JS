const contextoAudio = new (window.AudioContext || window.webkitAudioContext)();

function tocaSom(seletorAudio) {
    const elemento = document.querySelector(seletorAudio);

    if (elemento && elemento.localName === 'audio') {
        elemento.currentTime = 0;
        elemento.play().catch(function(error) {
            console.log('Erro ao reproduzir o som:', error);
        });
    } else {
        console.log('Elemento não encontrado ou seletor inválido');
    }
}

const listaDeTeclas = document.querySelectorAll('.tecla');
const teclasAtivas = new Set();


listaDeTeclas.forEach(function(tecla) {
    const instrumento = tecla.classList[1];
    const idAudio = `#som_${instrumento}`;

    tecla.onclick = function () {
        tocaSom(idAudio);
    }

    tecla.onkeydown = function (evento) {
        if (evento.code === 'Space' || evento.code === 'Enter') {
            tecla.classList.add('ativa');
            teclasAtivas.add(tecla);
            tocaSom(idAudio);
        }
    }

    tecla.onkeyup = function () {
        tecla.classList.remove('ativa');
        teclasAtivas.delete(tecla);
    }
});

document.addEventListener('keydown', function(evento) {
    if (evento.code === 'Space' || evento.code === 'Enter') {
        listaDeTeclas.forEach(function(tecla) {
            if (teclasAtivas.has(tecla)) {
                const instrumento = tecla.classList[1];
                const idAudio = `#som_${instrumento}`;
                tocaSom(idAudio);
            }
        });
    }
});