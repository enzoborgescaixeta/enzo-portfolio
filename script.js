let currentImages = [];
let currentIndex = 0;

const cards = document.querySelectorAll(".project-card");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".nav.prev");
const nextBtn = document.querySelector(".nav.next");
const modalCounter = document.getElementById("modal-counter");

// Slideshow automático no card
cards.forEach(card => {
  const images = card.querySelectorAll(".project-image img");
  let current = 0;

  if (images.length > 1) {
    setInterval(() => {
      images[current].classList.remove("active");
      current = (current + 1) % images.length;
      images[current].classList.add("active");
    }, 5500);
  }
});

// Função para atualizar imagem e contador
function updateModal() {
  modalImg.src = currentImages[currentIndex].src;
  modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

// Abrir modal ao clicar no card
cards.forEach(card => {
  card.addEventListener("click", () => {
    currentImages = card.querySelectorAll(".project-image img");
    currentIndex = [...currentImages].findIndex(img =>
      img.classList.contains("active")
    );

    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.description;
    modal.classList.add("active");

    updateModal();
  });
});

// Fechar modal
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Fechar clicando fora da imagem
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// Navegação setas
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateModal();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateModal();
});

// Navegação teclado
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateModal();
  }

  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateModal();
  }

  if (e.key === "Escape") {
    modal.classList.remove("active");
  }
});
