var EN=document.documentElement.lang==='en';
(function(){
  var nav=document.getElementById('nav'),burger=document.getElementById('burger');
  function onScroll(){nav.classList.toggle('scrolled',window.scrollY>40)}
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  document.querySelectorAll('#menu a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false')})});
  var yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});

  // Vidéo
  var tile=document.getElementById('videoTile'),vid=tile&&tile.querySelector('video');
  if(tile)tile.addEventListener('click',function(){
    if(vid.paused){vid.play();tile.classList.add('playing')}else{vid.pause();tile.classList.remove('playing')}
  });

  // Lightbox
  var imgs=[].slice.call(document.querySelectorAll('.gallery .g-item:not(.g-video) img')),lb=document.getElementById('lightbox'),lbImg=lb.querySelector('img'),cur=0;
  function show(i){cur=(i+imgs.length)%imgs.length;lbImg.src=imgs[cur].src;lbImg.alt=imgs[cur].alt}
  imgs.forEach(function(im,i){im.parentNode.addEventListener('click',function(){show(i);lb.classList.add('on');document.body.style.overflow='hidden'})});
  function close(){lb.classList.remove('on');document.body.style.overflow=''}
  lb.querySelector('.lb-close').onclick=close;
  lb.querySelector('.lb-prev').onclick=function(e){e.stopPropagation();show(cur-1)};
  lb.querySelector('.lb-next').onclick=function(e){e.stopPropagation();show(cur+1)};
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});

  // Pastille d'appel masquée sur le formulaire
  var fc=document.getElementById('floatCall');
  var dv=document.getElementById('devis');if(fc&&dv)new IntersectionObserver(function(es){fc.classList.toggle('hide',es[0].isIntersecting)},{threshold:.05}).observe(dv);

  // Formulaire
  var form=document.getElementById('devisForm');
  if(form)form.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=form.querySelector('button[type=submit]');btn.disabled=true;btn.textContent=EN?'Sending…':'Envoi…';
    fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}})
      .then(function(r){return r.json()})
      .then(function(d){if(d.success){document.getElementById('formFields').style.display='none';document.getElementById('formOk').style.display='block'}else{throw 0}})
      .catch(function(){btn.disabled=false;btn.textContent=EN?'Send my request':'Envoyer ma demande';alert(EN?"Sending failed. Please call us on +33 7 68 78 92 58.":"L'envoi a échoué. Appelez-nous au 07 68 78 92 58.")});
  });
  var ps=document.getElementById('f-presta'),pre=document.body.getAttribute('data-presta');if(ps&&pre)ps.value=pre;
})();
