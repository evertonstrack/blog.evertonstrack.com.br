---
layout: post
title:  "Compartilhando como um aplicativo nativo com a Web Share API"
description: "Hoje vamos conhecer e entender como usar o compartilhamento nativo dos dispositivos móveis, como a Web Share API."
date:   2020-05-21 16:00:00 -0300
bodyClass: post-javascript
theme-color: "#ffdd18"
tags: ['javascript']
image: /assets/images/webp/posts/web-share-api/smartphone.jpg
---

A web segue evoluindo e nos trazendo mais funcionalidades para incrementarmos nossos sites e aplicações web. Hoje em dia, conseguimos acessar a câmera e o microfone, além de outros.

Hoje vamos conhecer e entender como usar o compartilhamento nativo dos dispositivos móveis.

Bora?


## O que é a Web Share API?

A Web share API é uma api nativa do navegador que foi introduzida inicialmente na versão 61 do Chrome para Android

Ela nos permite usar o **compartilhamento nativo do dispositivo**, sim, aquele mesmo que os aplicativos nativos dos sistemas operacionais móveis usam, ou o do Safari para desktop, para compartilhar um conteúdo diretamente de um site ou uma aplicação web.


## Por que ela é importante?

Passamos por uma fase onde tudo virava um aplicativo, mesmo coisas que seriam muito melhores e mais acessíveis se fossem um site.

Com as novas APIs que vem sendo desenvolvidas para os navegadores, podemos construir sites e aplicação web muito mais poderosas e muitas vezes com cara de aplicativos, até mesmo instalá-los, com a ajuda do service worker.


## Como usar?

Antes de adotá-la no seu projeto, existem 2 coisas importantes que você precisa notar:



- Seu site precisa estar usando HTTPS. Mas para facilitar o desenvolvimento, ela funciona com seu site rodando em localhost
- Ela só vai funcionar, se sua chamada for atrelada a uma ação do usuário, com por exemplo um **evento de clique**

Com isso em mente, vamos ao código e vamos ver como é simples implementá-la em seu projeto.


### Verificando se a API é suportada pelo seu navegador


{% highlight javascript %}
if (navigator.share) {
  //  Web Share API é suportada
} else {
  // Web Share API não é suportada e aqui você implementa o fallback
}
{% endhighlight %}


Usar a Web Share API é simples como chamar uma função **navigator.share()**, passando um objeto que contenha ao menos 1 dos seguintes campos:

- **url:** Uma string da url que você deseja compartilhar.
- **title:** Uma string com o título ao ser compartilhado, você pode usar o **document.title**
- **text:** Uma string com qualquer texto que você queira incluir

E nosso código fica assim?


{% highlight javascript %}
if (navigator.share) {
    navigator.share({
      title: 'Como usar a Web Share API',
      url: 'https://evertonstrack.com.br/'
    }).then(() => {
      console.log('Compartilhado com sucesso!');
    })
    .catch(console.error);
} else {
    // fallback
}
{% endhighlight %}


Como não podemos chamar o navigator.share() diretamente sem estar relacionado a uma ação do usuário, vamos criar um botão:


{% highlight html %}
<button class="share">Compartilhar</button>
{% endhighlight %}


E adicionar um evento de clique nele chamando uma função que faz o compartilhamento.

{% highlight javascript %}
const shareButton = document.querySelector('button.share');
shareButton.addEventListener('click', shareContent);
{% endhighlight %}


Criar nossa função e adicionar nossa lógica de compartilhamento nela;

{% highlight javascript %}
function shareContent() {
  if (navigator.share) {
    navigator.share({
      title: 'Como usar a Web Share API',
      url: 'https://evertonstrack.com.br/'
    }).then(() => {
      console.log('Compartilhado com sucesso!');
    })
    .catch(console.error);
   } else {
     // fallback
   }
}
{% endhighlight %}


E está pronto nosso compartilhamento. :)

Para testar você pode implementar por sua conta mesmo, ou **se você estiver vendo em um dispositivo móvel, clicar no botão compartilhar aqui embaixo desse post.** :)

## Conclusão

É muito bacana ver a web evoluindo mais e mais, fazendo hoje muita coisa que só era possível com um aplicativo. Ainda tem bastante para evoluir, mas seguimos nessa.

Hoje o suporte da Web Share Api é praticamente limitado ao mobile, com exceção do Safari que funciona no Desktop.

Mas como mencionei acima, podemos usar um fallback para os dispositivos e navegadores que não suportam.

- [Share like a native app with the Web Share API](https://web.dev/web-share/)
- [Web Share API - CanIUse](https://caniuse.com/#feat=web-share)

Já conhecia a Web Share API? Comenta aqui embaixo sobre a sua experiência, e compartilha! 😉

Até mais e obrigado pelos peixes.
