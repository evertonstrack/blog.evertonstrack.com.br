---
layout: post
title: "App Shortcuts: Atalhos de aplicativos para sua Progressive Web App"
description: "Os atalhos de aplicativos fornecem acesso rápido a várias ações comuns que os usuários precisam com frequência."
date: 2020-07-21 15:46:36 -0300
bodyClass:
tags: ['javascript', 'pwa', 'progressive web app']
image: "/assets/images/posts/app-shortcuts/app-shortcuts-windows.jpg"
---

Frequentemente falamos sobre como a web está evoluido e estreitando as linhas entre sites e aplicativos.

Hoje vamos falar sobre uma funcionalidade bem simples mas que traz nossos web apps para mais próximos dos aplicativos.

Bora?

## Atalhos de aplicativos

Os atalhos de aplicativos, ou app shortcuts, são atalhos que ajudam o usuário a fazer ações rápidas. 

Nos dispositivos móveis, geralmente eles aparecem quando você pressiona o ícone do aplicativo por mais tempo, o famoso "long press".

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/app-shortcuts/app-shortcuts-android-v2.webp" />
    <source srcset="/assets/images/posts/app-shortcuts/app-shortcuts-android-v2.jpg" />
    <img itemprop="image" src="/assets/images/posts/app-shortcuts/app-shortcuts-android-v2.jpg" alt="Atalhos de aplicativos no Android" />
  </picture>
  <legend>Atalhos de aplicativos no Android</legend>
</figure>

Já no desktop, os atalhos aparecem quando você clica com o botão direito do mouse sobre o link de uma aplicativo na barra de tarefas.

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/app-shortcuts/app-shortcuts-windows.webp" />
    <source srcset="/assets/images/posts/app-shortcuts/app-shortcuts-windows.jpg" />
    <img itemprop="image" src="/assets/images/posts/app-shortcuts/app-shortcuts-windows.jpg" alt="Atalhos de aplicativos na barra de tarefas do Windows" />
  </picture>
  <legend>na barra de tarefas do Windows</legend>
</figure>

O menu dos atalhos de aplicativos só vão aparecer para [Progressive Web Apps](https://evertonstrack.com.br/como-transformar-seu-site-em-um-progressive-web-app/) que o usuário instalou em seu dispositivo.

Os atalhos representam ações que o usuário possa querer fazer, e estão associadas a uma url na sua aplicação.

Alguns exemplos de atalhos:

- Links do menu principal (exemplo: home, sobre)
- Funcionalidade de pesquisar

## Definindo os atalhos de aplicativos

Os atalhos de aplcativos são definido no `manifest`, que é um arquivo que diz para seu navegador informações sobre a sua [Progressive Web Apps](https://evertonstrack.com.br/como-transformar-seu-site-em-um-progressive-web-app/) e como ela deve se comportar quando for instalada.

Para declarar o nosso atalho, incluímos no nosso `manifest` o seguinte código:

{% highlight json %}
"shortcuts": [
  {
    "name": "Sobre Everton Strack",
    "short_name": "Sobre",
    "description": "Mais sobre Everton Strack, Desenvolvedor Front-end, aspirante a Ux/UI Designer e Co-Fundador da UFA!.",
    "url": "/sobre",
    "icons": [
      { 
        "src": "/assets/images/favicons/favicon-192x192.png", 
        "sizes": "192x192" 
      }
    ]
  }
]
{% endhighlight %}

**name**

O label do seu atalho, esse é o texto que vai aparecer para o usuário.

**short_name (opcional)**

O texto que vai aparecer caso seu `name` seja muito extenso. Mesmo sendo uma propriedade opicional, é recomendado que você preencha.

**description (opcional)**

A descrição de qual o objetivo do seu atalho do aplicativo. Não é usado no momento, mas pode ser exposto a tecnologia de assistência no futuro.

**url**

A URL que será acionada quando o usuário clicar no atalho do aplicativo. 

**icons**

Uma array com os ícones, incluíndo o `src` da imagem e `sizes` com o tamanho. No momento SGVs não são suportados, portanto, use ícones em PNG.

## Testando os atalhos de aplicativos

Para testar se os atalhos foram configurados corretamente, é só acessar a aba "Aplication" no Chrome Dev Tools, e clicar em **Manifest**.

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/app-shortcuts/app-shortcuts-no-chrome-devtools.webp" />
    <source srcset="/assets/images/posts/app-shortcuts/app-shortcuts-no-chrome-devtools.jpg" />
    <img itemprop="image" src="/assets/images/posts/app-shortcuts/app-shortcuts-no-chrome-devtools.jpg" alt="Atalhos de aplicativos no Google Chrome Dev Tools" />
  </picture>
  <legend>Atalhos de aplicativos no Google Chrome Dev Tools</legend>
</figure>

> _O DevTools suporta os atalhos de aplicativos a partir da versão 84 de Google Chorme e 84 do Microsoft Edge._

## Compatibilidade

Os atalhos de aplicativos estão disponíveis para Android, a partir da versão 84 do Google Chrome e para Windows a partir vas versões 85 do Chrome e do Edge.

No Windows você pode testar habilitando a flag:

{% highlight bash %}
chrome://flags/#enable-desktop-pwas-app-icon-shortcuts-menu
{% endhighlight %}

No Android, aparentemente não está funcionando ainda, mesmo na versão 84 do Chrome, pode ser porque as atualizações do Progressive Web App são limitadas uma vez ao dia. Você pode encontrar mais detalhes [neste artigo](https://developers.google.com/web/fundamentals/integration/webapks#update-webapk){:target="_blank"}{:rel="noopener"}. Você pode testar no Chrome Dev que funciona normalmente.


## Conclusão

Uma funcionalidade simples, porém que nos mostra que as progressive web apps tem evoluído cada vez mais melhorando bastante a usabilidade para nossos usuários.

Algumas indicações de links interessantes de hoje:

- [Get things done quickly with app shortcuts](https://web.dev/app-shortcuts/){:target="_blank"}{:rel="noopener"}
- [Web app manifest](https://web.dev/add-manifest/){:target="_blank"}{:rel="noopener"}
- [Updating the WebAPK](https://developers.google.com/web/fundamentals/integration/webapks#update-webapk){:target="_blank"}{:rel="noopener"}
- [Progressive Web Apps](https://evertonstrack.com.br/como-transformar-seu-site-em-um-progressive-web-app/)

Até mais e obrigado pelos peixes.