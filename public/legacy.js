/* Comportamento mínimo das páginas antigas (antes feito pelo React): menu mobile, cabeçalho ao rolar,
   filtro do blog e índice de Termos/Privacidade. Os botões de cadastro/WhatsApp já são links no HTML. */
(function () {
  'use strict';

  // 1) Cabeçalho: fundo translúcido depois de rolar 8px
  var header = document.querySelector('header.header-fixed');
  if (header) {
    var on = ['bg-[rgba(18,10,38,0.85)]', 'backdrop-blur-md', 'border-b', 'border-b-white/[0.08]'];
    var sync = function () {
      var scrolled = window.scrollY > 8;
      header.classList.toggle('bg-transparent', !scrolled);
      on.forEach(function (c) { header.classList.toggle(c, scrolled); });
    };
    window.addEventListener('scroll', sync, { passive: true });
    sync();
  }

  // 2) Menu mobile (montado a partir dos links do menu de desktop)
  var btn = document.querySelector('button[aria-label="Abrir menu"]');
  if (btn && header) {
    var ICON_MENU = btn.innerHTML;
    var ICON_X = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
    var panel = null;
    var build = function () {
      var links = Array.prototype.slice.call(header.querySelectorAll('div.hidden a[href^="/"]'));
      var p = document.createElement('div');
      p.className = 'absolute top-[64px] left-0 right-0 bg-[var(--bg-base)] border-b border-[var(--border-min)] md:hidden overflow-hidden shadow-2xl z-[50]';
      var box = document.createElement('div');
      box.className = 'p-4 flex flex-col gap-2';
      links.forEach(function (a) {
        var l = document.createElement('a');
        l.href = a.getAttribute('href');
        l.textContent = a.textContent.trim();
        l.className = 'flex items-center justify-between text-left text-[var(--text-muted)] hover:text-[var(--text-primary)] py-3 border-b border-[var(--border-min)] transition-colors duration-200';
        box.appendChild(l);
      });
      var cta = document.createElement('div');
      cta.className = 'flex flex-col gap-3 pt-4';
      cta.innerHTML = '<a href="https://app.aurorapremium.com/auth?mode=login" target="_blank" rel="noopener" class="w-full text-center py-3 text-[var(--text-primary)] font-medium border border-[var(--border-subtle)] rounded-[var(--radius-pill)]">Entrar</a>' +
        '<a href="https://app.aurorapremium.com/auth?mode=signup" target="_blank" rel="noopener" class="w-full text-center py-3 bg-[var(--gradient-main)] text-[var(--title-dark)] font-bold rounded-[var(--radius-pill)] shadow-[var(--glow-cta-btn)]">Teste Grátis</a>';
      box.appendChild(cta);
      p.appendChild(box);
      return p;
    };
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      if (open) {
        if (panel) panel.remove();
        panel = null;
      } else {
        panel = build();
        header.appendChild(panel);
      }
      btn.setAttribute('aria-expanded', String(!open));
      btn.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
      btn.innerHTML = open ? ICON_MENU : ICON_X;
    });
  }

  // 3) Blog: filtro por categoria e busca
  var search = document.querySelector('input[placeholder="Buscar artigos..."]');
  if (search) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('a.group[href^="/blog/"]')).map(function (a) { return a.parentElement; });
    var cats = Array.prototype.slice.call(document.querySelectorAll('div.flex-wrap > button'));
    var active = 'Todos';
    var activeCls = cats.length ? cats[0].className : '';
    var idleCls = cats.length > 1 ? cats[1].className : '';
    var apply = function () {
      var q = search.value.trim().toLowerCase();
      cards.forEach(function (c) {
        var cat = (c.querySelector('span.uppercase') || {}).textContent || '';
        var okCat = active === 'Todos' || cat.trim() === active;
        var okQ = !q || c.textContent.toLowerCase().indexOf(q) !== -1;
        c.style.display = okCat && okQ ? '' : 'none';
      });
    };
    cats.forEach(function (b) {
      b.addEventListener('click', function () {
        active = b.textContent.trim();
        cats.forEach(function (x) { x.className = x === b ? activeCls : idleCls; });
        apply();
      });
    });
    search.addEventListener('input', apply);
  }

  // 4) Termos de Uso / Política de Privacidade: índice rola até a seção
  var sel = document.querySelector('select');
  if (sel && sel.options.length > 3) {
    var ids = Array.prototype.map.call(sel.options, function (o) { return o.value; });
    var go = function (id) {
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    sel.addEventListener('change', function () { go(sel.value); });
    var toc = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function (b) { return /^\d+\.\s/.test(b.textContent.trim()); });
    toc.forEach(function (b, i) {
      b.addEventListener('click', function () { go(ids[i]); });
    });
  }
})();
