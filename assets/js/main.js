/* ===NAV SCROLL=== */
(function () {
  var nav = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 24) {
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

/* ===ANO DINÂMICO NO FOOTER=== */
(function () {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();
