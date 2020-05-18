---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
bodyClass: home-page
theme-color: "#FFFFFF"
---

<!-- greeatings -->
<section class="section home clearfix">
  <article class="greetings">
    <h2>
      Escrevo<br />
      código para<br />
      <strong>pessoas</strong>
    </h2>
  </article>
  <div class="content-presentation">
    <article class="presentation">
      <h2>Meu nome é <strong>Everton Strack</strong>, sou <strong>Front-End developer</strong> com foco em resolução de problemas, design, performance e SEO.</h2>
    </article>
    <article class="about">
      <p>Especialista em HTML, CSS e Javascript, com sólidos conhecimentos em arquitetura do ecosistema Front-End e em tecnologias com Angular, React, TypeScript, StencilJS, Grunt, Gulp, Web Components, design responsivo, web mobile;</p>
      <p>Sou entusiasta de tecnologia, gosto de ler entre as linhas da indústria de tecnologia e tentar entender as
      motivações por trás de decisões que podem parecer incríveis, irracionais ou puramente idiotas. Também gosto de beleza,
      café medíocre e dias chuvosos.</p>
      <button id="share">Share teste</button>
    </article>
  </div>
</section>
<!-- /greeatings -->


<script>
function share() {

  if (navigator.share){
    navigator.share({
        url: "https://evertonstrack.com.br/blog/seletores-css-not/",
        title: "Seletores CSS que vão mudar sua vida (Parte 2) - :not()"
        // text: "Hoje vamos falar sobre a pseudo-classe :not(), é um seletor muito poderoso que pode nos ajudar a criar regras de estilização muito bacanas."
    })
    .then(() => { alert("Shared YEEEE!!!!!"); })
    .catch((error) => { alert("Sharing Failed" + error) });
  } else {
    alert('Web Share API is not supported');
  }
}

const shareButton = document.querySelector('#share');
shareButton.addEventListener('click', share);
  
</script>