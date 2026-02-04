/* =====================
   CURSEUR PERSONNALISÉ
===================== */
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

/* =====================
   ANIMATION AU SCROLL
===================== */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            const bars = entry.target.querySelectorAll(".progress");
            bars.forEach(bar => {
                bar.style.width = bar.dataset.level + "%";
            });
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

/* =====================
   FOND RÉSEAU CYBER
===================== */
const network = document.getElementById("network");
const nctx = network.getContext("2d");

network.width = window.innerWidth;
network.height = window.innerHeight;

let points = [];

for (let i = 0; i < 80; i++) {
    points.push({
        x: Math.random() * network.width,
        y: Math.random() * network.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function drawNetwork() {
    nctx.clearRect(0, 0, network.width, network.height);

    points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > network.width) p.vx *= -1;
        if (p.y < 0 || p.y > network.height) p.vy *= -1;

        nctx.fillStyle = "#8f00ff";
        nctx.fillRect(p.x, p.y, 2, 2);

        points.forEach(p2 => {
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 120) {
                nctx.strokeStyle = "rgba(143,0,255,0.1)";
                nctx.beginPath();
                nctx.moveTo(p.x, p.y);
                nctx.lineTo(p2.x, p2.y);
                nctx.stroke();
            }
        });
    });

    requestAnimationFrame(drawNetwork);
}

drawNetwork();

/* =====================
   EFFET MATRIX
===================== */
const matrix = document.getElementById("matrix");
const mctx = matrix.getContext("2d");

matrix.width = window.innerWidth;
matrix.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = Math.floor(matrix.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    mctx.fillStyle = "rgba(0,0,0,0.05)";
    mctx.fillRect(0, 0, matrix.width, matrix.height);

    mctx.fillStyle = "#00eaff";
    mctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        mctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrix.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}


setInterval(drawMatrix, 50);
/* =====================
   MUSIQUE D'AMBIANCE
===================== */
// Création de l'audio avec une musique d'ambiance cyberpunk
const audio = new Audio('./ambient.mp3'); // Ambient cyberpunk music
audio.loop = true;
audio.volume = 0.3;

document.addEventListener('click', () => {
    if (!isPlaying) return;
    audio.play().catch(() => {});
}, { once: true });

const musicBtn = document.getElementById('musicBtn');
const iconOn = document.querySelector('.icon-sound-on');
const iconOff = document.querySelector('.icon-sound-off');
let isPlaying = true;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        iconOn.style.display = 'block';
        iconOff.style.display = 'none';
    } else {
        audio.play().catch(() => {});
        iconOn.style.display = 'none';
        iconOff.style.display = 'block';
    }
    isPlaying = !isPlaying;
});


