---
layout: page
title: Sobre
description: "Everton Strack, Desenvolvedor Front-end, aspirante a Ux/UI Designer e Co-Fundador da UFA!. Lógica, criatividade e muito café! Entre e pegue uma xícara."
permalink: /sobre/
bodyClass: about-page full-section
image: /assets/images/evertonstrack.jpg
---

<!-- breadcrumb - rich snippts -->
<div class="breadcrumb hide">
    <div id="a" itemscope itemtype="http://data-vocabulary.org/Breadcrumb" itemref="b">
        <a href="http://evertonstrack.com.br/" itemprop="url">
            <span itemprop="title">evertonstrack.com.br</span>
        </a> ›
    </div>
    <div id="b" itemscope itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="child">
        <a href="http://evertonstrack.com.br/sobre/" itemprop="url">
            <span itemprop="title">Sobre</span>
        </a> ›
    </div>
</div>
<!-- /breadcrumb - rich snippts -->

<!-- section persona -->
<section class="section section-persona">
  <div class="persona">
    <div class="side code-side">
      <div class="text">
          <h2>Ninja Front-end Developer</h2>
          <p>Desenvolvedor Front-end com foco em performance e SEO e buscando ser um ninja javascript.</p>
      </div>
    </div>
    <div class="side design-side">
      <div class="text">
          <h2>Aspirante a UX/UI Designer</h2>
          <p>Estudante de Design apaixonado por UI/UX, minimalisma, e sonha em mudar o mundo.</p>
      </div>
    </div>
  </div>
</section>
<!-- /section persona -->

<!-- section sobre everton -->
<section class="section section-sobre-everton">
  <div class="wrap">
    <header class="section-header title-section" role="heading">
      <div class="title-section-container">
          <h2>Sobre Everton Strack</h2>
          <p>Um pequeno apanhado sobre minha vida o universo e tudo mais. Como me tornei <strong>desenvolvedor front-end</strong>, onde estou e para onde vou.</p>
      </div>
    </header>
    <div class="clearfix">
        <div itemscope itemtype="http://schema.org/Person">
            <figure role="img" class="right">
                <img src="/assets/images/everton-strack-2.jpg" class="round right" alt="Foto de Everton Strack" />
                <figcaption class="hide">
                    <strong>Everton Strack</strong>
                </figcaption>
            </figure>
            <p>
              Meu nome é
                  <strong itemprop="name">Everton Strack</strong>
              , mas todos me chamam de Thom. Tenho 34 anos, moro em
              <span itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                  <span itemprop="addressLocality">São Leopoldo</span>,
                  <span itemprop="addressRegion">Rio Grande do Sul</span>
                  <span class="hide" itemprop="addressCountry"> Brasil</span>
              </span>
              e trabalho como
              <a itemprop="url" href="http://evertonstrack.com.br/">
                  <strong itemprop="jobtitle">Desenvolvedor Front-end</strong>
              </a>
              desde 2008 em aplicações web.
            </p>
            <p>
              Tenho sólido conhecimento em: HTML5, CSS3, JS, React, Angular, AngularJS Grunt, Gulp, design responsivo, web mobile. Trabalhei em projetos com grande clientes como Tramontina, Boticário, Lacta, LG, Trakinas, Petrobrás.
            </p>
            <p>
                Atualmente trabalho como
                <strong>Desenvolvedor de Software Front-end</strong> na <a href="http://king.host/" target="_blank"> KingHost</a>. Já trabalhei em empresas como Brivia, E-Storage, W3Haus
                e Huia, CWI Software, dentre outras. Desenvolvi e participei de vários projetos bem bacanas, alguns deles estão aqui no meu
                <strong>
                    <a href="/portfolio" class="link-anchor">portfolio <span class="hihe">de desenvolvedor front-end</span></a>
                </strong>.
                <em>Confere lá!</em>
            </p>
            <p itemprop="description">
                Sou estudante de
                <strong>Design</strong> apaixonado por UI/UX, minimalisma, e sonho em mudar o mundo.
                Estou sempre antenado à novas tendências tecnológicas e inovadoras. Os quase 10 anos de experiência na
                área de
                <strong>
                    <a href="http://pt.wikipedia.org/wiki/Front-end_e_back-end" target="_blank" rel="external">front-end</a>
                </strong> e pelo menos o dobro em paixão por tecnologia, resultam em um trabalho entregue com rapidez e competência.
                Buscando atender da melhor forma a proposta (e os sonhos) do cliente. Isso quer dizer que faço
                <strong>HTML, CSS e Javascript</strong> da melhor forma possível, utilizando  sempre que possível as novas tecnologias e focando em performance.
            </p>
        </div>
    </div>
  </div>
</section>
<!-- /section sobre everton -->

{%- include skills.html -%}

<script type="application/ld+json">
  {
      "@context": "http://schema.org/",
      "@type": "Website",
      "url": "https://evertonstrack.com.br/",
      "name": "Everton Strack Blog",
      "author": {
          "type": "Person",
          "name": "Everton Strack",
          "sameAs": [
              "https://www.instagram.com/evertonstrack/",
              "https://twitter.com/evertonstrack",
              "https://www.linkedin.com/in/evertonstrack/"
          ]
      },
      "description": "{{ site.description }}"
  }
</script>
