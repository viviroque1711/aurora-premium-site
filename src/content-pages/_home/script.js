(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=[].slice.call(document.querySelectorAll('[data-m],.units'));
  function countUp(el){
    var to=+el.dataset.count,pre=el.dataset.pre||'',suf=el.dataset.suf||'',t0=null,dur=1100;
    function step(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=pre+Math.round(to*e).toLocaleString('pt-BR')+suf;if(p<1)requestAnimationFrame(step)}
    requestAnimationFrame(step);
  }
  function runGrid(){
    document.querySelectorAll('.ap.flip').forEach(function(ap){
      setTimeout(function(){var st=ap.querySelector('.st');st.textContent='Confirmado';st.classList.add('ok');ap.classList.add('flash')},reduce?0:+ap.dataset.d);
    });
    var n=document.querySelector('.ap.new'); if(n) setTimeout(function(){n.classList.add('on')},reduce?0:3200);
  }
  if(reduce||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});runGrid();return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting)return;
      var el=en.target; el.classList.add('in'); io.unobserve(el);
      el.querySelectorAll&&el.querySelectorAll('[data-count]').forEach(function(c){setTimeout(function(){countUp(c)},400)});
      if(el.dataset&&el.dataset.count)setTimeout(function(){countUp(el)},400);
      if(el.id==='grade')setTimeout(runGrid,500);
    });
  },{threshold:.06});
  els.forEach(function(e){io.observe(e)});
  // barra de progresso de leitura e leve paralaxe da arte principal
  var bar=document.querySelector('.progress'),art=document.querySelector('.hero-art');
  addEventListener('scroll',function(){
    var h=document.documentElement,s=h.scrollTop/(h.scrollHeight-h.clientHeight);
    bar.style.transform='scaleX('+s+')';
    if(art&&h.scrollTop<900)art.style.translate='0 '+(h.scrollTop*.12)+'px';
  },{passive:true});
})();
