---
layout: post
title:  "Atomic Design"
description: "Componentes, componentização, modularização. Não são conceitos novos, mas atualmente sua força tem sido maior do que nunca. Hoje vamos ver uma metodologia que vai nos ajudar a construir interfaces melhores, mais consistentes e coesas."
date:   2020-03-20 13:00:00 -0300
bodyClass: post-design
theme-color: "#e91363"
tags: ['design']
image: /assets/images/posts/atomic-design/atomic-design.png
---

Quem trabalha com web, já deve estar cansado em ouvir sobre componentes, componentização e modularização. Não sãp conceitos novos, mas atualmente sua força tem sido maior do que nunca. Hoje vamos ver uma metodologia que vai nos ajudar a construir interfaces melhores, mais consistentes e coesas.

## O que é Atomic Design?

O Atomic Design é uma metodologia para criar design systems criada pelo Brad Frost, é uma analogia científica que nos ajuda a pensar as interfaces de uma maneira mais completa.

Um conjunto de Átomos forma uma Molécula, e um conjunto de moléculas forma um Organismo.


> "O Atomic Design é uma metodologia que nos ajuda a pensar na interface do usuário (UI) de maneira hierarquia e reforça a importância da qualidade de pattern libraries eficazes, e apresenta técnicas para otimizar o fluxo de trabalho do design e desenvolvimento em equipe. O Atomic Design também detalha o que acontece durante a criação e manutenção de sistemas de design, permitindo a implementação de UIs com mais consistência e qualidade."_
> — Brad Frost


## Motivação

A motivação surgiu analisando algumas características do projeto em conjunto com as definições da equipe de UX.

Projetos grandes que requerem manutenção ao longo do tempo, exigem que nossas interfaces tenham uma alta capacidade de replicação e expansão de forma simples e sem perder a essência da experiência atual.


> _“Não estamos criando páginas, estamos projetando sistemas de componentes.“_
> — Stephen Hay

É neste ponto que entra o Atomic Web Design, onde começamos a entender nossas interfaces como quebra-cabeças, facilitando nosso trabalho para estruturar nossos componentes e construir a interface do sistema modular.

## Entendendo a estrutura de componentes

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/atomic-design/atomic-design.webp" />
    <source srcset="/assets/images/posts/atomic-design/atomic-design.png" />
    <img itemprop="image" src="/assets/images/posts/atomic-design/atomic-design.png" alt="Atomic design" />
  </picture>
  <legend>Atomic Design. (Image from https://bradfrost.com/)</legend>
</figure>


### Átomos (atoms)

Os Átomos são os blocos básicos da interface. Os átomos são nossas tags HTML, como um `<label>` de formulário, um `<input>` ou um `<button>`. São basicamente os componentes mais simples e reutilizáveis da aplicação.

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/atomic-design/atoms.webp" />
    <source srcset="/assets/images/posts/atomic-design/atoms.png" />
    <img itemprop="image" src="/assets/images/posts/atomic-design/atoms.png" alt="Átomos (Atoms)" />
  </picture>
  <legend>Átomos (Atoms) (Image from https://bradfrost.com/)</legend>
</figure>

Também podem incluir elementos mais abstratos,como paletas de cores, fontes e aspectos ainda mais invisíveis de uma interface, como animações.

Eles são bastante abstratos e muitas vezes não são muito úteis por si próprios. No entanto, eles são bons como referência no contexto de uma biblioteca de padrões, já que você pode ver todos os seus estilos globais em um piscar de olhos.

### Moléculas (molecules)

As Moléculas são grupos simples de elementos  da interface (`atoms`), colocados juntos e funcionando como uma unidade.

Por exemplo, um `<label>`, `<input>` de busca e um `<button>` podem se unir para criar a molécula formulário de pesquisa.

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/atomic-design/molecule.webp" />
    <source srcset="/assets/images/posts/atomic-design/molecule.png" />
    <img itemprop="image" src="/assets/images/posts/atomic-design/molecule.png" alt="Átomos (Atoms)" />
  </picture>
  <legend>Moléculas (molecules) (Image from https://bradfrost.com/)</legend>
</figure>


### Organismos (organisms)

Moléculas nos dão alguns blocos de construção para trabalhar, e agora podemos combiná-los para formar Organismos.

Os Organismos são grupos de moléculas unidas para formar uma seção relativamente complexa e distinta de uma interface.

Como por exemplo, a molécula do formulário de pesquisa combinada com a molécula de navegação, formam o organismo header.

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/atomic-design/organism2.webp" />
    <source srcset="/assets/images/posts/atomic-design/organism2.png" />
    <img itemprop="image" src="/assets/images/posts/atomic-design/organism2.png" alt="Organismos (organisms)" />
  </picture>
  <legend>Organismos (organisms) (Image from https://bradfrost.com/)</legend>
</figure>

Os organismos podem consistir em tipos de moléculas semelhantes e/ou diferentes.

Por exemplo, um organismo de cabeçalho pode consistir em diversos componentes, como um logotipo, navegação, formulário de pesquisa e lista de redes sociais.
Já um organismo de listagem de produtos pode consistir na mesma molécula (contendo uma imagem, título e preço) repetida várias vezes.

Construir a partir de moléculas para organismos incentiva a criação de componentes reutilizáveis portáteis e independentes.


### Templates (templates)

Aqui nos distanciamos da analogia com a química e biologia e nos aproximamos mais do nosso dia-a-dia.

Os Templates consistem principalmente de grupos de organismos estruturados juntos para formar páginas.

É aqui que começamos a ver coisas como layout em ação. Semelhante a um Wireframe, é aqui por exemplo, onde aplicamos os skeletons/Shimmer (placeholders de conteúdo).

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/atomic-design/template1.webp" />
    <source srcset="/assets/images/posts/atomic-design/template1.png" />
    <img itemprop="image" src="/assets/images/posts/atomic-design/template1.png" alt="Templates (templates)" />
  </picture>
  <legend>Templates (templates) (Image from https://bradfrost.com/)</legend>
</figure>


### Páginas (pages)

As Páginas são instâncias específicas de templates. As páginas provém o conteúdo base para aquela páginas, como por exemplo, os dados do usuário e a listagem de serviços que ele tem disponível, etc.

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/atomic-design/page1.webp" />
    <source srcset="/assets/images/posts/atomic-design/page1.png" />
    <img itemprop="image" src="/assets/images/posts/atomic-design/page1.png" alt="Páginas (pages)" />
  </picture>
  <legend>Páginas (pages) (Image from https://bradfrost.com/)</legend>
</figure>


## Porque Atomic Design?

O Atomic Design nos fornece uma metodologia clara para a construção de sistemas de interface modular e nos dá a capacidade de percorrer do abstrato ao concreto, levando a modularização a outro nível.

Com isso podemos criar sistemas que promovam consistência e escalabilidade enquanto exibimos simultaneamente as coisas em seu contexto final.

## Conclusão


O que falamos aqui, é um resumo do Atomic Design, você pode conferir mais no [site do do Brad Frost](http://bradfrost.com/blog/post/atomic-web-design/){:target="_blank"}{:rel="noopener"}, e pode também comprar o livro para se aprofundar mais.

Recomendo a leitura!

Links:
- [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/){:target="_blank"}{:rel="noopener"}
- [Livro Atomic Design (Inglês)](http://atomicdesign.bradfrost.com/){:target="_blank"}{:rel="noopener"}
- [A modularidade é um importante princípio de design para a Web (Tim Berners-Lee)](https://www.w3.org/DesignIssues/Modularity.html){:target="_blank"}{:rel="noopener"}


Até mais e obrigado pelos peixes.
