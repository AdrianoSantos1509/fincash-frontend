document.addEventListener('DOMContentLoaded', () => {
    console.log('Binance form loaded.');

    // Botão "Próximo"
    const nextButton = document.querySelector('.btn-primary');
    if (nextButton) {
        nextButton.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Próximo button clicked!');
            alert('Clique em Próximo registrado!');
        });
    }

    // Botão "Continuar com o Google"
    const googleButton = document.querySelector('.btn-secondary');
    if (googleButton) {
        googleButton.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Continue com o Google button clicked!');
            alert('Login com o Google em desenvolvimento!');
        });
    }

    // Botão de ajuda (?)
    const helpButton = document.querySelector('.help-button');
    if (helpButton) {
        helpButton.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Help button clicked!');
            alert('Aqui você teria acesso ao suporte ou ajuda.');
        });
    }

    // ==============================
    // ANIMAÇÃO: CHUVA DE CIFRÕES ($)
    // ==============================

    const canvas = document.createElement('canvas');
    canvas.id = 'chuvaCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Cifrao {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.speed = 1 + Math.random() * 2;
            this.size = 12 + Math.random() * 10;
            this.swing = (Math.random() - 0.5) * 2; // leve oscilação
            this.angle = 0;
        }

        update() {
            this.y += this.speed;
            this.angle += 0.05;
            this.x += Math.sin(this.angle) * this.swing;

            if (this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.font = `${this.size}px Arial`;
            ctx.fillStyle = '#f0720b';
            ctx.textAlign = 'center';
            ctx.fillText('$', this.x, this.y);
        }
    }

    const numCifroes = 80;
    const cifroes = Array.from({ length: numCifroes }, () => new Cifrao());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const cifrao of cifroes) {
            cifrao.update();
            cifrao.draw();
        }

        requestAnimationFrame(animate);
    }

    animate();
});
