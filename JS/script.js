// Puxando as funções/classe do CSS para o JavaScript
const mario = document.querySelector('.mario'); // seleciona o elemento com a classe "mario"
const pipe = document.querySelector('.pipe');   // seleciona o elemento com a classe "pipe"


// () => {} é uma função anônima (arrow function)
// deixa o código mais limpo e curto

// Função que faz o Mario "pular"
const jump = () => {
    mario.classList.add('jump'); // adiciona a classe "jump" ao Mario (ativa a animação do pulo)

    // depois de 500ms (meio segundo), remove a classe "jump"
    // isso faz o Mario voltar ao estado inicial, pronto para pular de novo
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

// "Loop" que fica rodando em intervalos de tempo
// a função setInterval() executa a cada X ms (não foi passado o tempo aqui ainda)
const loop = setInterval(() => {
    console.log('loop'); // só mostra no console que o loop está rodando


    // Posição do tubo (pipe) em relação à esquerda da tela
    // offsetLeft retorna a distância em pixels do pipe até a borda esquerda
    const pipePosition = pipe.offsetLeft;

    // Posição do Mario em relação ao "chão"
    // pega o valor do CSS (estilo computado) -> "bottom"
    // remove o "px" e converte para número
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Condição para detectar colisão
    // Se o cano estiver na frente do Mario (posição <= 120 e > 0)
    // e o Mario estiver baixo (posição < 80), significa que encostou no cano
    // Verifica a colisão entre o Mario e o cano

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        // Interrompe a animação do cano (faz ele "parar" no momento da colisão)
        pipe.style.animation = 'none';
        // Define a posição horizontal do cano no ponto da batida
        // `${pipePosition}px` transforma o número em texto com "px"
        pipe.style.left = `${pipePosition}px`;


        // Interrompe a animação do Mario (ele congela onde estava)
        mario.style.animation = 'none';
        // Define a posição vertical do Mario no exato ponto em que houve a colisão
        mario.style.bottom = `${marioPosition}px`;


        // Troca a imagem do Mario pela imagem de "game over"
        // "../" serve para voltar uma pasta na estrutura de diretórios
        mario.src = '../imagens/game-over.png';
        // Ajusta a largura do Mario para caber melhor na tela depois da colisão
        mario.style.width = '75px';
        // Empurra o Mario um pouco para a direita para alinhar a imagem de "game over"
        mario.style.marginLeft = '50px';


        // Interrompe o loop principal do jogo (parando a verificação contínua)
        clearInterval(loop);
    }

}, 10 ); //a cada 10 segundo verificar se o mário morreu

document.addEventListener('keydown', jump);
