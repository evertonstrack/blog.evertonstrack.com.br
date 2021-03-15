---
layout: post
title: "Introdução a Web components"
description: "A plataforma web vem evoluindo, muitas tecnologias já atingiram uma grande maturidade e hoje vamos ver algumas dessa tecnologias com Web Components."
date: 2021-03-15 10:00:00 -0300
bodyClass:
tags: ['web components', 'web api']
image: "/assets/images/posts/web-components/web-components.jpg"
---

Os web components permitem a criação de elementos customizados reutilizáveis

<!-- Photo by <a href="https://unsplash.com/@pankajpatel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Pankaj Patel</a> on <a href="/s/photos/webcomponent?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> -->

A plataforma web vem evoluindo a todo vapor faz algum tempo já, muitas tecnologias vão atingindo uma maturidade bacana e começam a ser adotadas por mais e mais pessoas.

Hoje vamos falar sobre Web components, e mergulhar mais fundo no que a web tem para nos oferecer.

## O que são os Web Components?

Web components são um conjunto de três tecnologias separadas que são usadas em conjunto que permitem a criação de elementos customizados reutilizáveis.

As três tecnologias são:

1. Custom Elements
2. Shadow DOM
3. HTML Templates


### Custom elements

Um dos principais recursos dos Web components, é a capacidade de criarmos elementos personalizados onde nossa funcionalidade fica encapsulada.

Como o nome já entrega, custom elements são elementos HTML, como `<div>`, `<section>` ou `<article>`, porém são elementos que podemos nomear e que são definidos por meio de uma API do navegador.

Os custom elements contêm suas próprias semânticas, comportamentos e marcações e podem ser compartilhados entre estruturas e navegadores.

{% highlight javascript %}
class MeuComponente extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Olá Mundo!</h1>`;
  }
}

customElements.define('meu-componente', MeuComponente);
{% endhighlight %}

No exemplo acima, definimos `<meu-componente>`,  a seu próprio elemento HTML. Não parece muito útil, pois é só uma tag que renderiza um texto qualquer. Todos custom elements devem estender `HTMLElement` de alguma maneira para que possam ser registrados no navegador.

Os custom elements existem sem o uso de frameworks e os navegadores se dedicam a retrocompatibilidade da específicação, o que quase garante que os componentes que foram criados com base na especificação não sofreram de  *breaking API changes*.

Outra coisa bacana é que esses componentes geralmente [estão prontos para uso](https://custom-elements-everywhere.com/){:target="_blank"}{:rel="noopener"} com praticamente todos as libs e frameworks mais populares atualmente, como Angular, React e Vue.

### Shadow DOM

O Shadow DOM é uma versão encapsulada do DOM. Isso permite que fragmentos do DOM sejam isoladas umas das outras, incluindo qualquer coisa que possa ser usado como um seletor CSS. Com o Shadow DOM, você é capaz de isolar o CSS e JavaScript do seu web component.

Geralmente, qualquer conteúdo dentro do document é referenciado como light DOM, e qualquer conteúdo encapsulado é referenciado como shadow DOM.

Normalmente, estamos usando o light DOM e podemos selecionar um elemento simplesmente fazendo `document.querySelector('.meu-seletor')`.

Já a shadow DOM funciona semelhante a um iframe , onde o conteúdo é cortado do resto do document. No entanto, quando criamos uma raiz de sombra, ainda temos controle total sobre esse fragmento da nossa página, mas com escopo para um contexto. Isso é o que chamamos de encapsulamento.

Vamos a um exemplo:

**HTML**

{% highlight html %}
<section>
    <div id="exemplo">Meu botão com cor vermelha</div>
    <button id="botao">Meu botão que não vai ter a cor vermelha</button>
</section>
{% endhighlight %}

**Javascript**

{% highlight javascript %}
const shadowRoot = document.getElementById('example').attachShadow({ mode: 'open' });
shadowRoot.innerHTML = `<style>
    button {
      background: tomato;
      color: white;
    }
</style>
<button id="button"><slot></slot> tomato</button>`;
{% endhighlight %}

O shadow root pode incluir conteúdo do seu document, usando o elemento <slot>.  Usar um slot removerá o conteúdo do document externo e o colocará em um local determinado pela tag <slot> dentro do shadow root.

O resultado no navegador seria esse:

{% highlight html %}
<section>
  <div id="exemplo">
    <!-- Pseudo-código usado para designar um shadow root -->
    <#shadow-root>
      <style>
      button {
        background: red;
        color: white;
      }
      </style>
      <button id="botao">Meu botão com cor vermelha</button>
    </#shadow-root>
  </div>
  <button id="botao">Meu botão que não vai ter a cor vermelha</button>
</section>
{% endhighlight %}

### HTML Templates

Modelos definidos pelo usuário em HTML que não são renderizados até que sejam solicitados.

Quando precisamos reutilizar uma estrutura HTML, faz sentido ter um template para evitarmos de escrever várias vezes o mesmo código. Isso já era possível fazer antes, porém agora como o HTML template, ficou muito mais fácil.

Este elemento e seu conteúdo não são renderizados no DOM, mas ainda podem ser referenciados usando JavaScript.

Exemplo:

{% highlight html %}
<template id="users-template">
  <li><span class="name"></span> &mdash; <span class="lastname"></span></li>
</template>

<ul id="users"></ul>
{% endhighlight %}

O exemplo acima não vai renderizar nenhum conteúdo até que um javascript consuma o modelo, instancie o código e diga ao navegador o que fazer com ele.

Vamos fazer isso agora:

{% highlight javascript %}
const fragment = document.getElementById('users-template');
const users = [
  { name: 'Albert', lastname: 'Einstein' },
  { name: 'Nikola', lastname: 'Tesla' },
  { name: 'Galileu', lastname: 'Galilei' },
];

users.forEach(user => {
  // Cria uma instancia do template
  const instance = document.importNode(fragment.content, true);
  // Adiciona o conteúdo ao template
  instance.querySelector('.name').innerHTML = user.name;
  instance.querySelector('.lastname').innerHTML = user.lastname;
  // Adiciona a instancia no DOM
  document.getElementById('users').appendChild(instance);
});
{% endhighlight %}


Observe que neste exemplo criamos um modelo `<template id = "users-template">` sem qualquer outra tecnologia de Web Components, ilustrando novamente que as três tecnologias podem ser usadas de forma independente ou coletiva.


## Conclusão

Os web componets estão ai para ficar, e se você ainda não conhecia ou não havia testado e brincado com eles, eu sugiro colocar isso na sua lista de tecnologias a testar agora mesmo.

As especificações dos Web Components são um conjunto de APIs de baixo nível que continuarão a crescer e evoluir conforme nossas necessidades como desenvolvedores evoluírem.

No próximo post, vamos falar sobre uma ferramenta bem bacana que pode nos ajudar a criar web componentes reutilizáveis,  nossa própria biblioteca de componentes, ou até mesmo um Design System escalável.

### Links

Alguns links que vão te ajudar a se aprofundar no assunto:

- [Usando custom elements](https://developer.mozilla.org/pt-BR/docs/Web/Web_Components/Using_custom_elements){:target="_blank"}{:rel="noopener"}
- [Custom elements everywhere (em inglês)](https://custom-elements-everywhere.com/){:target="_blank"}{:rel="noopener"}
- [Custom elements specification (em inglês)](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements){:target="_blank"}{:rel="noopener"}
- [Shadow DOM specification (em inglês)](https://dom.spec.whatwg.org/#shadow-trees){:target="_blank"}{:rel="noopener"}
- [HTML Template specification (em inglês)](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element){:target="_blank"}{:rel="noopener"}


Até mais e obrigado pelos peixes.
