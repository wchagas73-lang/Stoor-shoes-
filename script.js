const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuToggle.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(opened));menuToggle.textContent=opened?'×':'☰'});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));

/* Todas as 31 fotos do ZIP, cada uma usada uma única vez. A logo WA0080 fica separada. */
const photos=["IMG-20261123-WA0058.jpg","IMG-20261123-WA0059.jpg","IMG-20261123-WA0060.jpg","IMG-20261123-WA0061.jpg","IMG-20261123-WA0062.jpg","IMG-20261123-WA0063.jpg","IMG-20261123-WA0064.jpg","IMG-20261123-WA0065.jpg","IMG-20261123-WA0066.jpg","IMG-20261123-WA0067.jpg","IMG-20261123-WA0068.jpg","IMG-20261123-WA0069.jpg","IMG-20261123-WA0070.jpg","IMG-20261123-WA0071.jpg","IMG-20261123-WA0072.jpg","IMG-20261123-WA0073.jpg","IMG-20261123-WA0074.jpg","IMG-20261123-WA0075.jpg","IMG-20261123-WA0076.jpg","IMG-20261123-WA0077.jpg","IMG-20261123-WA0078.jpg","IMG-20261123-WA0079.jpg","Screenshot_20261123_203633_Instagram.jpg","Screenshot_20261123_203641_Instagram.jpg","Screenshot_20261123_203647_Instagram.jpg","Screenshot_20261123_203656_Instagram.jpg","Screenshot_20261123_203708_Instagram.jpg","Screenshot_20261123_203719_Instagram.jpg","Screenshot_20261123_203732_Instagram.jpg","Screenshot_20261123_203746_Instagram.jpg","Screenshot_20261123_203806_Instagram.jpg"];
const heroPhoto="Screenshot_20261123_203708_Instagram.jpg";
const occasionPhotos=["IMG-20261123-WA0073.jpg","IMG-20261123-WA0065.jpg","IMG-20261123-WA0072.jpg","IMG-20261123-WA0074.jpg"];
const whyPhoto="IMG-20261123-WA0071.jpg";
const productPhotos=photos.filter(file=>![heroPhoto,whyPhoto,...occasionPhotos].includes(file));
const photoPath=file=>'assets/'+file;

const heroImage=document.querySelector('.hero-image > img');
heroImage.src=photoPath(heroPhoto);
heroImage.alt='Fotografia da coleção Stoor Shoes';
document.getElementById('whyImage').src=photoPath(whyPhoto);

const occasions=[
 ['Dia a dia','Leveza para acompanhar sua rotina'],
 ['Trabalho','Elegância em todos os momentos'],
 ['Ocasiões especiais','Um toque de destaque'],
 ['Passeios','Conforto com personalidade']
];
document.getElementById('occasionGrid').innerHTML=occasionPhotos.map((file,i)=>`
 <a class="occasion-card" href="#colecao">
  <img src="${photoPath(file)}" alt="Foto da coleção Stoor Shoes, ${occasions[i][0]}" loading="lazy">
  <span>0${i+1} / ${occasions[i][0].toUpperCase()}</span>
  <b>${occasions[i][1]}</b>
 </a>`).join('');

document.getElementById('productGrid').innerHTML=productPhotos.map((file,i)=>`
 <article class="product-card">
  <div class="product-photo"><img src="${photoPath(file)}" alt="Modelo Stoor Shoes ${String(i+1).padStart(2,'0')}" loading="lazy"></div>
  <div class="product-info">
   <div><h3>Modelo Stoor ${String(i+1).padStart(2,'0')}</h3><p>Consulte cores e numerações disponíveis</p></div>
   <strong>Consulte o valor</strong>
   <a href="#contato" class="text-link">Ver detalhes ↗</a>
  </div>
 </article>`).join('');

const searchPanel=document.getElementById('searchPanel');
document.getElementById('searchBtn').addEventListener('click',()=>{searchPanel.classList.add('open');searchPanel.setAttribute('aria-hidden','false');document.getElementById('searchInput').focus()});
document.getElementById('closeSearch').addEventListener('click',()=>{searchPanel.classList.remove('open');searchPanel.setAttribute('aria-hidden','true')});
searchPanel.addEventListener('click',e=>{if(e.target===searchPanel){searchPanel.classList.remove('open');searchPanel.setAttribute('aria-hidden','true')}});
document.getElementById('searchInput').addEventListener('input',e=>{const term=e.target.value.toLocaleLowerCase('pt-BR');document.querySelectorAll('.product-card').forEach(card=>{card.style.display=card.innerText.toLocaleLowerCase('pt-BR').includes(term)?'':'none'})});
document.getElementById('year').textContent=new Date().getFullYear();


// Pausa os carrosseis enquanto a pessoa mantém o dedo ou o mouse pressionado.
document.querySelectorAll('.review-carousel').forEach(carousel=>{
  carousel.addEventListener('pointerdown',()=>carousel.classList.add('is-paused'));
  ['pointerup','pointercancel','pointerleave'].forEach(eventName=>{
    carousel.addEventListener(eventName,()=>carousel.classList.remove('is-paused'));
  });
});


// Abre as fotografias do site em tamanho original ao tocar ou clicar.
const photoViewer=document.createElement('div');
photoViewer.className='photo-viewer';
photoViewer.setAttribute('aria-hidden','true');
photoViewer.innerHTML='<button class="photo-viewer-close" type="button" aria-label="Fechar imagem">×</button><img alt="Imagem ampliada">';
document.body.appendChild(photoViewer);
const viewerImage=photoViewer.querySelector('img');
function closePhotoViewer(){
  photoViewer.classList.remove('open');
  photoViewer.setAttribute('aria-hidden','true');
  viewerImage.removeAttribute('src');
}
document.addEventListener('click',event=>{
  const photo=event.target.closest('.hero-image img, .occasion-card img, .product-photo img, .why-image img');
  if(photo){
    event.preventDefault();
    viewerImage.src=photo.currentSrc||photo.src;
    viewerImage.alt=photo.alt||'Fotografia ampliada da Stoor Shoes';
    photoViewer.classList.add('open');
    photoViewer.setAttribute('aria-hidden','false');
  }
  if(event.target===photoViewer||event.target.closest('.photo-viewer-close')) closePhotoViewer();
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&photoViewer.classList.contains('open')) closePhotoViewer();
});


// Revela textos e blocos suavemente conforme entram na área visível.
const revealTargets=document.querySelectorAll(
  '.section-heading, .benefits article, .occasion-card, .product-card, .why-copy, .why-image, .review-carousel, .faq-list details, .visit-copy, .map-frame'
);
revealTargets.forEach((element,index)=>{
  element.classList.add('scroll-reveal');
  element.style.setProperty('--reveal-delay', (index%4)*75+'ms');
});
if('IntersectionObserver' in window){
  const revealObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12,rootMargin:'0px 0px -35px 0px'});
  revealTargets.forEach(element=>revealObserver.observe(element));
}else{
  revealTargets.forEach(element=>element.classList.add('is-visible'));
}


// Quatro borboletas decorativas entre os produtos, seguindo a distribuicao da galeria original.
['gb-one','gb-two','gb-three','gb-four'].forEach(className=>{
 const butterfly=document.createElement('span');
 butterfly.className='site-butterfly gallery-butterfly '+className;
 butterfly.setAttribute('aria-hidden','true');
 butterfly.textContent='🦋';
 document.getElementById('productGrid').appendChild(butterfly);
});
