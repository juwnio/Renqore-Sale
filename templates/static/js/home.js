(function(){
  "use strict";
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
    },{threshold:.14, rootMargin:'0px 0px -8% 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('visible'); });
  }

  /* logo self-draw */
  document.querySelectorAll('.logo path, .logo line, .logo rect').forEach(function(shape,i){
    if (typeof shape.getTotalLength !== 'function') return;
    var len = shape.getTotalLength();
    shape.style.strokeDasharray = len;
    if (reduce){ shape.style.strokeDashoffset = 0; return; }
    shape.style.strokeDashoffset = len;
    shape.style.transition = 'stroke-dashoffset 1.15s cubic-bezier(.65,0,.35,1) ' + (0.15 + i*0.15).toFixed(2) + 's';
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ shape.style.strokeDashoffset = 0; }); });
  });

  /* typewriter quote */
  var quoteEl = document.getElementById('quoteText');
  var quote = "I believe code is ephemeral, but function lives forever. I dream to pass this tool on and hope it evolves in more capable hands \u2014 while I create the next.";
  var typed = false;
  function typeQuote(){
    if (typed) return; typed = true;
    if (reduce){ quoteEl.textContent = quote; return; }
    var i = 0;
    (function tick(){
      quoteEl.textContent = quote.slice(0,i); i++;
      if (i <= quote.length){ setTimeout(tick, 22); }
      else { var c = document.querySelector('.quote .caret'); if(c) c.classList.add('done'); }
    })();
  }
  var why = document.getElementById('why');
  if ('IntersectionObserver' in window){
    var io2 = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ typeQuote(); io2.unobserve(e.target); } });
    },{threshold:.42});
    io2.observe(why);
  } else { typeQuote(); }
})();
