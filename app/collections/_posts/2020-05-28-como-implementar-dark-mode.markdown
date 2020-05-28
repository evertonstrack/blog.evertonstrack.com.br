---
layout: post
title:  "Como implementar o dark mode"
description: "Nos últimos tempos o tema escuro, ou dark mode se transformou em uma febre, tanto que muitas empresas anunciam o suporte ao tema escuro como uma grande feature. Vamos entender como implementar facilmente no nosso site hoje mesmo."
date:   2020-05-28 13:00:00 -0300
bodyClass: post-javascript
tags: ['javascript', 'css']
image: /assets/images/posts/como-implementar-dark-mode/iphone-dark-mode.jpg
---

Nos últimos tempos o tema escuro, ou dark mode se transformou em uma febre, tanto que muitas empresas anunciam o suporte ao tema escuro como uma grande feature, pode?

Sendo ou não uma grande feature, vamos entender como implementar facilmente no nosso site hoje mesmo.

Bora?

## O que é o Dark mode?

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/como-implementar-dark-mode/iphone-dark-mode.webp" />
    <source srcset="/assets/images/posts/como-implementar-dark-mode/iphone-dark-mode.jpg" />
    <img itemprop="image" src="/assets/images/posts/como-implementar-dark-mode/iphone-dark-mode.jpg" alt="iPhone Dark mode" />
  </picture>
  <legend>iPhone Dark mode</legend>
</figure>

O **“Dark mode”**, **“Modo escuro”** ou **“Modo noturno”** , é um tema para sites, aplicativos e sistemas que inverte a paleta de cores da tela, deixando o fundo na cor preta/cinza com as letras claras.

Existem vários motivos diferentes para gostar ou não do tema escuro, alguns gostam por que fica mais agradável aos olhos, outros porque simplesmente gostam do estilo.

Também tem o fato de que o [dark mode ajuda na economia de bateria](https://www.theverge.com/2018/11/8/18076502/google-dark-mode-android-battery-life){:target="_blank"}{:rel="noopener"}, principalmente se sua tela for OLED/AMOLED.

## Implementando o dark mode

Antes de sairmos implementando, devemos entender que existem várias formas de implementar e a que vou mostrar aqui é apenas uma dessas formas, então vamos lá!

### Qual abordagem vamos usar?

A abordagem mais comum é implementarmos alterando uma classe CSS no body ou html da página, mas essa você encontra fácil “pelas internet”.

Vamos usar uma abordagem menos comum, vamos implementar com javascript usando as variáveis do CSS.

## Definindo as variáveis CSS do tema

No nosso CSS, vamos definir as [variáveis CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Using_CSS_custom_properties){:target="_blank"}{:rel="noopener"} que vamos usar no tema:

{% highlight css %}
html{
  --background: white;
  --text: black;
}
{% endhighlight %}

para este exemplo, vamos definir apenas uma variável para a cor de fundo **--background** e outra para a cor do texto **--text**.

## Implementando a troca do tema

No nosso javascript, vamos definir um objeto com as variáveis dos nossos temas, neste caso teremos apenas dois temas, o tema claro e o tema escuro:

{% highlight javascript %}
const themes = {
  light: {
    background: 'white',
    text: 'black',
  },
  dark: {
    background: 'black',
    text: 'white',
  }
};
{% endhighlight %}

Então implementamos nosso método que vai fazer a alteração entre os temas, ela vai receber uma string com o nome do tema **“light”** ou **“dark”** e vai alterar dinamicamente as variáveis que definimos no nosso CSS.

{% highlight javascript %}
function setTheme(newTheme) {
  const themeColors = themes[newTheme]; // Seleciona o tema para aplicar

  Object.keys(themeColors).map(function(key) {
    html.style.setProperty(`--${key}`, themeColors[key]); // Altera as variáveis no css
  });
}
{% endhighlight %}

Falta agora, criarmos alguma maneira de habilitarmos e desabilitarmos o dark mode e, para isso, vamos criar um checkbox para facilitar o processo.

{% highlight html %}
<input name="theme" type="checkbox" class="toggle-dark-mode" />
{% endhighlight %}

Quando ele estiver marcado, :checked, o **dark mode** está habilitado, e quando ele estiver desmarcado, o **light mode** está habilitado.

Vamos adicionar um evento para escutar quando ele for marcado, para então chamarmos nosso método **setTheme()**:

{% highlight javascript %}
const darkModeToggle = document.querySelector('input[name=theme]');
darkModeToggle.addEventListener('change', function({ target }) {
  setTheme(target.checked ? 'dark' : 'light');
});
{% endhighlight %}

E pronto, já temos a nossa troca de temas funcional. Fácil né?

### Bônus

Para incrementar ainda mais nosso projeto, vamos implementar uma forma de guardar o tema escolhido pelo usuário, e deixar ele ativo até que o usuário altere novamente.

Conseguimos fazer isso facilmente com poucas alterações no nosso código. Para isso, vamos alterar nosso método setTheme() para que ele salve o novo tema escolhido no [localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/Window.localStorage).

{% highlight javascript %}
function setTheme(newTheme) {
  const themeColors = themes[newTheme]; // Seleciona o tema para aplicar

  Object.keys(themeColors).map(function(key) {
    html.style.setProperty(`--${key}`, themeColors[key]); // Altera as variáveis no css
  });

  localStorage.setItem('theme', newTheme); //Salva o tema escolhido no localStorage
}
{% endhighlight %}

E também, ao carregar a página vamos verificar no **localStorage** se existe algum tema já salvo, e caso exista, chamamos nosso método **setTheme()** para alterar o tema:

{% highlight javascript %}
const theme = localStorage.getItem('theme');
if( theme ) {
  setTheme(theme)
}
{% endhighlight %}

E com isso temos nosso dark mode funcionando e guardando a preferência do usuário.

Bem legal né?

## Conclusão

O dark mode pode ter gerado um buzz desnecessário, mas tudo que pode agregar para o usuário, eu acho válido. Então, dark mode all the things! \o/

Você pode habilitar o dark mode aqui no site! Foi implementado exatamente como descrevi aqui. :)

Algumas referências sobre o impacto na autonomia da bateria:

- [Google confirms dark mode is a huge help for battery life on Android](https://www.theverge.com/2018/11/8/18076502/google-dark-mode-android-battery-life){:target="_blank"}{:rel="noopener"}
- [No, "AMOLED Black" Does NOT Save More Battery Than Dark Gray](https://www.xda-developers.com/amoled-black-vs-gray-dark-mode/){:target="_blank"}{:rel="noopener"}

Até mais e obrigado pelos peixes.
