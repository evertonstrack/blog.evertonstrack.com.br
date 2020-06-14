---
layout: post
title:  "Drag and Drop API: Introdução"
description: "Seguindo nossa saga de Web APIs hoje vamos falar sobre uma API que nos permite implementar uma funcionalidade que é usada em muitas aplicações e interfaces web, como Trello, Google Keep, Todoist dentre outros."
date:   2020-06-13 20:00:00 -0300
bodyClass: post-javascript
tags: ['javascript', 'HTML', 'Web API']
image: /assets/images/posts/drag-and-drop-api/drag-and-drop.jpg
---

Seguindo nossa saga de Web APIs hoje vamos falar sobre uma API que nos permite implementar uma funcionalidade que é usada em muitas aplicações e interfaces web, como Trello, Google Keep, Todoist dentre outros.

Sim, estou falando da Web API do Drag and Drop, ou arrastar e soltar.

Bora ver como ela funciona?

## Drag and drop API

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/drag-and-drop-api/drag-and-drop.webp" />
    <source srcset="/assets/images/posts/drag-and-drop-api/drag-and-drop.jpg" />
    <img itemprop="image" src="/assets/images/posts/drag-and-drop-api/drag-and-drop.jpg" alt="Drag and Drop" />
  </picture>
  <legend>Drag and Drop</legend>
</figure>

A Drag and drop API nos permite implementar a funcionalidade de arrastar e soltar elementos em nossas páginas web, diretamente no nosso navegador, sem necessitar de qualquer biblioteca extra.

Os elementos não são "arrastáveis" por padrão, mas conseguimos customizar os elementos para que se tornem arrastáveis. Vamos ver como funciona?

### Como tornar um elemento arrastável?

Para tornarmos um elemento arrastável, só precisamos adicionar o atributo `draggable` com o valor `true` nele.

{% highlight html %}
<article draggable="true">
  <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
</article>
{% endhighlight %}

Assim, nosso elemento já está pronto para ser arrastado por nossa página.

## Eventos da drag and drop API

A drag and drop API tem alguns [eventos de drag](https://developer.mozilla.org/pt-BR/docs/Web/API/DragEvent){:target="_blank"}{:rel="noopener"}, esses eventos são acionados conforme fazemos as ações de selecionar e arrastar um elemento que seja arrastável, assim como quando soltamos esse elemento.

Os principais eventos do drag and drop são:

### **dragstart**

O evento é disparado quando começamos a arrastar um elemento que é arrastável. Neste evento podemos, por exemplo, adicionar uma classe css para mostrar onde este elemento que estamos arrastando pode ser solto. O event **dragstart** não é acionado quando arrastamos um arquivo do nosso sistema para o navegador.

### **drag**

O evento é disparado quando um elemento está sendo arrastado. Este evento vai ficar sendo disparado por todo o tempo que estivermos movendo, ou "segurando" o elemento.


### **dragend**

O evento é disparado quando estamos terminando a operação de arrastar. (ao soltar o botão do mouse, por exemplo).  O evento **dragend** não é acionado quando arrastamos um arquivo do nosso sistema para o navegador.

### **dragenter**

O evento é disparado quando o elemento que estamos arrastando entra em um local onde ele pode ser solto.

### **dragover**

O evento é disparado quando o elemento que estamos arrastando está em um local onde ele pode ser solto. Ele é executado a cada 100 milisegundos.

Tanto o evento `dragover` quanto o `dragenter`, são usados para indicar locais onde os itens arrastados podem ser soltos.  A maioria das áreas de uma página da web ou aplicativo não é um local válido para descartar dados. Portanto, o tratamento padrão desses eventos é não permitir uma queda.

### **dragleave**

O evento é disparado quando o elemento que estamos arrastando sai de um local onde ele pode ser solto.

### **drop**

O evento é disparado quando soltamos o elemento que estamos arrastando em um local válido.

## Contextos dos eventos

Os eventos `dragstart`, `drag` e `dragend`, são eventos do elemento que está sendo arrastado.

{% highlight javascript %}
const draggableElements = document.querySelectorAll('[draggable="true"]');

draggableElements.forEach(element => {
  element.addEventListener('dragstart', function(){ });
  element.addEventListener('drag', function(){ });
  element.addEventListener('dragend', function(){ });
});
{% endhighlight %}

Os eventos `dragenter`, `dragover`, `dragleave` e `drop`, são eventos que você usa para controlar onde você deseja soltar o elemento que você está arrastando:

{% highlight javascript %}
const dropzones = document.querySelectorAll('.dropzone');

dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragenter', function(){ });
  dropzone.addEventListener('dragover', function(){ });
  dropzone.addEventListener('dragleave', function(){ });
  dropzone.addEventListener('drop', function(){ });
});
{% endhighlight %}

## Conclusão

Essa foi uma pincelada bem rápida sobre a Web API do drag and drop, mas com esses sete eventos que vimos, conseguimos fazer tudo que precisamos. No próximo post vamos fazer algo na prática com a drag and drop API.

Você já conhecia essa web API? Já usou em algum projeto? Conta aqui embaixo sua experiência.

Alguns links de referência e documentação:

- [Drag and Drop API - MDN](https://developer.mozilla.org/pt-BR/docs/DragDrop/Drag_and_Drop){:target="_blank"}{:rel="noopener"}
- [Drag and Drop - Can I Use](https://caniuse.com/#feat=dragndrop){:target="_blank"}{:rel="noopener"}

Até mais e obrigado pelos peixes.
