---
layout: post
title:  "Lazy loading nativo na web"
description: "Com a atualização do Google Chrome para a versão 76, foi lançada a funcionalidade de lazy load nativo, que já havia sido anunciada em abril, agora está na versão estável e sem precisar alterar nenhuma flag."
date:   2019-08-31 10:00:00 -0300
bodyClass: post-javascript
tags: ['javascript']
image: /assets/images/posts/lazy-loading-nativo/lazy-loading.jpg
---

Por mais que pareça, esse não é um título sensacionalista. Com a atualização do Google Chrome para a versão 76, foi lançada a funcionalidade de lazy load nativo, que já havia sido [anunciada em abril](https://addyosmani.com/blog/lazy-loading/){:target="_blank"}{:rel="noopener"}, agora está na versão estável e sem precisar alterar nenhuma flag.

Para quem trabalha com web e se preocupa com performance — primeiro, se você não se preocupa com performance, quem é você? De onde veio? E onde você estava nos últimos 10 anos? — sabe que as imagens sempre foram um dos grandes [calcanhares de áquiles](https://pt.wikipedia.org/wiki/Calcanhar_de_Aquiles){:target="_blank"}{:rel="noopener"} em questão de performance nas aplicações web, talvez hoje o javascript seja o maior, mas isso é assunto para outro momento.

Nossas páginas web geralmente contêm um grande número de imagens, o que contribui para deixar o carregamento da página mais lento. Grande parte dessas imagens estão fora da área visível do usuário e só serão vistas por ele, quando ele rolar a página.


<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/lazy-loading-nativo/lazy-loading.webp" />
    <source srcset="/assets/images/posts/lazy-loading-nativo/lazy-loading.jpg" />
    <img itemprop="image" src="/assets/images/posts/lazy-loading-nativo/lazy-loading.jpg" alt="Comparação de caregamento de imagens com e sem Lazy Loading" />
  </picture>
  <legend>[A page loading 211 images. The version without lazy-loading fetches 10MB of image data. The lazy-loading version (using LazySizes) loads only 250KB upfront - other images are fetched as the user scrolls through the experience. (Image from https://addyosmani.com/]</legend>
</figure>


Como podemos melhorar a performance dos nossos projetos com o lazy load?


## O que é Lazy Load?

O termo lazy load — carregamento preguiçoso — é uma técnica de otimização de performance que nos permite carregar determinadas sessões de conteúdo das nossas páginas web/mobile sob demanda, ao invés de carregar sempre todo o conteúdo.

Conforme o usuário vai rolando a página, o conteúdo vai sendo carregado sob demanda, geralmente antes de ele entrar na área visível do usuário. Isso gera uma grande melhoria de performance em nossas aplicações.

Apesar desta técnica poder ser usada para outros tipos de conteúdo, como sessões inteiras, o seu principal uso é em imagens e iframes.

Carregar imagens não críticas abaixo da dobra — A parte de um website que fica visível após a rolagem para baixo. —  apenas quando estiver viśivel para o usuário melhora o tempo de carregamento da página além de minimizar a largura de banda do usuário e reduzir o uso de memória.


> Carregar apenas imagens não críticas abaixo da dobra apenas quando estiver viśivel para o usuário melhora o tempo de carregamento da página.



## Como implementar o Lazy Load?

Até então, sempre precisávamos de bibliotecas javascript para implementar o lazy load. A partir da versão 76 do Google Chrome, você não precisa mais de bibliotecas para usar.

O atributo **loading** dá a instrução para o navegador atrasar o carregamento das imagens e iframes fora da área visível da tela, até que o usuário role a página até próximo delas ficarem visíveis.

O atributo loading suporta 3 valores diferentes:  **lazy**, **eager** e **auto**. Quando não especificado a atributo, terá o mesmo impacto da configuração **auto**.

**Exemplos:**

{% highlight html %}
<img src="dog.jpg" loading="lazy" alt=".."/>
{% endhighlight %}


A imagem é carregada somente quando o usuário rolar a página para próximo dela.

{% highlight html %}
<img src="dog.jpg" loading="eager" alt=".."/>
{% endhighlight %}


Carrega a imagem imediatamente.

{% highlight html %}
<img src="dog.jpg" loading="auto" alt=".."/>
{% endhighlight %}


O navegador determina se deve ser carregado imediatamente ou não.

Outro ponto importante é que o atributo loading para as tags img e iframe está sendo trabalhado como parte do [padrão do HTML](https://github.com/whatwg/html/pull/3752){:target="_blank"}{:rel="noopener"}.


## Como usar?

Para usar só no Chorme 76+, a única coisa que você precisa fazer é colocar o atribulo loading e tudo vai funcionar mágicamente.


{% highlight html %}
<img src="dog.jpg" loading="lazy" alt=".."/>
{% endhighlight %}


**Mas eu preciso dar suporte para outros navegadores, e para outras versões mais do Chrome, então como eu faço?**

Vou te mostrar uma forma bem simples de deixar seu código pronto para usar o lazy load nativo, caso o navegador tenha suporte e caso contrário, carregar uma biblioteca como fallback para os demais navegadores.

### Detectando se o navegador tem suporte ao atributo loading

{% highlight javascript %}
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports `loading`..
} else {
    // Fetch and apply a polyfill/JavaScript library
    // for lazy-loading instead.
}
{% endhighlight %}


### Implementando o lazy load de imagens cross-browser

Para implementação cross-browser, você declara as suas imagens com o caminho da imagem no atributo **data-src** ao invés de como faria normalmente, no atributo **src,** para evitar que os navegadores que não suportam o atributo **loading** carreguem as imagens instantaneamente.  E com algumas linhas de javascript e o uso de da biblioteca [LazySizes](https://github.com/aFarkas/lazysizes){:target="_blank"}{:rel="noopener"} implementamos o lazyload cross-browser de forma  bem simples.

**HTML com as imagens:**

{% highlight html %}
<!-- Carrega normalmente a imagem -->
<img src="dog.jpg" alt="Foto de um cachorro"/>

<!-- Carrega as imagens com lazyload -->
<img data-src="cat.jpg" loading="lazy" alt=".." class="lazyload"/>
<img data-src="dogs.jpg" loading="lazy" alt=".." class="lazyload"/>
{% endhighlight %}


**Javascript com a implementação:**

{% highlight javascript %}
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img.lazyload");
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
  // Importamos dinamicamente a biblioteca LazySizes
  let script = document.createElement("script");
  script.async = true;
  script.src = "/lazysizes.min.js";
  document.body.appendChild(script);
}
{% endhighlight %}



## Conclusão

A implementação do atributo loading pelo Google Chrome, que é o navegador mais usado é um passo muito importante para a web, no caminho de uma web melhor e mais rápida.

No início do post eu brinquei com o fato de alguns desenvolvedores não darem a devida atenção a performance, e gostaria de terminar lembrando que hoje a grande maioria dos acessos é feita através de dispositivos móveis.

Os dispositivos móveis ajudaram muita gente a ter acesso, antes quase impossível em virtude do preço dos computadores. Mas lembre-se que eles ainda precisam pagar a internet móvel, e para grande parte da população, não é nem um pouco barata.

Vamos nos preocupar com performance sim e tornar a web mais acessível ainda.

Caso queira saber mais sobre o lazy load-loading, recomendo esses dois posts:

- [Native image lazy-loading by Addy Osmani](https://addyosmani.com/blog/lazy-loading/){:target="_blank"}{:rel="noopener"}
- [Hybrid Lazy Loading: A Progressive Migration To Native Lazy Loading](https://www.smashingmagazine.com/2019/05/hybrid-lazy-loading-progressive-migration-native/){:target="_blank"}{:rel="noopener"}


Até mais e obrigado pelos peixes!
