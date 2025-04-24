document.addEventListener('DOMContentLoaded', function() {
    const fabContainer = document.querySelector('.fab-container');
    const fabMainButton = document.getElementById('fabMainButton');

    if (fabMainButton && fabContainer) {
        fabMainButton.addEventListener('click', function(event) {
            // Previne a ação padrão do link (navegar para '#')
            event.preventDefault();

            // Adiciona ou remove a classe 'active' do container
            fabContainer.classList.toggle('active');
        });

        // Opcional: Fechar o FAB se clicar fora dele
        document.addEventListener('click', function(event) {
            // Verifica se o clique foi fora do fabContainer E se o container está ativo
            if (!fabContainer.contains(event.target) && fabContainer.classList.contains('active')) {
                fabContainer.classList.remove('active');
            }
        });

         // Opcional: Fechar o FAB se clicar em um botão de opção
         const optionButtons = fabContainer.querySelectorAll('.fab-option');
         optionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Não previne o default aqui, pois queremos que o link funcione
                // Apenas fecha o menu
                fabContainer.classList.remove('active');
            });
         });

    } else {
        console.error("Elemento FAB principal ou container não encontrado!");
    }
});