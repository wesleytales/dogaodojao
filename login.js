const form = document.getElementById('login-form');
        const emailInput = document.getElementById('email');
        const senhaInput = document.getElementById('senha');
        const emailError = document.getElementById('email-error');
        const senhaError = document.getElementById('senha-error');
        const body = document.querySelector('body');
        const container = document.querySelector('.container');
        const headers = document.querySelectorAll('h1');
        const labels = document.querySelectorAll('label');
        const textGrayElements = document.querySelectorAll('.text-gray-700');
        const passwordToggleIcon = document.getElementById('toggle-senha');


        function validarEmail() {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = "Por favor, insira um email válido.";
                emailError.classList.add('show');
                return false;
            }
            emailError.classList.remove('show');
            return true;
        }

        function validarSenha() {
            if (senhaInput.value.trim().length < 8) {
                senhaError.textContent = "Por favor, insira uma senha com pelo menos 8 caracteres.";
                senhaError.classList.add('show');
                return false;
            }
            senhaError.classList.remove('show');
            return true;
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let formValido = true;

            if (!validarEmail()) formValido = false;
            if (!validarSenha()) formValido = false;

            if (formValido) {
                alert('Login realizado com sucesso!');
                form.reset();
            }
        });

        emailInput.addEventListener('blur', validarEmail);
        senhaInput.addEventListener('blur', validarSenha);

        let senhaVisivel = false;
        passwordToggleIcon.addEventListener('click', () => {
            senhaVisivel = !senhaVisivel;
            senhaInput.type = senhaVisivel ? 'text' : 'password';
            passwordToggleIcon.textContent = senhaVisivel ? 'visibility_off' : 'visibility';
        });

        function toggleDarkMode() {
            body.classList.toggle('dark-mode');
            container.classList.toggle('dark-mode');
            headers.forEach(header => header.classList.toggle('dark-mode'));
            labels.forEach(label => label.classList.toggle('dark-mode'));
            textGrayElements.forEach(textGray => textGray.classList.toggle('dark-mode'));
            const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
            inputs.forEach(input => input.classList.toggle('dark-mode'));
            passwordToggleIcon.classList.toggle('dark-mode-password-toggle-icon');
        }

        const darkModeButton = document.createElement('button');
        darkModeButton.textContent = 'Alternar Modo Escuro';
        darkModeButton.classList.add('btn-secondary');
        darkModeButton.addEventListener('click', toggleDarkMode);
        form.parentNode.insertBefore(darkModeButton, form.nextSibling);