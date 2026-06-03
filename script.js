const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const favoritesEl = document.getElementById("favorites");

let currentQuote = {};

// ===== Fetch Quote from API =====
async function generateQuote() {
    try {
        quoteEl.innerText = "Loading...";
        authorEl.innerText = "";

        const response = await fetch("https://api.quotable.io/random");

        // If API fails (non-200 response)
        if (!response.ok) throw new Error("API error");

        const data = await response.json();

        currentQuote = {
            text: data.content,
            author: data.author
        };

        quoteEl.innerText = currentQuote.text;
        authorEl.innerText = "- " + currentQuote.author;

    } catch (error) {
        console.log("API failed, using backup quotes:", error);

        // 🔥 Fallback quotes (offline mode)
        const backupQuotes = [
            { text: "Keep going. Everything you need will come to you.", author: "Unknown" },
            { text: "Success is built on consistency.", author: "Unknown" },
            { text: "Don’t quit. Great things take time.", author: "Unknown" },
            { text: "Your only limit is your mindset.", author: "Unknown" },
            { text: "Work hard in silence, let success speak.", author: "Unknown" }
        ];

        const random = backupQuotes[Math.floor(Math.random() * backupQuotes.length)];

        currentQuote = random;

        quoteEl.innerText = random.text;
        authorEl.innerText = "- " + random.author;
    }
}

// ===== WhatsApp Share =====
function shareWhatsApp() {
    const text = `${currentQuote.text} - ${currentQuote.author}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

// ===== Save Favorites (localStorage) =====
function saveFavorite() {
    if (!currentQuote.text) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.push(currentQuote);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayFavorites();
}

// ===== Load Favorites =====
function displayFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesEl.innerHTML = "";

    favorites.forEach((q) => {
        let li = document.createElement("li");
        li.innerText = `${q.text} - ${q.author}`;
        favoritesEl.appendChild(li);
    });
}

// ===== Dark Mode Toggle =====
function toggleTheme() {
    document.body.classList.toggle("dark");
}

// ===== Auto Load =====
window.onload = () => {
    generateQuote();
    displayFavorites();
};