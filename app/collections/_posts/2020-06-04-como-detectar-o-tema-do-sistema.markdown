---
layout: post
title:  "Dark Mode: Como detectar o tema do sistema"
description: "Já que o dark mode chegou para ficar, e se pudéssemos fazer nosso site usar o tema que o usuário selecionou no dispositivo que está usando? É exatamente isso que vamos ver hoje."
date:   2020-06-04 15:00:00 -0300
bodyClass: post-javascript
tags: ['javascript', 'css']
image: /assets/images/posts/como-detectar-o-tema-do-usuario/iphone-dark-mode.jpg
---

O dark mode realmente chegou para ficar, no post da semana passada, aprendemos [como implementar o dark mode](https://evertonstrack.com.br/blog/como-implementar-dark-mode/) no nosso site usando javascript e variáveis do CSS.

E se pudéssemos fazer nosso site usar o tema que o usuário selecionou no dispositivo que está usando? É exatamente isso que vamos ver hoje.

Bora entender como fazer isso?

## Prefers color scheme

O `prefers-color-scheme` é uma [CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features){:target="_blank"}{:rel="noopener"}, ou seja, são características do user-agent do usuário, no caso, o navegador. Ele tem informações como a orientação, o tamanho do dispositivo — *que usamos geralmente na meta viewport no head da nossa página para setarmos o tamanho da viewport —*  e o que nos interessa aqui, o `prefers-color-scheme` , que detecta se o usuário está usando o tema claro ou escuro.

## Detectando o tema

Para detectar o tema do sistema vamos usar o método `matchMedia()`, do nosso conhecido objeto `window`.  passando como parâmetro a media query string que queremos, no nosso caso, vamos usar o `prefers-color-scheme`.

A implementação fica assim:

{% highlight javascript %}
window.matchMedia('(prefers-color-scheme: dark)');
{% endhighlight %}

Essa chamada vai nos retornar um objeto do tipo `MediaQueryList` com os seguintes atributos:

{% highlight javascript %}
{
  media: "(prefers-color-scheme: dark)",
  matches: false,
  onchange: null
}
{% endhighlight %}

Para nós, o que importa aqui é o matches, então para sabermos o tema dos sistema que o usuário está usando, é só testarmos essa propriedade:

{% highlight javascript %}
const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

if( prefersColorScheme.matches ) {
  // O tema é o dark
} else {
  // O tema é o light
}
{% endhighlight %}

Bem fácil, não?

## Alterando o tema automaticamente conforme o usuário altera

Para melhorarmos ainda mais nossa implementação, deixarmos mais robusta e completa, podemos ainda alterar o tema do site conforme o usuário muda o tema no sistema dele.

{% highlight javascript %}
prefersColorScheme.addListener(function(event) {
  if( event.matches ) {
    // O tema é o dark
  } else {
    // O tema é o light
  }
});
{% endhighlight %}

Assim, toda vez que o tema do sistema for alterado, o tema no nosso site será alterado também, seguindo o estilo de cores que você definir no seu tema.

### Melhorando nossa implementação

Se você notar, o código que testa qual é o tema ficou repetido, e geralmente quando temos código repetido, é por que deveríamos isolar o código em um outro método.

Então, vamos criar um método que vai testar o tema e outro que vai aplicá-lo. Nossa implementação final vai ficar assim:

{% highlight javascript %}
const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Altera o tema
function changeTheme(event) {
  if( event.matches ) {
    // O tema é o dark
  } else {
    // O tema é o light
  }
}

// Escuta a mudança de tema no sistema
prefersColorScheme.addListener(changeTheme);

// Altera o tema conforme o tema do usuário
changeTheme(prefersColorScheme);
{% endhighlight %}

## Conclusão

A web é livre e acessível — não tão acessível quando falamos de acesso a internet — mas sim comparada com os aplicativos. Quando implementamos funcionalidades que fazem com que nossos sites sejam mais integrados com os sistemas nos quais eles rodam, estreita mais ainda as linhas entre sites e aplicativos, como já falamos um pouco aqui.

Agora você pode [implementar o dark mode](https://evertonstrack.com.br/blog/como-implementar-dark-mode/) e ainda deixar seu site usar o tema que o seu usuário gosta e está acostumado, não é demais?

### Links
Aqui alguns links com documentações de algumas coisas que falamos aqui, e o post anterior também:

- [CSS Media Features - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features){:target="_blank"}{:rel="noopener"}
- [Prefers color scheme - MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/@media/prefers-color-scheme){:target="_blank"}{:rel="noopener"}
- [Window.matchMedia() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia){:target="_blank"}{:rel="noopener"}
- [MediaQueryList](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList){:target="_blank"}{:rel="noopener"}
- [Como implementar o Dark mode](https://evertonstrack.com.br/blog/como-implementar-dark-mode/)

Até mais e obrigado pelos peixes.
