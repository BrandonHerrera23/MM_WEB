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
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
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
    '.about-inner, .about-image-wrap, .about-text, .card, .wa-text, .wa-qr-wrap, .footer-col'
  );
  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 3) * 100}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => observer.observe(el));

  /* ─── SMOOTH SCROLL ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});

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

  const canvas    = document.getElementById('wheelCanvas');
  const spinBtn   = document.getElementById('spinBtn');
  const resultDiv = document.getElementById('wheelResult');
  const titleEl   = document.getElementById('proposalTitle');
  const descEl    = document.getElementById('proposalDesc');
  const videoSrc  = document.getElementById('proposalVideo');

  if (!canvas || !spinBtn) return;

  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const CX = W / 2, CY = H / 2, R = CX - 10;

  /* ── PROPUESTAS ─────────────────────────────────────────
     Para agregar video pon la ruta en video: "img/tu_video.mp4"
     Si no tienes video déjalo en "" y se ocultará automáticamente.
  ─────────────────────────────────────────────────────── */
  const PROPOSALS = [
    {
      label: "Salud Renal",
      color: "#FF6600",
      text:  "#fff",
      desc:  "Te cuento un poco sobre mi y mi trabajo.",
      video: "img/video_autismo.mp4"
    },
    {
      label: "Derechos NNA",
      color: "#CC4E00",
      text:  "#fff",
      desc:  "Tepatitlán #somos uno.",
      video: "img/tepa_somos_uno.mp4"
    },
    {
      label: "Diabetes",
      color: "#FF8C3A",
      text:  "#fff",
      desc:  "Sensibilización y acceso a insumos para personas con diabetes. Mónica vive con Diabetes Tipo 1 y convierte su experiencia en acción legislativa.",
      video: ""
    },
    {
      label: "Educación",
      color: "#E65C00",
      text:  "#fff",
      desc:  "Impulso a programas de becas para estudiantes de educación media superior en situación de vulnerabilidad en el Distrito 10.",
      video: ""
    },
    {
      label: "Mujeres",
      color: "#FF6600",
      text:  "#fff",
      desc:  "Talleres de emprendimiento y capacitación laboral para mujeres jefas de familia. Fortalecer la autonomía económica en el distrito.",
      video: ""
    },
    {
      label: "Infraestructura",
      color: "#CC4E00",
      text:  "#fff",
      desc:  "Gestión de obra pública: pavimentación, alumbrado y mejora de espacios comunitarios en colonias prioritarias de Zapopan.",
      video: ""
    },
    {
      label: "Medio Ambiente",
      color: "#FF8C3A",
      text:  "#fff",
      desc:  "Proyecto de reforestación y creación de áreas verdes en colonias populares. Un Jalisco más verde para las próximas generaciones.",
      video: ""
    },
    {
      label: "Salud Mental",
      color: "#E65C00",
      text:  "#fff",
      desc:  "Iniciativa para incorporar atención psicológica en centros de salud del distrito. La salud mental es salud.",
      video: ""
    },
  ];

  const N   = PROPOSALS.length;
  const ARC = (2 * Math.PI) / N;
  let angle   = 0;
  let spinning = false;

  function drawWheel(rot) {
    ctx.clearRect(0, 0, W, H);

    PROPOSALS.forEach((p, i) => {
      const start = rot + i * ARC;
      const end   = start + ARC;

      ctx.beginPath();
      ctx.moveTo(CX, CY);
      ctx.arc(CX, CY, R, start, end);
      ctx.closePath();
      ctx.fillStyle   = p.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(start + ARC / 2);
      ctx.textAlign    = 'right';
      ctx.fillStyle    = p.text;
      ctx.font         = 'bold 12px Arial, sans-serif';
      ctx.shadowColor  = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur   = 3;
      ctx.fillText(p.label, R - 14, 4);
      ctx.restore();
    });

    // Círculo central
    ctx.beginPath();
    ctx.arc(CX, CY, 24, 0, 2 * Math.PI);
    ctx.fillStyle   = '#0D0D0D';
    ctx.fill();
    ctx.strokeStyle = '#FF6600';
    ctx.lineWidth   = 3;
    ctx.stroke();

    ctx.fillStyle  = '#FF6600';
    ctx.font       = 'bold 11px Arial';
    ctx.textAlign  = 'center';
    ctx.shadowBlur = 0;
    ctx.fillText('MM', CX, CY + 4);
  }

  drawWheel(angle);

  function spin() {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled    = true;
    spinBtn.textContent = 'GIRANDO...';
    resultDiv.style.display = 'none';

    const totalAngle = (5 + Math.floor(Math.random() * 5)) * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration   = 3500;
    const start      = performance.now();
    const startAngle = angle;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      angle = startAngle + totalAngle * easeOut(progress);
      drawWheel(angle);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        spinning = false;
        spinBtn.disabled    = false;
        spinBtn.textContent = 'GIRAR RULETA';
        showResult(angle);
      }
    }

    requestAnimationFrame(frame);
  }

  function showResult(finalAngle) {
    const pointer    = -Math.PI / 2;
    const normalized = ((pointer - finalAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const idx        = Math.floor(normalized / ARC) % N;
    const proposal   = PROPOSALS[idx];

    titleEl.textContent = proposal.label;
    descEl.textContent  = proposal.desc;

    const videoEl = videoSrc ? videoSrc.closest('video') : null;
    if (videoEl) {
      if (proposal.video) {
        videoSrc.src = proposal.video;
        videoEl.style.display = 'block';
        videoEl.load();
      } else {
        videoEl.style.display = 'none';
      }
    }

    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  spinBtn.addEventListener('click', spin);

  /* ── COMPARTIR EN REDES ─────────────────────────────────── */
  window.compartirEnRedes = function(red) {
    const text  = encodeURIComponent('¡Descubre las propuestas de Mónica Magaña, diputada por Jalisco! 🧡');
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
      title: 'Inicio en servicio público',
      description: 'Comenzó mi trayectoria en la administración pública, enfocándome en políticas de inclusión y acceso a servicios básicos para comunidades vulnerables.',
      impact: 'Participación activa en 5 programas municipales con impacto en más de 2,000 familias. Establecimiento de base comunitaria en el distrito.',
      image: 'img/Monica.jpg' // Reemplaza con imagen real del 2018
    },
    '2015': {
      title: 'Directora del Instituto de la Juventud de Zapopan',
      description: 'En 2015 fui nombrada Directora del Instituto de la Juventud de Zapopan, convirtiendome en una de las funcionarias más jóvenes en ocupar este cargo en la Zona Metropolitana de Guadalajara, impulsando programas para jóvenes en situación de riesgo por violencia y adicciones.',
      impact: 'Me converti en una de las funcionarias mas jovenes impulsando programas para jovenes.',
      image: 'img/trayectoriap.jpg' // Reemplaza con imagen real del 2015
    },
    '2018': {
      title: 'Regidora más joven de la Zona Metropolitana de Guadalajara',
      description: 'En 2018 fue electa Regidora de Zapopan, convirtiéndose en la más joven de la Zona Metropolitana de Guadalajara, consolidando su liderazgo en temas de participación ciudadana y desarrollo social.',
      impact: '3 centros comunitarios construidos. 1,500+ personas beneficiadas. Presupuesto legislativo de $2.5M asignado exitosamente.',
      image: 'img/compromiso.jpg' // Reemplaza con imagen real del 2018
    },
    '2021': {
      title: 'Diputada local y promotora de leyes clave en Jalisco',
      description: 'Fue electa Diputada local por el Distrito 10 con votación histórica y ha impulsado iniciativas en salud pública, movilidad segura y atención integral para niñas y niños con diabetes tipo 1, además de presidir la Comisión de Higiene y Salud Pública del Congreso del Estado.',
      impact: 'obtuvo más de 80 mil votos en su elección al Congreso estatal.',
      image: 'img/trayectoriap2.jpg' // Reemplaza con imagen real actual
    },
    '2024': {
      title: 'Diputada más votada del Distrito 10 (Zapopan)',
      description: 'En 2024 fue electa Diputada local por el Distrito 10 de Zapopan con 111,748 votos, la votación más alta registrada en ese distrito, consolidando un respaldo histórico de la ciudadanía.',
      impact: 'En su elección anterior (2021) ya había logrado 80,114 votos, también récord en ese momento para el distrito.',
      image: 'img/mmonica2024.jpg' // Reemplaza con imagen real actual
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

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
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
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });

})();