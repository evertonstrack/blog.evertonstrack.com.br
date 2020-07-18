---
layout: post
title:  "Drag and Drop API: Aprendendo na prática"
description: "Há algumas semanas, demos continuidade a nossa saga de Web APIs com a introdução a Web API do Drag and Drop, com a teoria básica sobre o assunto. Como prometi no final daquele post, hoje vamos criar algo na prática usando a Drag and Drop API."
date:   2020-07-18 16:00:00 -0300
bodyClass: post-javascript
tags: ['javascript', 'Web API']
image: /assets/images/posts/drag-and-drop-api/drag-and-drop.jpg
---


Há algumas semanas atrás, demos continuidade a nossa saga de Web APIs com a [introdução a Web API do Drag and Drop](https://evertonstrack.com.br/blog/drag-and-drop-api/), com a teoria básica sobre o assunto. Como prometi no final daquele post, hoje vamos criar algo na prática usando a Drag and Drop API.

Caso você não tenha visto o post anterior, [Drag and Drop API: Introdução, confira ele antes](https://evertonstrack.com.br/blog/drag-and-drop-api/).

Conferiu? Bora criar algum usando a Drag and Drop API?

## O que vamos criar?

Para mostrar na prática algumas das funcionalidades da Drag and Drop API, vamos criar um quadro kanban, bem simples, mas que vai nos permitir explorar os principais eventos desta Web API.

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/drag-and-drop-api/drag-and-drop-quadro-kanban.webp" />
    <source srcset="/assets/images/posts/drag-and-drop-api/drag-and-drop-quadro-kanban.jpg" />
    <img itemprop="image" src="/assets/images/posts/drag-and-drop-api/drag-and-drop-quadro-kanban.jpg" alt="Drag and Drop" />
  </picture>
  <legend>Quadro kanban feito com a Drag and Drop API</legend>
</figure>


### O que é um quadro kanban?

Um Quadro Kanban é uma ferramenta para visualização usada na gestão de projetos. Originalmente construído usando um quadro em branco, ele é dividido em colunas, onde  cada coluna representa uma etapa do fluxo de trabalho.

### Criando a estrutura

Para iniciar, vamos criar alguns arquivos: `index.html` , `style.css` e `script.js` . O mais importante deles e o que vamos trabalhar é o `script.js` , o HTML e o CSS você pode copiar abaixo para facilitar a construção e focarmos no mais importante neste momento.

**HTML**

Um HTML básico, com uma section e 3 colunas.

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Drag and Drop</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
  <section class="board">
    <div class="list">
      <h2>TODO</h2>
      <div class="list__content">
        <article class="card" draggable="true">
          <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
        </article>
      </div>
    </div>
    <div class="list">
      <h2>Doing</h2>
      <div class="list__content">
        <article class="card" draggable="true">
          <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
        </article>
        <article class="card" draggable="true">
          <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
        </article>
      </div>
    </div>
    <div class="list">
      <h2>DONE</h2>
      <div class="list__content">
        <article class="card" draggable="true">
          <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
        </article>
      </div>
    </div>
  </section>
  <script src="script.js"></script>
</body>
</html>
{% endhighlight %}

**CSS**

Estilo básico para o quadro kanban. Você pode incrementar como achar melhor. :)

{% highlight css %}
.board {
  display: flex;
  justify-content: space-between;
  background-color: #efefef;
  border-radius: 10px;
  padding: 20px;
}

.list {
  width: 30%;
  display: flex;
  flex-direction: column;
}

.card,
.list__content {
  border-radius: 10px;
  padding: 20px;
  transition: 400ms;
}

.list__content {
  background-color: #FFF;
  flex: 1;
}

.list__content.highlight {
  background-color: #22222211;
}

.list__content.over {
  background-color: rgba(0, 128, 0, 0.2);
}

.card {
  background-color: #BBB;
  margin-bottom: 20px;
}

.card.dragging {
  opacity: 0.3;
}

.card  h3{
  margin: 0;
}
{% endhighlight %}

**Javascript**

No nosso javascript vamos começar apenas selecionando os elementos que nos interessam para adicionarmos os eventos: os cards e as listagens.

{% highlight javascript %}
const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list__content');
{% endhighlight %}

### Eventos dos cards

Os cards serão os elementos que serão arrastáveis, definimos isso no momento que colocamos o atributo `draggable="true"` nestes elementos.

{% highlight html %}
<article class="card" draggable="true">
  <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
</article>
{% endhighlight %}

Nos cards, vamos adicionar as escutas dos eventos: `dragstart` e `dragend`.

{% highlight javascript %}
cards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
});
{% endhighlight %}

Para facilitar a visualização e a legibilidade, vamos criar os métodos com os mesmos nomes de cada um dos eventos.

{% highlight javascript %}
function dragstart() { }
function dragend() { }
{% endhighlight %}

### Eventos nas listagens

As listagens, são os elementos onde queremos poder soltar os cards que estamos arrastando. Nestas listagens vamos adicionar as escutas dos eventos: `dragover` e `dragleave`.

{% highlight javascript %}
lists.forEach( list => {
  list.addEventListener('dragover', dragover);
  list.addEventListener('dragleave', dragleave);
  list.addEventListener('drop', drop);
});
{% endhighlight %}

Da mesma maneira que fizemos com os cards, vamos criar os métodos com os mesmos nomes de cada um dos evento.

{% highlight javascript %}
function dragover() { }
function dragleave() { }
function drop() { }
{% endhighlight %}

### Implementando a funcionalidade

Agora que temos a base pronta e os métodos que vamos usar já criados, vamos para a implementação.

**Dragstart**

O primeiro método que vamos implementar será o `dragstart` , pois é o evento `dragstart` que  é disparado quando começamos a arrastar um elemento que é arrastável.

Quando começarmos a arrastar um card, queremos saber 2 coisas:

- Qual card estamos arrastando
- Onde podemos soltar este card

Para isso, vamos adicionar um classe css nas listagens, que são os locais onde podemos soltar os cards e adicionar uma classe no card que estamos arrastando, para saber qual card estamos arrastando no momento.

{% highlight javascript %}
function dragstart() {
  lists.forEach(list => list.classList.add('highlight'));
  this.classList.add('dragging');
}
{% endhighlight %}

Neste caso, como passamos apenas a função como parâmetro no `addEventListener` o nosso `this` aqui, é o card no qual adicionamos esse evento.

**Dragend**

O evento `dragend` é disparado quando estamos terminando a operação de arrastar -- _ao soltar o botão do mouse, por exemplo_. Neste momento, queremos remover a classe css que adicionamos nas listagens e também no card, pois elas não são mais necessárias.

{% highlight javascript %}
function dragend() {
  lists.forEach(list => list.classList.remove('highlight'));
  this.classList.remove('dragging');
}
{% endhighlight %}

Assim como no caso anterior, como passamos apenas a função como parâmetro no `addEventListener` o nosso `this` aqui, é o card no qual adicionamos esse evento.

**Dragover**

O evento `dragover`, é disparado quando o elemento que estamos arrastando está em um local onde ele pode ser solto, implementaremos a funcionalidade de mover o card para esta lista e também colocaremos uma classe css para sinalizar que estamos sobre um local que podemos soltar o card.

{% highlight javascript %}
function dragover() {
  this.classList.add('over');
  const cardBeingDragged = document.querySelector('.dragging');
  this.appendChild(cardBeingDragged);
}
{% endhighlight %}

**Dragleave e Drop**

Para completarmos a funcionalidade básica do nosso quadro kanban, no evento `dragleave`, que é disparado quando o elemento que estamos arrastando sai de um local onde ele pode ser solto e no evento `drop`, vamos apenas remover a classe que colocamos para sinalizar que este local era um local onde o card poderia ser solto.

{% highlight javascript %}
function dragleave() {
  this.classList.remove('over');
}

function drop() {
  this.classList.remove('over');
}
{% endhighlight %}

Pronto, com isso temos o nosso quadro kanban funcionando e aplicamos os principais conhecimentos que vimos da Web API do Drag and Drop.

Você pode conferir o código fonte final no [repositório do GitHub](https://github.com/evertonstrack/quadro-kanban){:target="_blank"}{:rel="noopener"} e testar o quadro funcionando [neste link](https://quadro-kanban.netlify.app/){:target="_blank"}{:rel="noopener"}.

## Conclusão

A web tem evoluído muito nos últimos tempos e dado mais poder aos desenvolvedores para construir aplicações cada vez mais poderosas. O que vimos aqui hoje é o básico da Web API do Drag and Drop, mas já conseguimos criar a funcionalidade principal de um quadro kanban.

Você pode usar outras funcionalidades web para evoluir esse quadro e deixá-lo mais poderoso, como por exemplo, transformando ele em um [Progressive Web App (PWA)](https://evertonstrack.com.br/blog/como-transformar-seu-site-em-um-progressive-web-app/), ou implementar para que a usabilidade fique melhor na versão mobile, são muitas possibilidades!

Caso você não tenha visto o post anterior, Drag and Drop API: Introdução, é só acessar o link abaixo.

- [Drag and Drop API: Introdução](https://evertonstrack.com.br/blog/drag-and-drop-api/)

Até mais e obrigado pelos peixes.
