/* ===NAV SCROLL=== */
(function () {
  var nav = document.getElementById('nav');

  function onScroll() {
    // Sólido no topo → levemente transparente ao rolar
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===HAMBURGER MENU=== */
(function () {
  var btn  = document.getElementById('hamburger');
  var menu = document.getElementById('nav-mobile-menu');

  btn.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.setAttribute('aria-label',    isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  // Fechar ao clicar em qualquer link do menu mobile
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Abrir menu');
    });
  });
})();

/* ===SCROLL REVEAL=== */
(function () {
  var elements = document.querySelectorAll('.reveal');

  // Fallback para navegadores sem IntersectionObserver
  if (!window.IntersectionObserver) {
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function (el) { observer.observe(el); });
})();

/* ===FORMULÁRIO=== */
(function () {
  var form     = document.getElementById('contato-form');
  var feedback = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nome     = form.nome.value.trim();
    var telefone = form.telefone.value.trim();
    var assunto  = form.assunto.value;
    var mensagem = form.mensagem.value.trim();

    // Limpa estado anterior
    feedback.className = '';
    feedback.style.display = 'none';

    if (!nome || !telefone || !assunto || !mensagem) {
      feedback.textContent = 'Por favor, preencha todos os campos antes de enviar.';
      feedback.className = 'error';
      return;
    }

    // Monta mensagem para o WhatsApp com dados do formulário
    var texto = 'Olá! Me chamo ' + nome + '.\n'
      + 'Telefone: ' + telefone + '\n'
      + 'Assunto: '  + assunto  + '\n'
      + 'Mensagem: ' + mensagem;

    var url = 'https://wa.me/5521964548006?text=' + encodeURIComponent(texto);

    feedback.textContent = 'Mensagem preparada! Você será redirecionado para o WhatsApp.';
    feedback.className = 'success';

    setTimeout(function () {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 800);
  });
})();

/* ===CONTADOR DE NÚMEROS=== */
(function () {
  var counters = document.querySelectorAll('.numero-valor[data-target]');
  if (!counters.length || !window.IntersectionObserver) return;

  var triggered = false;

  function animateCounter(el) {
    var target   = parseInt(el.getAttribute('data-target'), 10);
    var suffix   = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var start    = null;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      el.textContent = Math.floor(easeOut(progress) * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        counters.forEach(animateCounter);
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  var section = document.getElementById('numeros');
  if (section) observer.observe(section);
})();

/* ===ANO DINÂMICO NO FOOTER=== */
(function () {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();
