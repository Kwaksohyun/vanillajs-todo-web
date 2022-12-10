const images = ["0.jpeg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const quoteId = document.getElementById("quote");
quoteId.style.backgroundImage = `url(images/${chosenImage})`;