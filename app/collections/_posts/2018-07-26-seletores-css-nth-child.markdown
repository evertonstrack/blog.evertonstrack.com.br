---
layout: post
title:  "Seletores CSS que vão mudar sua vida (Parte 1) - :nth-child()"
description: "Conheça um seletor CSS que é uma mão na roda. É um dos seletores mais versáteis, que facilitam muito nossa vida. Estou falando do pseudo seletor :nth-child()"
date:   2018-07-26 21:58:09 -0300
bodyClass: post-css
tags: ['css']
image: /assets/images/posts/seletores-css-nth-child/pseudo-seletor-nth-child.jpg
---

Quem trabalha com front-end há algum tempo, sabe a mágica que pode-se fazer com CSS. Como por exemplo, pinturas incríveis como [esta aqui](https://github.com/cyanharlow/purecss-zigario){:target="_blank"}{:rel="noopener"}. Como eu sempre digo, **CSS é magia negra**.

Mas hoje vamos abordar coisas bem mais simples, porém muito úteis para o dia-a-dia, vamos ver alguns seletores CSS que são uma mão na roda, e um dos seletores mais versáteis, que facilitam muito nosso trabalho.

Vamos abordar alguns seletores CSS que podem facilitar muito nosso dia-a-dia.

> **TL;DR:** Para alguns, provavelmente seja algo usado diariamente, mas para muita gente, principalmente para quem está iniciando na área, pode ter certeza que vai ajudar bastante.


## :nth-child

Esse carinha é muito útil, principalmente quando trabalhamos com listas; Podemos aplicar estilos a itens específicos facilmente, fazer as clássicas “listras zebra” (alternando as cores de linha para linha), remover/adicionar `margin` ou `padding` no último item, e tudo mais que você conseguir imaginar.

Mas sua utilidade pode ir muito além disso. Vamos ver alguns exemplos:

**Selecionar um item da lista**

Aplicar um background diferenciado ao 4 elemento de uma lista:

{% highlight css %}
li:nth-child(4) {
    background-color: blue;
}
{% endhighlight %}

**Selecionar apenas os itens pares ou ímpares**

Seleciona apenas os itens ímpares.

{% highlight css %}
li:nth-child(odd) {
    background-color: blue;
}
{% endhighlight %}

Seleciona apenas os itens pares.

{% highlight css %}
li:nth-child(even) {
    background-color: blue;
}
{% endhighlight %}


**Selecionar elementos múltiplos de 3**

{% highlight css %}
li:nth-child(3n+3){
    background-color: blue;
}
{% endhighlight %}

Pode ser muito útil quando precisamos remover a margin do último (ou primeiro) item de cada linha da lista.

**Selecionar os primeiros 2 itens de uma lista**

Esse é bem bacana para quando precisamos destacar alguns elementos da lista. Imagine o cenário onde temos uma listagem, e os 2 primeiros itens devem ser destaques, com  tamanhos e/ou cores diferenciadas.

{% highlight css %}
li {
    width: 33.33%;
    background-color: gray;
}
li:nth-child(-n+2){
    width: 50%;
    background-color: blue;
}
{% endhighlight %}

Também podemos usar a lógica inversa, e selecionar todos os elementos, com exceção dos 2 primeiros.

{% highlight css %}
li:nth-child(n+2){
    background-color: gray;
}
{% endhighlight %}

**Selecionar o último item da lista**

Seleciona sempre o último item da lista, independente do número de itens que ela contenha.

{% highlight css %}
li:last-child {
    background-color: blue;
}
{% endhighlight %}

**Selecionar o penúltimo elemento da lista**

No exemplo abaixo, selecionou o 4º item, pois havia 5 na lista, mas se existissem 10, ele selecionaria o 9º item.

{% highlight css %}
li:nth-last-child(2) {
    background-color: blue;
}
{% endhighlight %}

O `:nth-child` é um seletor que eu gosto bastante, pois ele facilita muito a vida e ainda ajuda a escrever menos regras e ter o mesmo resultado.

Quer fazer uns testes rápidos, [aqui](https://css-tricks.com/examples/nth-child-tester/){:target="_blank"}{:rel="noopener"} consegue testar esses seletores e ver o resultado na hora.

Então, bora aplicar esses seletores no próximo projeto?

Até mais e obrigado pelos peixes.
