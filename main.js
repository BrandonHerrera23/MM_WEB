/* ═══════════════════════════════════════════════════════════
   main.js · Mónica Magaña – Diputada Local
   - Navbar scroll effect
   - Hamburger menú
   - Carrusel de logros
   - Reveal on scroll
   - Crucigrama interactivo
   - Ruleta de propuestas
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR: efecto al hacer scroll ──────────────────── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── HAMBURGER MENU ──────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.navbar-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  /* ─── CARRUSEL ────────────────────────────────────────── */
  const track    = document.getElementById('carouselTrack');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn) {
    const cards       = Array.from(track.querySelectorAll('.card'));
    let currentIndex  = 0;
    let visibleCount  = getVisibleCount();
    const totalSlides = Math.max(0, cards.length - visibleCount + 1);

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    function getVisibleCount() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1100) return 2;
      return 3;
    }

    function getCardWidth() {
      if (cards.length === 0) return 0;
      return cards[0].offsetWidth + 24;
    }

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= totalSlides - 1;
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }

    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
      updateCarousel();
    }

    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 40) goTo(currentIndex + (diff > 0 ? 1 : -1));
    }, { passive: true });

    let autoPlay = setInterval(() => goTo(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0), 5000);
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => goTo(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0), 5000);
    });

    window.addEventListener('resize', () => { visibleCount = getVisibleCount(); buildDots(); goTo(0); });
    buildDots();
    updateCarousel();
  }

  /* ─── REVEAL ON SCROLL ────────────────────────────────── */
  const revealElements = document.querySelectorAll(
    '.about-image-wrap, .about-text, .world-item, .wa-text, .wa-qr-wrap, .footer-col, .logros-header, .world-header'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  // Stagger dentro de cada contenedor padre
  const seenParents = new Set();
  revealElements.forEach(el => {
    const parent = el.parentElement;
    if (!seenParents.has(parent)) {
      seenParents.add(parent);
      Array.from(parent.querySelectorAll(':scope > .reveal')).forEach((sib, i) => {
        sib.style.transitionDelay = `${i * 70}ms`;
      });
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  revealElements.forEach(el => observer.observe(el));

  /* ─── NAVBAR: SECCIÓN ACTIVA ──────────────────────────── */
  const sections      = document.querySelectorAll('section[id]');
  const navLinksAll   = document.querySelectorAll('.navbar-links a[href^="#"]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        navLinksAll.forEach(link =>
          link.classList.toggle('nav-active', link.getAttribute('href') === id)
        );
      }
    });
  }, { threshold: 0.25, rootMargin: '-100px 0px -45% 0px' });
  sections.forEach(s => sectionObserver.observe(s));

  /* ─── COPYRIGHT AÑO DINÁMICO ─────────────────────────── */
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── SMOOTH SCROLL ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 128; /* navbar ~80 + franja anuncio 48 */
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});

/* ═══════════════════════════════════════════════════════════
   FORMULARIO DE CONTACTO → GOOGLE SHEETS
═══════════════════════════════════════════════════════════ */

(function initFormContacto() {

  const form   = document.getElementById('form-contacto');
  const estado = document.getElementById('form-estado');
  if (!form || !estado) return;

  const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbyGamY4jYZXCrtCh3UJ1P5wgX_s8wOh2GUiUuOINpgSIO66oyuVBl-0-PMhYBWwvilG/exec";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot anti-spam
    if (form.website.value) return;

    const btn = form.querySelector('.form-submit-btn');

    const datos = {
      nombre:      form.nombre.value.trim(),
      telefono:    form.telefono.value.trim(),
      colonia:     form.colonia.value.trim(),
      tema:        form.tema.value,
      mensaje:     form.mensaje.value.trim(),
      acepta_info: form.acepta_info.checked ? 'Sí' : 'No'
    };

    btn.disabled = true;
    estado.className = 'loading';
    estado.textContent = 'Enviando…';

    try {
      await fetch(URL_SCRIPT, {
        method: 'POST',
        mode:   'no-cors',
        body:   JSON.stringify(datos)
      });
      estado.className = 'success';
      estado.textContent = '¡Gracias! Recibimos tu mensaje, te daremos seguimiento pronto.';
      form.reset();
    } catch {
      estado.className = 'error';
      estado.textContent = 'Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.';
    } finally {
      btn.disabled = false;
    }
  });

})();

/* ═══════════════════════════════════════════════════════════
   CRUCIGRAMA INTERACTIVO
═══════════════════════════════════════════════════════════ */

(function initCrucigrama() {

  const container = document.getElementById('crosswordGrid');
  if (!container) return;

  const WORDS = [
    { word: "DIABETES",   dir: "H", row: 0, col: 0, num: 1,  clue: "Condición de salud con la que vive Mónica y que la hizo comprometerse con el sector salud" },
    { word: "ITESO",      dir: "V", row: 0, col: 3, num: 2,  clue: "Universidad en la que estudió Derecho" },
    { word: "RENAL",      dir: "H", row: 2, col: 1, num: 3,  clue: "Órgano cuya protección impulsa su última iniciativa de ley (prevención del daño _____)" },
    { word: "ZAPOPANA",   dir: "H", row: 4, col: 0, num: 4,  clue: "Gentilicio que la describe: orgullosamente _____" },
    { word: "DIEZ",       dir: "V", row: 2, col: 8, num: 5,  clue: "Número del distrito que la eligió diputada más votada de Jalisco" },
    { word: "DERECHO",    dir: "V", row: 0, col: 6, num: 6,  clue: "Licenciatura que estudió en el ITESO" },
    { word: "NNA",        dir: "H", row: 6, col: 3, num: 7,  clue: "Siglas de la población que protege su principal iniciativa: niñas, niños y adolescentes" },
    { word: "JALISCO",    dir: "V", row: 3, col: 1, num: 8,  clue: "Estado que representa en el Congreso Local" },
    { word: "GEORGE",     dir: "H", row: 8, col: 0, num: 9,  clue: "Universidad _____ Washington, donde cursó su maestría" },
    { word: "WASHINGTON", dir: "H", row: 8, col: 7, num: 10, clue: "Ciudad que da nombre a la universidad de su posgrado" },
  ];

  let maxR = 0, maxC = 0;
  WORDS.forEach(w => {
    if (w.dir === "H") { maxR = Math.max(maxR, w.row); maxC = Math.max(maxC, w.col + w.word.length - 1); }
    else               { maxR = Math.max(maxR, w.row + w.word.length - 1); maxC = Math.max(maxC, w.col); }
  });
  const ROWS = maxR + 1, COLS = maxC + 1;

  const logicGrid = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ letter: '', nums: [], wordRefs: [] }))
  );
  WORDS.forEach((w, wi) => {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === "H" ? w.row : w.row + i;
      const c = w.dir === "H" ? w.col + i : w.col;
      logicGrid[r][c].letter = w.word[i];
      logicGrid[r][c].wordRefs.push({ wi, pos: i });
      if (i === 0) logicGrid[r][c].nums.push(w.num);
    }
  });

  let userGrid   = Array.from({ length: ROWS }, () => Array(COLS).fill(''));
  let activeWord = null;

  function render() { renderGrid(); renderClues(); setupKeyboard(); }

  function renderGrid() {
    container.innerHTML = '';
    container.style.cssText = `display:inline-grid;grid-template-columns:repeat(${COLS},40px);grid-template-rows:repeat(${ROWS},40px);gap:2px;background:#1A1A1A;padding:2px;border-radius:8px;overflow:hidden;`;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = document.createElement('div');
        cell.style.cssText = 'width:40px;height:40px;position:relative;display:flex;align-items:center;justify-content:center;';

        if (!logicGrid[r][c].letter) {
          cell.style.background = '#1A1A1A';
        } else {
          let bg = '#fff';
          if (activeWord !== null) {
            const aw = WORDS[activeWord];
            for (let i = 0; i < aw.word.length; i++) {
              const wr = aw.dir === "H" ? aw.row : aw.row + i;
              const wc = aw.dir === "H" ? aw.col + i : aw.col;
              if (wr === r && wc === c) { bg = 'rgba(255,102,0,0.15)'; break; }
            }
          }
          cell.style.cssText += `background:${bg};border:1px solid #ddd;border-radius:4px;cursor:pointer;`;

          if (logicGrid[r][c].nums.length) {
            const nm = document.createElement('span');
            nm.textContent = logicGrid[r][c].nums.join(',');
            nm.style.cssText = 'position:absolute;top:2px;left:2px;font-size:9px;font-weight:700;color:#888;line-height:1;pointer-events:none;';
            cell.appendChild(nm);
          }

          const inp = document.createElement('input');
          inp.maxLength = 1;
          inp.value     = userGrid[r][c] || '';
          inp.dataset.r = r;
          inp.dataset.c = c;
          inp.setAttribute('readonly', '');
          inp.style.cssText = 'width:100%;height:100%;border:none;background:transparent;text-align:center;font-weight:700;font-size:15px;text-transform:uppercase;color:#1A1A1A;outline:none;cursor:pointer;font-family:Arial,sans-serif;';
          cell.appendChild(inp);
          cell.addEventListener('click', () => focusWord(r, c));
        }
        container.appendChild(cell);
      }
    }
  }

  function renderClues() {
    const hList = document.getElementById('horizontalClues');
    const vList = document.getElementById('verticalClues');
    if (!hList || !vList) return;
    hList.innerHTML = '';
    vList.innerHTML = '';

    WORDS.forEach((w, wi) => {
      const li = document.createElement('li');
      const isActive = activeWord === wi;
      li.style.cssText = `font-size:0.88rem;color:rgba(255,255,255,0.7);line-height:1.5;padding:0.5rem 0.75rem;background:${isActive ? 'rgba(255,102,0,0.18)' : 'rgba(255,102,0,0.05)'};border-left:3px solid ${isActive ? '#FF6600' : 'rgba(255,102,0,0.4)'};border-radius:4px;margin-bottom:6px;cursor:pointer;transition:background 0.2s;`;
      li.innerHTML = `<strong style="color:#FF8C3A;margin-right:6px;">${w.num}.</strong>${w.clue}`;
      li.addEventListener('click', () => { activeWord = wi; render(); });
      (w.dir === "H" ? hList : vList).appendChild(li);
    });
  }

  function focusWord(r, c) {
    const refs = logicGrid[r][c].wordRefs;
    if (!refs.length) return;
    if (refs.length === 1) {
      activeWord = refs[0].wi;
    } else {
      const cur = refs.findIndex(ref => ref.wi === activeWord);
      activeWord = refs[(cur + 1) % refs.length].wi;
    }
    render();
    const aw = WORDS[activeWord];
    for (let i = 0; i < aw.word.length; i++) {
      const rr = aw.dir === "H" ? aw.row : aw.row + i;
      const cc = aw.dir === "H" ? aw.col + i : aw.col;
      if (!userGrid[rr][cc]) { moveFocus(rr, cc); return; }
    }
    moveFocus(aw.row, aw.col);
  }

  function moveFocus(r, c) {
    document.querySelectorAll('#crosswordGrid input').forEach(inp => {
      if (parseInt(inp.dataset.r) === r && parseInt(inp.dataset.c) === c) inp.focus();
    });
  }

  function setupKeyboard() {
    document.querySelectorAll('#crosswordGrid input').forEach(inp => {
      inp.addEventListener('keydown', e => {
        const r = parseInt(inp.dataset.r), c = parseInt(inp.dataset.c);

        if (e.key === 'Backspace') {
          e.preventDefault();
          if (userGrid[r][c]) {
            userGrid[r][c] = ''; render(); moveFocus(r, c);
          } else if (activeWord !== null) {
            const aw = WORDS[activeWord];
            let idx = -1;
            for (let i = 0; i < aw.word.length; i++) {
              if ((aw.dir==="H"?aw.row:aw.row+i)===r && (aw.dir==="H"?aw.col+i:aw.col)===c) { idx=i; break; }
            }
            if (idx > 0) {
              const pr = aw.dir==="H" ? aw.row : aw.row+idx-1;
              const pc = aw.dir==="H" ? aw.col+idx-1 : aw.col;
              userGrid[pr][pc] = ''; render(); moveFocus(pr, pc);
            }
          }
          return;
        }

        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/.test(e.key)) {
          e.preventDefault();
          const letter = e.key.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          userGrid[r][c] = letter;
          if (activeWord !== null) {
            const aw = WORDS[activeWord];
            let idx = -1;
            for (let i = 0; i < aw.word.length; i++) {
              if ((aw.dir==="H"?aw.row:aw.row+i)===r && (aw.dir==="H"?aw.col+i:aw.col)===c) { idx=i; break; }
            }
            if (idx >= 0 && idx < aw.word.length - 1) {
              const nr = aw.dir==="H" ? aw.row : aw.row+idx+1;
              const nc = aw.dir==="H" ? aw.col+idx+1 : aw.col;
              render(); moveFocus(nr, nc);
            } else render();
          } else render();
        }
      });
    });
  }

  const verifyBtn = document.getElementById('verifyCrossword');
  const resetBtn  = document.getElementById('resetCrossword');
  const feedback  = document.getElementById('crosswordFeedback');
  const reward    = document.getElementById('crosswordReward');

  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      let correct = 0, total = 0, allFilled = true;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (logicGrid[r][c].letter) {
            total++;
            if (!userGrid[r][c]) allFilled = false;
            if (userGrid[r][c] === logicGrid[r][c].letter) correct++;
          }
        }
      }
      feedback.classList.add('show');
      if (!allFilled) {
        feedback.textContent = 'Faltan casillas por completar. ¡Sigue intentando!';
        feedback.className   = 'crossword-feedback show warning';
      } else if (correct === total) {
        feedback.textContent = '¡Perfecto! Resolviste el crucigrama completo. 🎉';
        feedback.className   = 'crossword-feedback show success';
        if (reward) reward.style.display = 'block';
      } else {
        feedback.textContent = `${correct} de ${total} letras correctas. ¡Casi!`;
        feedback.className   = 'crossword-feedback show error';
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      userGrid   = Array.from({ length: ROWS }, () => Array(COLS).fill(''));
      activeWord = null;
      if (feedback) { feedback.textContent = ''; feedback.className = 'crossword-feedback'; }
      if (reward)   reward.style.display = 'none';
      render();
    });
  }

  render();

})();

/* ═══════════════════════════════════════════════════════════
   RULETA DE PROPUESTAS
═══════════════════════════════════════════════════════════ */

(function initRuleta() {

  const canvas         = document.getElementById('wheelCanvas');
  const spinBtn        = document.getElementById('spinBtn');
  const spinBtnText    = document.getElementById('spinBtnText');
  const titleEl        = document.getElementById('proposalTitle');
  const descEl         = document.getElementById('proposalDesc');
  const videoContainer = document.getElementById('proposalVideoContainer');
  const resultContent  = document.getElementById('resultContent');
  const placeholder    = document.getElementById('resultPlaceholder');
  const pointer        = document.querySelector('.wheel-pointer');
  const spinAgainBtn   = document.getElementById('spinAgainBtn');

  if (!canvas || !spinBtn) return;

  const ctx = canvas.getContext('2d');

  // HiDPI support
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const SIZE = 440;
  canvas.width  = SIZE * dpr;
  canvas.height = SIZE * dpr;
  canvas.style.width  = SIZE + 'px';
  canvas.style.height = SIZE + 'px';
  ctx.scale(dpr, dpr);

  const CX = SIZE / 2, CY = SIZE / 2;
  const R  = CX - 14;

  const PROPOSALS = [
    { label: "Transporte Zapopan",       desc: "Las niñas y niños ya no pagan transporte público.",                              video: "https://www.youtube.com/embed/-98bGv6wQgY" },
    { label: "La nueva ley de Autismo",  desc: "Jalisco fue el primer estado con una ley de atención integral al autismo.",     video: "https://www.youtube.com/embed/C9LFxFnmpwU" },
    { label: "Donde todo empezó",        desc: "El progreso que hemos logrado juntas y juntos en Zapopan.",                     video: "https://www.youtube.com/embed/WCrZztZAo5A" },
    { label: "Red de Hospitales",        desc: "Nuevos hospitales y escuelas para Zapopan y Jalisco.",                          video: "https://www.youtube.com/embed/7b5NyVQacnE" },
    { label: "Ella es Mónica Magaña",    desc: "Quién soy y por qué trabajo por Zapopan desde 2013.",                          video: "https://www.youtube.com/embed/0NwC3YDv1ak" },
    { label: "Mensaje para las mujeres", desc: "Mi compromiso con la autonomía, la salud y la seguridad de las mujeres.",       video: "https://www.youtube.com/embed/rgzFbUOv6j0" },
    { label: "Por Zapopan, no paramos",  desc: "Seguimos construyendo una ciudad mejor para todas y todos.",                    video: "https://www.youtube.com/embed/cv1D8q6951s" },
    { label: "1000 Actos de Amor",       desc: "Iniciativa de salud mental: atención psicológica en centros del distrito.",     video: "https://www.youtube.com/embed/f18CqN4-RCw" },
  ];

  const N   = PROPOSALS.length;
  const ARC = (2 * Math.PI) / N;

  // Anti-repetición: evita mostrar el mismo segmento más de una vez seguida
  const shownRecently = [];
  const MAX_RECENT = Math.floor(N / 2); // no más del 50% repetido

  function pickTargetSector() {
    const available = [];
    for (let i = 0; i < N; i++) {
      if (!shownRecently.includes(i)) available.push(i);
    }
    const pool = available.length > 0 ? available : Array.from({length: N}, (_, i) => i);
    const target = pool[Math.floor(Math.random() * pool.length)];
    shownRecently.push(target);
    if (shownRecently.length > MAX_RECENT) shownRecently.shift();
    return target;
  }

  function computeSpinAngle(target) {
    // Calcular el ángulo total para que la ruleta termine exactamente en el sector target
    const ε = ARC * 0.15 + Math.random() * ARC * 0.7; // posición aleatoria dentro del sector
    const targetNormalized = target * ARC + ε;
    const pointerAngle = -Math.PI / 2;
    const targetFinalAngle = pointerAngle - targetNormalized;
    const extraSpins = (6 + Math.floor(Math.random() * 4)) * 2 * Math.PI;
    let totalAngle = ((targetFinalAngle - angle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    totalAngle += extraSpins;
    return totalAngle;
  }

  let angle    = 0;
  let spinning = false;

  // Paleta alterna para sectores — 4 tonos naranja
  const SECTOR_COLORS = ['#FF6600', '#D95800', '#FF7D24', '#E66000'];

  function drawWheel(rot) {
    ctx.clearRect(0, 0, SIZE, SIZE);

    for (let i = 0; i < N; i++) {
      const start = rot + i * ARC;
      const end   = start + ARC;
      const mid   = start + ARC / 2;

      // Gradiente radial por sector
      const gx = CX + Math.cos(mid) * R * 0.55;
      const gy = CY + Math.sin(mid) * R * 0.55;
      const grad = ctx.createRadialGradient(gx, gy, 4, CX, CY, R);
      const base = SECTOR_COLORS[i % SECTOR_COLORS.length];
      grad.addColorStop(0, base);
      grad.addColorStop(1, adjustBrightness(base, -35));

      ctx.beginPath();
      ctx.moveTo(CX, CY);
      ctx.arc(CX, CY, R, start, end);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Separadores finos
      ctx.strokeStyle = 'rgba(0,0,0,0.25)';
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      // Etiqueta del sector
      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(mid);
      ctx.textAlign   = 'right';
      ctx.fillStyle   = 'rgba(255,255,255,0.92)';
      ctx.font        = 'bold 11.5px "Outfit", Arial, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur  = 3;
      ctx.fillText(PROPOSALS[i].label, R - 16, 4.5);
      ctx.restore();
    }

    // Aro exterior
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth   = 2.5;
    ctx.stroke();

    // Hub central — gradiente
    const hubGrad = ctx.createRadialGradient(CX - 5, CY - 5, 2, CX, CY, 30);
    hubGrad.addColorStop(0, '#2C2C2C');
    hubGrad.addColorStop(1, '#0D0D0D');
    ctx.beginPath();
    ctx.arc(CX, CY, 30, 0, 2 * Math.PI);
    ctx.fillStyle   = hubGrad;
    ctx.fill();
    ctx.strokeStyle = '#FF6600';
    ctx.lineWidth   = 2.5;
    ctx.stroke();

    // Texto MM
    ctx.fillStyle   = '#FF6600';
    ctx.font        = 'bold 12px "Outfit", Arial, sans-serif';
    ctx.textAlign   = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur  = 0;
    ctx.fillText('MM', CX, CY);
    ctx.textBaseline = 'alphabetic';
  }

  function adjustBrightness(hex, amount) {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
    const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }

  drawWheel(angle);

  function spin() {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;
    if (spinBtnText) spinBtnText.textContent = 'GIRANDO…';
    spinBtn.classList.add('spinning');

    // Ocultar resultado anterior
    if (resultContent) { resultContent.classList.remove('visible'); resultContent.style.display = 'none'; }
    if (placeholder)   placeholder.classList.remove('hidden');

    const target     = pickTargetSector();
    const totalAngle = computeSpinAngle(target);
    const duration   = 4200;
    const startTime  = performance.now();
    const startAngle = angle;

    // Ease-out cuártico — desaceleración dramática
    function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      angle = startAngle + totalAngle * easeOut(progress);
      drawWheel(angle);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        spinning = false;
        spinBtn.disabled = false;
        if (spinBtnText) spinBtnText.textContent = 'GIRAR RULETA';
        spinBtn.classList.remove('spinning');

        // Pointer bounce al parar
        if (pointer) {
          pointer.classList.remove('bouncing');
          void pointer.offsetWidth; // reflow para reiniciar animación
          pointer.classList.add('bouncing');
          pointer.addEventListener('animationend', () => pointer.classList.remove('bouncing'), { once: true });
        }

        showResult(target);
      }
    }

    requestAnimationFrame(frame);
  }

  function renderVideo(videoUrl) {
    videoContainer.innerHTML = '';
    if (!videoUrl) return;

    let embedUrl = videoUrl;
    if (videoUrl.includes('youtu.be/')) {
      embedUrl = 'https://www.youtube.com/embed/' + videoUrl.split('youtu.be/')[1].split('?')[0];
    } else if (videoUrl.includes('watch?v=')) {
      embedUrl = 'https://www.youtube.com/embed/' + videoUrl.split('v=')[1].split('&')[0];
    }

    const iframe = document.createElement('iframe');
    iframe.width         = '100%';
    iframe.height        = '260';
    iframe.src           = embedUrl;
    iframe.frameBorder   = '0';
    iframe.allow         = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'border-radius:12px;display:block;';
    videoContainer.appendChild(iframe);
  }

  function showResult(targetIdx) {
    const proposal = PROPOSALS[targetIdx];
    titleEl.textContent = proposal.label;
    descEl.textContent  = proposal.desc;
    renderVideo(proposal.video);

    if (placeholder) placeholder.classList.add('hidden');
    if (resultContent) {
      resultContent.style.display = 'flex';
      void resultContent.offsetWidth;
      resultContent.classList.add('visible');
    }
  }

  spinBtn.addEventListener('click', spin);
  if (spinAgainBtn) spinAgainBtn.addEventListener('click', spin);

  /* ── COMPARTIR EN REDES ─────────────────────────────────── */
  window.compartirEnRedes = function(red) {
    const text  = encodeURIComponent('¡Descubre las propuestas de Mónica Magaña, diputada por Jalisco!');
    const url   = encodeURIComponent(window.location.href);
    const links = {
      facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter:   `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp:  `https://wa.me/?text=${text}%20${url}`,
      propuesta: `https://wa.me/?text=${text}%20${url}`,
    };
    if (links[red]) window.open(links[red], '_blank');
  };

})();

/* ═══════════════════════════════════════════════════════════
   LÍNEA DEL TIEMPO INTERACTIVA
═══════════════════════════════════════════════════════════ */

(function initTimeline() {

  const timelineItems = document.querySelectorAll('.timeline-item');
  const modal = document.getElementById('timelineModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.querySelector('.modal-overlay');

  if (!timelineItems.length || !modal) return;

  /* ── DATOS DE TIMELINE ───────────────────────────────────
     Personaliza con tus datos reales: foto, logro, impacto
  ─────────────────────────────────────────────────────── */
  const timelineData = {
    '2013': {
      title: 'Movimiento Ciudadano',
      description: 'Llegué a Movimiento Ciudadano como voluntaria, con la idea de cambiar la forma de hacer política. En 2013 me sumé al área jurídico-electoral del partido y en 2014, a los 19 años, asumí la subdelegación estatal de Jóvenes en Movimiento.',
      impact: 'Primer paso en la política: construir un movimiento desde abajo, con convicción.',
      image: 'img/monica2013.jpg'
    },
    '2015': {
      title: 'Directora del Instituto de la Juventud de Zapopan',
      description: 'Coordiné la vinculación con jóvenes en la campaña de Pablo Lemus y después formé parte de su primer gobierno en Zapopan, al frente de las políticas para las juventudes del municipio.',
      impact: 'Más de 600 jóvenes fueron beneficiados con los diversos programas del IJZ durante 2015 a 2018.',
      image: 'img/trayectoriap.jpg'
    },
    '2018': {
      title: 'Regidora de Zapopan',
      description: 'La regidora más joven de la zona metropolitana de Guadalajara. Desde el Ayuntamiento acompañé el segundo gobierno de Pablo Lemus en Zapopan.',
      impact: 'Impulsó y logró la aprobación del Nuevo Reglamento de la Vía RecreActiva, que fortaleció el programa dominical más importante de activación física y convivencia familiar de Zapopan.',
      image: 'img/compromiso.jpg'
    },
    '2021': {
      title: 'Diputada local',
      description: 'La diputada más votada de Jalisco y la primera mujer en más de 20 años en ganar el Distrito 10. Presidí la Comisión de Movilidad e impulsé las leyes de movilidad, cáncer infantil y diabetes tipo 1.',
      impact: 'Obtuvo 80,114 votos — la votación más alta del estado en su momento.',
      image: 'img/trayectoriap2.jpg'
    },
    '2024': {
      title: 'Reelecta y presidenta del Congreso',
      description: 'Zapopan me reeligió con la votación más alta del estado. Presidí el Congreso de Jalisco de noviembre de 2024 a abril de 2025, la más joven en ese cargo. Fortalecimos el Archivo General del Congreso y firmamos con los otros dos poderes del Estado y UNICEF un convenio contra el reclutamiento de niñas, niños y adolescentes.',
      impact: '111,748 votos — récord histórico para el Distrito 10.',
      image: 'img/mmonica2024.jpg'
    },
    '2025': {
      title: 'Zapopan en la ONU',
      description: 'Fui panelista en la sede de la ONU en Nueva York, donde presenté Somos Uno, y presenté en la FIL de Guadalajara mi cuento "María y la llegada de la DM1".',
      impact: 'Zapopan y Jalisco como modelo internacional en atención integral a la diabetes tipo 1.',
      image: 'img/mmonica2024.jpg' // Placeholder — reemplazar con imagen del 2025
    },
    '2026': {
      title: 'Nuevas leyes y voz internacional',
      description: 'Se aprobaron la Ley Jalisco de Colores y la ley contra el reclutamiento de niñas, niños y adolescentes. Fui la primera legisladora invitada a hablar ante el Consejo Directivo de la OPS y curso el programa Emerging Leaders de la Harvard Kennedy School.',
      impact: 'Jalisco como referente de legislación en salud y protección infantil a nivel internacional.',
      image: 'img/unicef.jpg' // Placeholder — reemplazar con imagen del 2026
    }
  };

  function showModal(year) {
    const data = timelineData[year];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalImpact').textContent = data.impact;
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalImage').alt = data.title;

    modal.classList.remove('is-closing');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('is-closing');
    setTimeout(() => {
      modal.classList.remove('is-open', 'is-closing');
      document.body.style.overflow = '';
    }, 240);
  }

  // Event listeners para items del timeline
  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      const year = item.getAttribute('data-year');
      showModal(year);
    });

    // Efecto visual al pasar cursor
    item.style.cursor = 'pointer';
  });

  // Cerrar modal
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

})();