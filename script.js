const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const player = {
    x: 100,
    y: 500,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5,
    dy: 0,
    gravity: 1,
    jumping: false,
    update: function() {
        if (keys.right.pressed) {
            this.x += this.speed;
        }
        if (keys.left.pressed) {
            this.x -= this.speed;
        }

        this.dy += this.gravity;
        this.y += this.dy;

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.dy = 0;
            this.jumping = false;
        }

        platforms.forEach(platform => {
            if (this.x < platform.x + platform.width &&
                this.x + this.width > platform.x &&
                this.y < platform.y + platform.height &&
                this.y + this.height > platform.y) {
                this.y = platform.y - this.height;
                this.dy = 0;
                this.jumping = false;
            }
        });
    },
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

const platforms = [
    { x: 0, y: 560, width: 800, height: 40, color: 'green' },
    { x: 300, y: 400, width: 200, height: 20, color: 'green' },
    { x: 500, y: 300, width: 200, height: 20, color: 'green' }
];

const keys = {
    right: { pressed: false },
    left: { pressed: false }
};

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            keys.right.pressed = true;
            break;
        case 'ArrowLeft':
            keys.left.pressed = true;
            break;
        case ' ':
            if (!player.jumping) {
                player.dy = -15;
                player.jumping = true;
            }
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            keys.right.pressed = false;
            break;
        case 'ArrowLeft':
            keys.left.pressed = false;
            break;
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update();
    player.draw();

    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();
