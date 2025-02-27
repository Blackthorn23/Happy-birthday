document.addEventListener("DOMContentLoaded", function () {
    const presentBox = document.getElementById("present-box");
    const clickMessage = document.getElementById("click-message");
    const cakeContainer = document.querySelector(".cake-container");
    const message = document.querySelector(".message");
    const body = document.body;
    const birthdaySong = document.getElementById("birthday-song");
    const countdownDisplay = document.getElementById("countdown");
    const timerDisplay = document.getElementById("timer-display");

    let canOpen = false; // Initially locked

    const targetDate = new Date("February 28, 2025 00:00:00").getTime();

    // Update the countdown every second
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            countdownDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            clearInterval(countdownInterval); // Stop the timer
            countdownDisplay.textContent = "🎉 The present is now unlocked!";
            countdownDisplay.style.color = "green";
            canOpen = true; // Unlock the present

            setTimeout(() => {
                timerDisplay.style.opacity = "0"; // Fade out the timer
            }, 2200);
        }
    }, 1000);

    presentBox.addEventListener("click", function () {
        if (!canOpen) {
            alert("You can't open the present yet! Wait until the countdown ends.");
            return;
        }
        clickMessage.classList.add("hide"); // Hide message
        presentBox.classList.add("open"); // Animate opening

        setTimeout(() => {
            presentBox.style.opacity = "0"; // Fade out present box
            clickMessage.style.opacity = "0"; // Fade out present box
        }, 500);

        setTimeout(() => {
            presentBox.style.display = "none"; // Hide after fade-out
            cakeContainer.style.display = "block";
            cakeContainer.classList.add("show"); // Fade-in cake

            message.style.display = "block";
            message.classList.add("show"); // Fade-in message

            birthdaySong.play(); // Play birthday song

            launchFireworks(); // 🎆 Start fireworks
        }, 1200);
    });

    function launchFireworks() {
        for (let i = 0; i < 15; i++) { 
            setTimeout(() => {
                createFirework();
            }, i * 600); // Stagger fireworks
        }
    }

    function createFirework() {
        const firework = document.createElement("div");
        firework.classList.add("firework");
        body.appendChild(firework);

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5;

        firework.style.left = `${x}px`;
        firework.style.bottom = "0px";

        setTimeout(() => {
            explodeFirework(firework, x, y);
        }, 800);
    }

    function explodeFirework(firework, x, y) {
        firework.remove(); 

        for (let i = 0; i < 20; i++) { 
            const particle = document.createElement("div");
            particle.classList.add("particle");
            body.appendChild(particle);

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 150 + 50;

            const tx = Math.cos(angle) * speed;
            const ty = Math.sin(angle) * speed;

            particle.style.setProperty("--tx", `${tx}px`);
            particle.style.setProperty("--ty", `${ty}px`);

            setTimeout(() => {
                particle.remove(); 
            }, 1800);
        }
    }
});
