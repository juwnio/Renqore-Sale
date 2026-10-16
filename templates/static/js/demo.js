(function(){
  "use strict";
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* scroll reveal — same behaviour as the home page */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
    },{threshold:.14, rootMargin:'0px 0px -8% 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('visible'); });
  }

  /* only one recording plays at a time */
  var videos = document.querySelectorAll('.video-card video');
  videos.forEach(function(v){
    v.addEventListener('play', function(){
      videos.forEach(function(other){ if (other !== v && !other.paused){ other.pause(); } });
    });
  });
})();
