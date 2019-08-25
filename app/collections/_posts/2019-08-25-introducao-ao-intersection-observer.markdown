---
layout: post
title:  "Introdução ao Intersection Observer’s"
description: "Uma simples API que nos permiteverificar se um elemento está visível na tela com mais facilidade e sem custar tanto na performance. Essa é a API do Intersection Observer."
date:   2019-08-25 11:00:00 -0300
bodyClass: post-javascript
theme-color: "#ffdd18"
tags: ['javascript']
image: /assets/images/posts/introducao-ao-intersection-observer/intersection-observer.jpg
---

Vamos dizer que você quer realizar uma ação, uma animação quando um elemento aparece na viewport visível, ou mesmo para aplicar uma técnica de lazy loading.

Você pode fazer isso chamando o `getBoundingClientRect()` no elemento que quiser em um intervalo de tempo pré-definido. Claro, a performance dessa abordagem é bem ruim, pois a cada chamada do `getBoundingClientRect()` você força o navegador a fazer o re-layout de toda a página.

Mas e se existisse uma forma de verificar se um elemento está visível na tela com mais facilidade e sem custar tanto na performance? E não é que existe!


## Contexto histórico

Se você trabalha com desenvolvimento web a bastante tempo, deve conhecer nomes como “jQuery ScrollSpy” e [“Super Scrollorama”](https://johnpolacek.github.io/superscrollorama/), certo?

Para que não conheceu, eram dois plugins jQuery muito usados para aplicar animações em nos elementos da tela conforme a rolagem do site ia sendo feita e os elementos iam ficando visíveis na tela.

O Superscrollorama, hoje tem uma versão em javascript puro, chamada [ScrollMagic](https://github.com/janpaepke/ScrollMagic), a qual não cheguei a usar ainda, mas tem mais de 11 mil stars no GitHub.


## Intersection Observer

Seu uso é muito simples e sua API é bem pequena, que a melhor forma de descrever é com código:

{% highlight javascript %}
const iObserver = new IntersectionObserver(
  entries => {
    console.log(entries);
  }
);

const element = document.getElementById('element');

// Inicial a observação do elemento
iObserver.observe(element);

// Para de observar o elemento
// iObserver.unobserve(element);

// Desabilita a instância do IntersectionObserver
// iObserver.disconnect();
{% endhighlight %}

O primeiro parâmetro do construtor do `IntersectionObserver` é uma função que é chamada quando o elemento aparecer parcialmente e quando deixar completamente a viewport. Ela recebe o parâmetro `entries`, que é uma array de objetos `IntersectionObserverEntry`. Esse objeto contém dados atualizados para um dos elementos observados.

{% highlight javascript %}
[IntersectionObserverEntry][{
  rootBounds: {
      bottom: 920
      height: 1024
      left: 0
      right: 1024
      top: 0
      width: 920
  },
  boundingClientRect:{
    // ...
  },
  intersectionRect: {
    // ...
  }
  intersectionRatio: 0.54,
  time: 3893.92,
  target: div#element
}]
{% endhighlight %}

Caso você queira observar vários mais de um elemento, pode fazê-lo usando a mesma instância do IntersectionObserver, da seguinte forma:

{% highlight javascript %}
const home = document.getElementById('home');
const about = document.getElementById('about');
const contact = document.getElementById('contact');

iObserver.observe(home);
iObserver.observe(about);
iObserver.observe(contact);
{% endhighlight %}


## Mais opções

O IntersectionObserver tem algumas configurações que podem ser alteradas.

{% highlight javascript %}
const options = {
  /* Configuração default.  */
  root: null,
  rootMargin: "0px",
  threshold: [0],
};

const iObserver = new IntersectionObserver(
  entries => { console.log(entries); },
  options
);
{% endhighlight %}

Vamos entender melhor cada uma das opções:

{% highlight javascript %}
root: document.querySelector('#scrollArea') // Default null
{% endhighlight %}

A raiz a ser usada para intersecção, ou seja, o viewport onde você deseja observar se o elemento está visível na tela. Pode ser um elemento com rolagem ou se não for fornecido, será usado o viewport do document.

{% highlight javascript %}
rootMargin: "10px 20px" // Default "0px"
{% endhighlight %}

Funciona exatamente da mesma forma que a margin em um elemento. Se não informado, a única restrição é que para usar porcentagem, você precisa informar um elemento na configuração `root`.

{% highlight javascript %}
threshold: [0, 0.25, 0.5, 0.75, 1] // Default [0]
{% endhighlight %}

Momentos nos quais o callback será disparado, especificado como uma proporção ou lista de proporções de (área visível / área total) do elemento observado.

Todas as entradas devem estar no intervalo [0, 1]. O callback será disparado quando a proporção visível do elemento observado cruzar um limite na lista.


## Suporte dos navegadores

Caso você queira usar hoje, todos os navegadores modernos já suportam o Intersection Observer. O único ponto de cuidado, seria o Safari do iPhone, pois apenas na versão 12.2 liberada em março de 2019 que o suporte foi implementado.

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/introducao-ao-intersection-observer/intersection-observer.webp" />
    <source srcset="/assets/images/posts/introducao-ao-intersection-observer/intersection-observer.jpg" />
    <img itemprop="image" src="/assets/images/posts/introducao-ao-intersection-observer/intersection-observer.jpg" alt="Can I Use: Intersection Observer" />
  </picture>
  <legend>[Can I Use : IntersectionObserver (https://caniuse.com/#feat=intersectionobserver)]</legend>
</figure>


Mas caso precise suportar navegadores mais antigos ainda, pode colocar [um polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill).


## Conclusão

Uma API bem simples e fácil de usar para controlarmos quando um elemento está ou não visível na tela.

Seguem alguns posts relacionados com caso queira se aprofundar mais (em inglês):


- [Google Developers](https://developers.google.com/web/updates/2016/04/intersectionobserver)
- [Intersection Observer API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [CanIUse - IntersectionObserver](https://caniuse.com/#feat=intersectionobserver)


Até mais e obrigado pelos peixes!

