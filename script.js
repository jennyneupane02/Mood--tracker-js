let selectedMood = null;

document.addEventListener("DOMContentLoaded", () => {
    loadMoods();
});

document.querySelectorAll(".emoji").forEach(emoji => {
    emoji.addEventListener("click", () => {
        document.querySelectorAll(".emoji").forEach(e => e.classList.remove("selected"));
        emoji.classList.add("selected");
        selectedMood = emoji.dataset.mood;
    });
});

document.querySelector("#saveMood").addEventListener("click", () => {
    const text = document.querySelector("#moodText").value.trim();

    if (!text || !selectedMood) {
        alert("Please enter a mood and select an emoji.");
        return;
    }

    const moodEntry = {
        text,
        type: selectedMood,
        emoji: document.querySelector(".selected").textContent,
        date: new Date().toLocaleString()
    };

    const moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods.push(moodEntry);

    localStorage.setItem("moods", JSON.stringify(moods));

    document.querySelector("#moodText").value = "";
    selectedMood = null;
    document.querySelectorAll(".emoji").forEach(e => e.classList.remove("selected"));

    loadMoods();
});

function loadMoods(filter = "all") {
    const list = document.querySelector("#moodList");
    list.innerHTML = "";

    const moods = JSON.parse(localStorage.getItem("moods")) || [];

    const filtered = moods.filter(m => filter === "all" || m.type === filter);

    filtered.forEach(m => {
        const li = document.createElement("li");
        li.classList.add("mood-item", m.type);
        li.innerHTML = `
      <span>${m.emoji} ${m.text}</span>
      <small>${m.date}</small>
    `;
        list.appendChild(li);
    });
}

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        loadMoods(btn.dataset.filter);
    });
});

document.querySelector("#clearMoods").addEventListener("click", () => {
    localStorage.removeItem("moods");
    loadMoods();
});
