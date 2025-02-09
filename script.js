const noBtn = document.getElementById('noBtn');
let noClickCount = 0;
const hackingContainer = document.getElementById('hackingContainer');
let hackingInterval;
const hackingSound = document.getElementById('hackingSound');
const hackedImage = document.getElementById('hackedImage');

noBtn.addEventListener('click', function() {
    noClickCount++;

    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    if (noClickCount >= 5) {
        const messageOverlay = document.createElement('div');
        messageOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            font-size: 2em;
            text-align: center;
            color: black;
        `;
        messageBox.textContent = "Я тебя понял(а)!";

        messageOverlay.appendChild(messageBox);
        document.body.appendChild(messageOverlay);

        messageOverlay.addEventListener('click', function() {
            document.body.removeChild(messageOverlay);
            noClickCount = 0;

            startHacking();
        });
    }
});

document.getElementById('yesBtn').addEventListener('click', function() {
    alert('Ура! Я рад(а)! ❤️');
});

function startHacking() {
    hackingContainer.style.opacity = '1';
    hackingContainer.innerHTML = "";

    hackingInterval = setInterval(() => {
        const line = document.createElement('span');
        line.style.position = 'absolute';
        line.style.top = Math.random() * 100 + '%';
        line.style.left = Math.random() * 100 + '%';
        line.style.whiteSpace = 'nowrap';
        line.style.fontSize = Math.random() * 1.5 + 'em';
        line.textContent = Math.random().toString(36).substring(2, 20);

        hackingContainer.appendChild(line);

        animateLine(line);

        if (hackingContainer.children.length > 50) {
            hackingContainer.removeChild(hackingContainer.firstChild);
        }

        if (hackingContainer.children.length > 40 && Math.random() < 0.1) {
            const hackedText = document.createElement('span');
            hackedText.style.position = 'absolute';
            hackedText.style.top = '50%';
            hackedText.style.left = '50%';
            hackedText.style.transform = 'translate(-50%, -50%)';
            hackedText.style.fontSize = '3em';
            hackedText.style.color = 'red';
            hackedText.textContent = "Ты взломан!";

            hackingContainer.appendChild(hackedText);

            clearInterval(hackingInterval);

            setTimeout(() => {
                hackingContainer.style.opacity = '0';
                hackingContainer.innerHTML = "";

                //Show the image and play sound
                hackedImage.style.display = 'block';
                hackingSound.play();

            }, 1000);
        }
    }, 50);
}

function animateLine(line) {
    let startTop = parseFloat(line.style.top);
    let animationDuration = Math.random() * 5 + 3;

    line.animate([
        { top: startTop + '%' },
        { top: '100%' }
    ], {
        duration: animationDuration * 1000,
        iterations: 1
    }).onfinish = () => {
        line.remove();
    };
}