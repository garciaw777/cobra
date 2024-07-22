const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 50,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    jumpPower: 15,
    gravity: 1,
    velocityY: 0,
    isJumping: false,
};

const platforms = [
    { x: 0, y: canvas.height - 20, width: canvas.width, height: 20 },
    { x: 100, y: canvas.height - 100, width: 150, height: 20 },
    { x: 300, y: canvas.height - 200, width: 150, height: 20 },
];

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'gray';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function updatePlayer() {
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    
    if (player.y + player.height > canvas.height - 20) {
        player.y = canvas.height - 60;
        player.velocityY = 0;
        player.isJumping = false;
    }
    
    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + player.velocityY) {
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.isJumping = false;
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawPlatforms();
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        if (!player.isJumping) {
            player.velocityY = -player.jumpPower;
            player.isJumping = true;
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        player.x += player.speed;
    } else if (event.key === 'ArrowLeft') {
        player.x -= player.speed;
    }
});

gameLoop();
