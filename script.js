
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".navbar nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const filters = document.querySelectorAll(".filter");
const newsCards = document.querySelectorAll(".news-card");
const noResults = document.getElementById("noResults");

let activeCategory = "all";

function filterNews() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  newsCards.forEach(card => {
    const category = card.dataset.category;
    const text = card.innerText.toLowerCase();

    const matchesSearch = text.includes(query);
    const matchesCategory =
      activeCategory === "all" || category === activeCategory;

    const show = matchesSearch && matchesCategory;

    card.hidden = !show;

    if (show) visibleCount++;
  });

  noResults.hidden = visibleCount > 0;
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter;

    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    filterNews();
  });
});

searchBtn.addEventListener("click", filterNews);

searchInput.addEventListener("input", filterNews);

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    filterNews();
  }
});

// Sahifadagi elementlar yumshoq ko'rinishda paydo bo'ladi.
const cards = document.querySelectorAll(".news-card, .league-item");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.classList.add("reveal");
    observer.observe(card);
  });
}
