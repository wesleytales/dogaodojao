// START OF FILE script.js

const exibicaoContainer = document.querySelector('.exibicao-container');
const listaExibicoes = document.querySelector('.lista-exibicoes');
let itensExibicao = document.querySelectorAll('.item-exibicao'); // Use let as it will be updated
const numItensOriginal = itensExibicao.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let itemWidth;
let realIndex = 1; // Start at the first *actual* item (index 1 after prepending clone)
let isTransitioning = false; // Flag to prevent rapid clicks during transition

// --- Cloning Function (for infinite scroll) ---
function setupInfiniteScroll() {
    if (numItensOriginal <= 1) return; // No need for infinite scroll with 0 or 1 item
    console.log("Clonando itens...");
    // Clone last item and prepend
    const lastClone = itensExibicao[numItensOriginal - 1].cloneNode(true);
    lastClone.classList.add('clone'); // Optional: Add class for debugging/styling clones
    listaExibicoes.insertBefore(lastClone, itensExibicao[0]);

    // Clone first item and append
    const firstClone = itensExibicao[0].cloneNode(true);
    firstClone.classList.add('clone'); // Optional: Add class for debugging/styling clones
    listaExibicoes.appendChild(firstClone);

    // Update node list to include clones
    itensExibicao = document.querySelectorAll('.item-exibicao');
     console.log("Itens após clonagem:", itensExibicao.length);
}

// --- Update Item Width (respects mobile/desktop) ---
function updateItemWidth() {
    const firstActualItem = itensExibicao[1]; // Measure the first *actual* item

    if (window.innerWidth < 768) {
        itemWidth = exibicaoContainer.offsetWidth;
        itensExibicao.forEach(item => {
             item.style.flexBasis = `${itemWidth}px`;
             item.style.width = '';
        });

    } else {
        itemWidth = firstActualItem ? firstActualItem.offsetWidth : 300;
         itensExibicao.forEach(item => {
             item.style.flexBasis = '';
        });
    }

    if (!itemWidth || itemWidth <= 0) {
       console.warn("Could not determine itemWidth, using fallback.");
       itemWidth = window.innerWidth < 768 ? exibicaoContainer.offsetWidth : 300;
    }
     console.log(`[updateItemWidth] Width: ${itemWidth}, Mobile: ${window.innerWidth < 768}`);
}

// --- Update Display Position (respects mobile/desktop centering) ---
function updateExibicao(enableTransition = true) {
    console.log(`[updateExibicao] realIndex: ${realIndex}, transition: ${enableTransition}`); // Log inicial

    listaExibicoes.style.transition = enableTransition ? 'transform 0.5s ease-out' : 'none';

    let translateXValue = 0;
    const containerWidth = exibicaoContainer.offsetWidth;

    if (window.innerWidth < 768) {
        translateXValue = -realIndex * itemWidth;
         console.log(` -> Mobile TranslateX: ${translateXValue}`);
    } else {
        // Desktop: Centralize the item at realIndex
        const centerOffset = (containerWidth - itemWidth) / 2;
        translateXValue = -(realIndex * itemWidth) + centerOffset;
        console.log(` -> Desktop Offset: ${centerOffset}, TranslateX: ${translateXValue}`);
    }

     if (isNaN(translateXValue)) {
        console.error("ERRO: translateXValue é NaN!", { realIndex, itemWidth, containerWidth });
        return; // Impede a aplicação de um valor inválido
    }


    listaExibicoes.style.transform = `translateX(${translateXValue}px)`;

    // Update the 'central' class for visual scaling
    itensExibicao.forEach((item, index) => {
        item.classList.remove('central');
        if (index === realIndex) {
            item.classList.add('central');
        }
    });
    console.log(` -> Aplicou classe central no índice: ${realIndex}`);
}

// --- Navigation Functions ---
function nextExibicao() {
    if (isTransitioning) {
        console.log("Bloqueado: Transição em progresso (Next)");
        return;
    }
    console.log("[nextExibicao] Iniciando...");
    isTransitioning = true;

    realIndex++;
    updateExibicao(true); // Update display with transition
}

function prevExibicao() {
     if (isTransitioning) {
        console.log("Bloqueado: Transição em progresso (Prev)");
        return;
     }
     console.log("[prevExibicao] Iniciando...");
    isTransitioning = true;

    realIndex--;
    updateExibicao(true); // Update display with transition
}

// --- Transition End Listener (for infinite loop jump) ---
listaExibicoes.addEventListener('transitionend', () => {
    console.log(`[transitionend] Transição finalizada. realIndex ATUAL: ${realIndex}`);

    // Check if we landed on a clone and need to jump instantly
    let jumped = false;
    if (realIndex <= 0) { // Se está mostrando o clone prepended (índice 0)
        console.log(" -> Detectado clone inicial (índice 0). Pulando para o último item real...");
        realIndex = numItensOriginal; // Define o índice para o *último* item real
        updateExibicao(false); // Pula instantaneamente SEM transição
        jumped = true;
        console.log(` -> Salto realizado. Novo realIndex: ${realIndex}`);
    } else if (realIndex >= numItensOriginal + 1) { // Se está mostrando o clone appended (índice N+1)
        console.log(" -> Detectado clone final (índice N+1). Pulando para o primeiro item real...");
        realIndex = 1; // Define o índice para o *primeiro* item real
        updateExibicao(false); // Pula instantaneamente SEM transição
        jumped = true;
         console.log(` -> Salto realizado. Novo realIndex: ${realIndex}`);
    }

    // Somente libera a transição se ela realmente terminou (e não logo após um salto)
    // Isso ajuda a evitar problemas se o 'transitionend' disparar inesperadamente.
     isTransitioning = false;
     console.log("[transitionend] Transição liberada.");

});

// --- Event Listeners ---
nextBtn.addEventListener('click', nextExibicao);
prevBtn.addEventListener('click', prevExibicao);

// Adjust on window resize
window.addEventListener('resize', () => {
    console.log("[resize] Redimensionando janela...");
    isTransitioning = true; // Previne transições durante o ajuste
    listaExibicoes.style.transition = 'none'; // Desabilita temporariamente

    updateItemWidth(); // Recalcula largura
    updateExibicao(false); // Atualiza posição instantaneamente

    // Pequeno delay para garantir que o layout foi recalculado antes de reabilitar
    setTimeout(() => {
        listaExibicoes.style.transition = 'transform 0.5s ease-out';
        isTransitioning = false; // Libera transições
        console.log("[resize] Ajuste finalizado, transições reabilitadas.");
    }, 50);
});

// --- Initialization ---
console.log("Iniciando script...");
setupInfiniteScroll(); // 1. Add clones to the DOM
updateItemWidth();     // 2. Calculate initial item width
updateExibicao(false); // 3. Set the initial position (showing first actual item) *without* transition
console.log("Inicialização completa.");
