---
layout: post
title:  "Seletores CSS que vão mudar sua vida (Parte 2) - :not()"
description: "Hoje vamos falar sobre a pseudo-classe :not(), é um seletor muito poderoso que pode nos ajudar a criar regras de estilização muito bacanas."
date:   2020-05-16 09:00:00 -0300
bodyClass: post-css
theme-color: "#ffdd18"
tags: ['css']
image: /assets/images/posts/seletores-css-not/css-logotipo.jpg
---


Voltando no tempo, lá em 2018 fiz a primeira versão desta série, seletores css que vão mudar sua vida, naquele momento foi a vez da [pseudo-classe :nth-child()](https://evertonstrack.dev/blog/seletores-css-nth-child/), hoje finalmente vamos dar sequência a essa série.

Hoje vamos falar sobre a pseudo-classe :not(), é um seletor bem poderoso que pode nos ajudar a criar regras de estilização muito bacanas.

Bora ver como funciona?


## O que é uma pseudo-classe?

A pseudo-classe é uma palavra adicionada aos seletores CSS que especifica um estado especial do elemento selecionado por aquele seletor.

Além de estilizar um elemento  com relação ao conteúdo da página, podemos fazê-lo com relação a fatores externos, como histórico de navegação **:visited**, ou a posição do ponteiro do mouse **:hover**

O exemplo mais conhecido provavelmente é o **:hover**, com o qual você consegue estilizar determinado elemento quando o ponteiro do mouse está sobre ele, como por exemplo, um botão


{% highlight css %}
.button {
  background-color: red:
  border: 1px solid red;
  color: white;
  transition: background-color 0.25s ease, color  0.25s ease;
}
button:hover {
  background-color: white;
  color: red;
}
{% endhighlight %}



## A pseudo-classe :not()

O **:not()** é uma pseudo-classe de negação, que recebe um seletor simples como parâmetro, e seleciona elementos que não são representados pelo seu parâmetro. O seletor passado como parâmetro, pode também incluir uma outra pseudo-classe :not() ou outra qualquer.

Por exemplo:


{% highlight css %}
p:not(.copyright) {
  font-size: 18px
}
{% endhighlight %}


O exemplo, aplica a regra de font-size a todos os elementos **<p>** que não tenham a classe .copyright.

Este é um exemplo muito simples, mas vamos fazer alguns bem mais complexos logo mais.


## Alguns exemplo úteis do uso do :not()


### Estilizando o último elemento de uma lista

Você provavelmente já deve conhecer e até mesmo utilizar o **:last-child** para estilizar o último componente de uma lista, fazendo algo assim


{% highlight css %}
li {
  border-bottom: 1px solid black;
  margin-right: 20px;
}
li:last-child{
  border-bottom-color: transparent;
  margin-right: 0;
}
{% endhighlight %}


Com o **:not() ** isso fica bem mais fácil e intuitivo:


{% highlight css %}
li:not(:last-child) {
  border-bottom: 1px solid black;
  margin-right: 20px;
}
{% endhighlight %}



### Estilizando todos os títulos, exceto 1 deles


Digamos que você quer estilizar todos os elementos com a classe **.titulo** exceto quando ele é um h1 ou um h2.



{% highlight css %}
.titulo:not(h2):not(h3) {
  color: red;
}
{% endhighlight %}


### Estilizando o último elemento de uma lista, apenas quando a lista tem mais de 1 item


{% highlight css %}
.li:last-child:not(:first-child) {
  align-self: flex-end;
}
{% endhighlight %}


Está é uma regra bem interessante quando temos listas dinâmicas.


## Combinando seletores

Ainda podemos combinar seletores formando seletores mais complexos e poderosos, como por exemplo:

**Esconder a mensagem de erro abaixo do input, caso ele não esteja vazio**

{% highlight css %}
input:not(:empty) + .message{
  display: none;
}
{% endhighlight %}

**Muda o background do segundo botão, caso o primeiro não esteja desabilitado e o segundo não tenha a classe "active"**

{% highlight css %}
button:not(:disabled) + button:not(.active) {
  background-color: red;
}
{% endhighlight %}

## Conclusão

O CSS é muito poderoso, e as pseudo-classes como o **:not()** nos ajudam a compor nossas regras de estilização de uma forma muito dinâmica. Os exemplos que apresentei são apenas algumas ideias para você iniciar, e a sua criatividade é o limite.

Caso você não tenha visto a parte 1 dessa série, o link vai estar aqui embaixo. ;)



- [Seletores CSS que vão mudar sua vida (Parte 1) - :nth-child()](https://evertonstrack.cdev/blog/seletores-css-nth-child/)
- [:not() - CSS MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/:not){:target="_blank"}{:rel="noopener"}

Qual é o seletor, pseudo-seletor, pseudo-classe que você mais gosta? Comenta aqui embaixo. :)

Até mais e obrigado pelos peixes.
