const registrationEmail = "miguelpenafielr@gmail.com";

const documents = [
  {
    title: "Programa del acto memorial",
    description: "Orden de la ceremonia, lecturas y momentos musicales.",
    type: "PDF",
    href: "",
  },
  {
    title: "Carta familiar",
    description: "Palabras preparadas por la familia para compartir durante el encuentro.",
    type: "DOC",
    href: "",
  },
  {
    title: "Album digital",
    description: "Seleccion de fotografias escaneadas y organizadas por epoca.",
    type: "IMG",
    href: "",
  },
];

const writings = [
  {
    title: "Artículos de investigación",
    description: "Espacio para reunir publicaciones, separatas o manuscritos académicos.",
    type: "Artículos",
    href: "",
  },
  {
    title: "Libros y material docente",
    description: "Libros, apuntes de clase, guías o textos de formación en Física.",
    type: "Libros",
    href: "",
  },
  {
    title: "Notas y conferencias",
    description: "Borradores, charlas, homenajes académicos o textos preparados para estudiantes.",
    type: "Notas",
    href: "",
  },
];

const memories = [
  {
    name: "La familia",
    relationship: "Hijos y nietos",
    message:
      "Gracias por ensenarnos que la ternura tambien vive en los actos pequenos: esperar en la puerta, preguntar si llegamos bien, guardar siempre un lugar en la mesa.",
  },
  {
    name: "Un amigo",
    relationship: "Companero de vida",
    message:
      "Lo recuerdo por su palabra serena y por esa manera de estar presente cuando alguien necesitaba ayuda, incluso antes de pedirla.",
  },
  {
    name: "Su nieta",
    relationship: "Familia",
    message:
      "Cada historia que contaba parecia abrir una ventana. Hoy seguimos mirando por esas ventanas para sentirlo cerca.",
  },
];

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const filterButtons = document.querySelectorAll(".filter-button");
const photoCards = document.querySelectorAll(".photo-card");
const documentList = document.querySelector("[data-document-list]");
const writingsList = document.querySelector("[data-writings-list]");
const memoriesGrid = document.querySelector("[data-memories-grid]");
const memoryForm = document.querySelector("[data-memory-form]");
const formNote = document.querySelector("[data-form-note]");
const eventForm = document.querySelector("[data-event-form]");
const eventFormNote = document.querySelector("[data-event-form-note]");

function updateHeader() {
  if (!header) {
    return;
  }

  header.classList.toggle("scrolled", window.scrollY > 24);
}

function closeNavigation() {
  if (!nav || !navToggle || !header) {
    return;
  }

  nav.classList.remove("open");
  header.classList.remove("nav-active");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function renderDocuments() {
  if (!documentList) {
    return;
  }

  documentList.innerHTML = documents
    .map((item) => {
      const link = item.href
        ? `<a class="document-link" href="${item.href}" target="_blank" rel="noopener">Abrir archivo</a>`
        : `<span class="document-link is-disabled">Pendiente</span>`;

      return `
        <article class="document-item">
          <span class="document-icon" aria-hidden="true">${item.type}</span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
          ${link}
        </article>
      `;
    })
    .join("");
}

function renderWritings() {
  if (!writingsList) {
    return;
  }

  writingsList.innerHTML = writings
    .map((item) => {
      const link = item.href
        ? `<a class="document-link" href="${item.href}" target="_blank" rel="noopener">Abrir</a>`
        : `<span class="document-link is-disabled">Pendiente</span>`;

      return `
        <article class="writing-card">
          <span class="writing-type">${item.type}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          ${link}
        </article>
      `;
    })
    .join("");
}

function renderMemories() {
  if (!memoriesGrid) {
    return;
  }

  memoriesGrid.innerHTML = memories
    .map(
      (memory) => `
        <article class="memory-card">
          <p>${memory.message}</p>
          <cite>${memory.name} · ${memory.relationship}</cite>
        </article>
      `
    )
    .join("");
}

function buildRegistrationEmail(formData) {
  const name = formData.get("name").toString().trim();
  const email = formData.get("email").toString().trim();
  const affiliation = formData.get("affiliation").toString().trim();
  const participation = formData.get("participation").toString().trim();
  const message = formData.get("message").toString().trim();

  const subject = `Inscripcion al coloquio 80 aniversario - ${name}`;
  const body = [
    "Hola,",
    "",
    "Quisiera registrarme o recibir informacion sobre el coloquio conmemorativo por los 80 años del Dr. V. Miguel Peñafiel N.",
    "",
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Institucion o relacion: ${affiliation}`,
    `Tipo de participacion: ${participation}`,
    "",
    "Mensaje:",
    message || "Sin mensaje adicional.",
  ].join("\n");

  return `mailto:${registrationEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    if (header) {
      header.classList.toggle("nav-active", isOpen);
    }

    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (nav) {
  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      closeNavigation();
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    photoCards.forEach((card) => {
      card.hidden = filter !== "todos" && card.dataset.category !== filter;
    });
  });
});

if (memoryForm) {
  memoryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(memoryForm);

    memories.unshift({
      name: formData.get("name").toString().trim(),
      relationship: formData.get("relationship").toString().trim(),
      message: formData.get("message").toString().trim(),
    });

    renderMemories();
    memoryForm.reset();

    if (formNote) {
      formNote.textContent = "Tu memoria se agrego en esta visita. Para conservarla, copiala a js/main.js.";
    }
  });
}

if (eventForm) {
  eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(eventForm);
    const mailto = buildRegistrationEmail(formData);

    if (eventFormNote) {
      eventFormNote.textContent = "Se abrirá tu aplicación de correo con la inscripción preparada.";
    }

    window.location.href = mailto;
  });
}

window.addEventListener("scroll", updateHeader, { passive: true });

renderDocuments();
renderWritings();
renderMemories();
updateHeader();
