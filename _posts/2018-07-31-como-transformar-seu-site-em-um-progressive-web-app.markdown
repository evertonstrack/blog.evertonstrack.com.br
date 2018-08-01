---
layout: post
title:  "Progressive Web Apps (PWA): O que são? E como transformar seu site em um hoje mesmo"
description: "Como transformar seu site em um Progressive Web App. Vamos dar uma olhada nos três principais passos necessários para transformarmos nosso site em um PWA."
date:   2018-07-31 19:00:00 -0300
bodyClass: post-javascript
theme-color: "#f0db4f"
tags: ['javascript', 'pwa']
image: /assets/images/posts/como-transformar-seu-site-em-um-progressive-web-app/pwa-progressive-web-app.jpg
---

Com a evolução da tecnologia dos navegadores, puxado principalmente pelo Google Chrome, que domina com muita folga a já vencida “guerra dos navegadores”, nos dias de hoje temos tecnologias que dão mais poder para as páginas na web. 

Os PWAs, ou Progressive Web Apps, usam essas tecnologias para levar uma experiência antes vista só em aplicativos para seu web site. 

Transformar um site simples em um PWA não é tão difícil e os benefícios são bem visíveis. Então, vamos dar uma olhada nos três principais passos necessários para transformarmos nosso site em um PWA.


> **TL;DR;**  Neste post vamos abordar sobre o que são Progressive Web Apps e como transformar nosso site em um.


## O que é um Progressive Web App?

![Progressive Web Apps (PWA): O que são? E como transformar seu site em um hoje mesmo](/assets/images/posts/como-transformar-seu-site-em-um-progressive-web-app/pwa-progressive-web-app.jpg)

PWA, ou Progressive Web App são sites que se comportam como apps, que se traduzem em experiências que combinam o melhor da Web e o melhor dos aplicativos. 

Algumas das principais características dos Progressive Web App são:


**Progressivo**: Funciona para qualquer usuário, independentemente do navegador escolhido, pois é criado com aprimoramento progressivo como princípio fundamental.

**Responsivo**: Se adapta a qualquer formato: desktop, celular, tablet ou o que for inventado a seguir.

**Independente de conectividade**: Funciona off-line ou em redes de baixa qualidade graças ao service workers.

**Semelhante a aplicativos**: Parece com aplicativos para os usuários, inclusive pode ser instalado com um app em suas telas iniciais sem precisar acessar uma loja de aplicativos.

**Atualizado**: Sempre atualizado, mais uma vez, graças ao service worker.

**Seguro**: Fornecido via HTTPS.


## O que preciso fazer?

No geral, são 3 pilares bem simples. O manifest, o HTTPS e o service worker.


### 1. O manifest

O manifest é um arquivo JSON, que descreve todos os dados do seu PWA: informações como nome, idioma, icones, etc. Todas as informações que os navegadores precisam, para que quando você salve ele como um atalho, ele saiba quais informações exibir.

O seu `manifest.json` tem como padrão os itens abaixo:

{% highlight json %}
{
  "name": "Exemplo de site e blog",
  "short_name": "Exemplo Blog",
  "icons": [{
    "src": "images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
{% endhighlight %}


Salve o arquivo com `manifest.json` na raiz do seu site, e adicione a chamada para ele no `<head>` do seu site:

{% highlight html %}
<link rel="manifest" href="/manifest.json">
{% endhighlight %}


### 2. Seu site precisa ter HTTPS

Os Progressive Web Apps precisam de uma conexão segura, portanto, o protocolo HTTPS é necessário. Se você ainda não usar HTTPS no seu site, sugiro que pare tudo que estiver fazendo e faço isso o quanto antes. 

O Google já anunciou mudanças no algorítimo de busca, para beneficiar sites que usam HTTPS e também o Google Chorme passou a marcar como não seguros os sites que ainda usam HTTP.

Não está convencido? [veja alguns motivos de por que usar HTTPS](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https?hl=pt-br){:target="_blank"}.

**Como migrar para HTTPS?**

Para mudar para HTTPS, você precisará de um certificado SSL. A forma para obtê-lo, depende da sua hospedagem, mas geralmente há duas maneiras comuns de fazê-lo:


- Se você gerencia o seu servidor ou tem acesso root a ele, confira o [LetsEncrypt](https://letsencrypt.org/){:target="_blank"}, a forma mais fácil e rápido de migrar para HTTPS.
- Caso não tenha acesso root, você pode criar uma conta no CloudFlare e usar o certificado SSL grátis.
- Caso seu site seja estático, ou com geradores de blogs e sites estáticos, pode hospedá-lo no Netlify ou no GitHub pages. O aqui tem [um post bem bacana sobre o assunto](https://willianjusten.com.br/como-colocar-seu-site-no-ar-de-graca/){:target="_blank"}.
- Caso nenhuma das opções acima sejam viáveis, e você estiver em hospedagem compartilhada, verifique com sua hospedagem se possuem SSL grátis. Algumas hospedagens, geralmente oferecem certificados SSL por uma taxa mensal ou anual. Se você não souber como obter um certificado, entre em contato com seu provedor de hospedagem.

### 3. O Service Worker

Basicamente, o Service Worker é um [Javascript Web Worker](https://www.html5rocks.com/en/tutorials/workers/basics/){:target="_blank"} que seu navegador executa em background, desacoplado da sua página web, ou seja, ele funciona numa thread separada no browser, com isso não tem acesso ao DOM. 

Há várias coisas legais que podemos fazer com os service workers, como por exemplo armazenar conteúdo em cache localmente e disponibilizá-lo quando o usuário estiver offline.  Mesmo que o usuário esteja online, isso gera um impacto muito grande no tempo de carregamento da página, uma vez que as solicitações podem simplesmente ignorar completamente a rede e os recursos ficam disponíveis instantaneamente.

Diferente do cache do navegador, você define uma lista de recursos para armazenar em cache quando o o service worker é instalado, desta forma o usuário não precisa navegar para uma determinada página para que ela seja armazenada em cache.


> O Service Worker não pode ser cacheado.


Um ponto bem importante, é  que **o arquivo javascript do Service Worker não pode ser cacheado**, caso contrário, você pode gerar um cache infinito na máquina do usuário. 

Também não adianta colocar um parâmetro na chamada do script, como por exemplo `service-workers.js?nocache`, pois dessa forma ele será considerado um novo service worker. 

A melhor abordagem é configurar o seu servidor para sempre carregar de novo o arquivo, sem cache.

Agora que já sabemos o que são service workers e algumas das coisas que podemos fazer com eles, vamos ao que interessa.


![Jerry Maguire (1996)](/assets/images/posts/como-transformar-seu-site-em-um-progressive-web-app/jerry-maguire-show-me-the-code.jpg)


**Detectando suporte do navegador**

O primeiro passo é verificar se o navegador suporta service workers, para isso, é só executarmos o seguinte código:

{% highlight javascript %}
// verifica se o navegador suporta service workers
if ("serviceWorker" in navigator) {
  console.log('Seu navegador suporta service workers');      
} else {
  console.log('Hoje não.. Hoje não.. Hoje sim! :/');
}
{% endhighlight %}

Para mais informações sobre o suporte dos navegadores, tem o site [Is Service Worker Ready?](https://jakearchibald.github.io/isserviceworkerready/){:target="_blank"} que tem informações sobre os navegadores que já suportam.


**Registrar service worker**

Após verificarmos o suporte do navegador, precisamos permitir que o navegador saiba que pretendemos usar esse arquivo como um Service Worker. Para isso, precisamos registrá-lo. 

Na página principal do seu site, inclua o seguinte script e criamos nosso arquivo `service-worker.js`, na pasta root do nosso site. 
 
{% highlight html %}
<script type="text/javascript">
// verifica se o navegador suporta service workers
if ("serviceWorker" in navigator) {
  // Registra o service worker
  navigator.serviceWorker.register("service-worker.js")
    .then(function (registration) {
      console.info("Service Worker registration successful with scope: ", registration.scope);
    })
    .catch(function (err) {
      // Log do erro caso não consiga registrar o service worker
      console.error("Service Worker registration failed: ", err);
    });
}
</script>
{% endhighlight %}
 
 
Inicialmente, vamos definir apenas o nome do nosso cache no `service-worker.js`. 

{% highlight javascript %}
// Criando um nome para o arquivo de cache
const staticCache = "meu-site-2018-07-31-21-13";
{% endhighlight %}

Um ponto muito importante, é que o nome do cache tenha um identificador comum, no caso o `meu-site`, e tem um identificador único, que deve ser alterado sempre que tenha alguma alteração de conteúdo. Você deve alterar esse identificador toda vez que fizer um build novo.

Isso é importante para que o Service Worker atualize o cache.

O Service Worker possuí um ciclo de vida definido, que consiste nas seguintes etapas:


- install
- activate
- fetch
- message
- sync
- push 

Vamos focar nos 3 primeiros itens dessa lista, **install**, **activate** e **fetch**. Tanto o `install`, quanto o `activate` são executados somente 1 vez.

O `install` é executado quando você registra a versão do service worker pela primeira vez. Caso o service-worker.js mudar, o `install` é executado novamente.

No evento `install` é onde realizamos toda a preparação para e indicamos para o Service Worker quais arquivos ele deve fazer cache.

{% highlight javascript %}
// Lista de arquivos que devem ser cacheados
const files = [
  '/',
  '/sobre',
  '/contato',
  '/images/logo.jpg',
  '/assets/styles/main.min.css',
  '/assets/scripts/main.min.js',
];

// Faz cache dos arquivos ao instalar 
this.addEventListener("install", event => {
  this.skipWaiting();

  event.waitUntil(
    caches.open(staticCache)
      .then(cache => {
        return cache.addAll(files);
    })
  )
});
{% endhighlight %}

O evento `activate`  é onde você deleta os caches anteriores. Esse evento só é executado 1 vez, quando uma nova versão do `service-worker.js` foi instalado.

{% highlight javascript %}
// Limpa o cache antigo 
this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => (cacheName.startsWith('meu-site-')))
          .filter(cacheName => (cacheName !== staticCache))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});
{% endhighlight %}


O evento `fetch` é disparado toda vez que uma requisição é realizada. Caso o arquivo exista no cache, retornamos do cache, caso contrário, realizamos a requisição normalmente. O bacana é que caso não consigamos realizar a requisição, como por exemplo, se ficarmos sem internet, podemos mostrar uma página avisando que não conseguimos conectar ao servidor.

{% highlight javascript %}
// Reponde o request direto do cache
this.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o cache
        if (response) {
          return response;
        }
        // Faz a requisição  
        return fetch(event.request);
      })
      .catch(() => {
        // Mostra uma página de offline
        return caches.match('/offline.html');
      })
  )
});
{% endhighlight %}

Com esses passos, temos nosso Progressive Web App funcionando perfeitamente. Aqui você encontra o [service-worker.js](https://gist.github.com/evertonstrack/934d97612e46d19362c3a3a458c1f0aa){:target="_blank"} que construímos. 

Abaixo podemos ver o banner de instalação do Progressive Web App e após instalada, parece um aplicativo nativo no app drawer (gaveta de aplicativos).


![Banner de instalação do Progressive Web App](/assets/images/posts/como-transformar-seu-site-em-um-progressive-web-app/progressivve-web-app-install-banner-and-app-drawer.jpg)


## Conclusão

Se colocarmos na balança a dificuldade e o benefício que temos ao criar um PWA, não temos motivos para não fazer. Claro, que cada site tem suas peculiaridades e complexidades, para um blog ou um site estático, é super simples fazer. 

Você também pode ir além, dependendo do que é importante para o seu projeto, caso você tenha um blog, talvez fosse interessante implementar notificações push sempre que sair um novo post. Caso seja uma loja virtual, poderia notificar o cliente quando o produto que ele visualizou está em promoção, são inúmeras possibilidades. 

Vejo que os Progressive Web Apps vão crescer muito ainda, seja em adoção ou em funcionalidades. Muita novidade vai surgir. 

Pra quem se interessou, seguem alguns links que vão ajudar:


- [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/?hl=pt-br){:target="_blank"}
- [PWA Checklist](https://developers.google.com/web/progressive-web-apps/checklist){:target="_blank"}
- [PWA Builder](https://preview.pwabuilder.com/){:target="_blank"}


Até mais e obrigado pelos peixes.