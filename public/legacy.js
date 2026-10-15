/* Comportamento mínimo das páginas antigas (antes feito pelo React): filtro do blog e índice de
   Termos/Privacidade. Cabeçalho, menu e rodapé vêm da moldura única (src/components). */
(function () {
  'use strict';

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
