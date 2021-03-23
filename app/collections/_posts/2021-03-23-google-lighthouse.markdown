---
layout: post
title: "Testando a performance das páginas web com o Lighthouse"
description: "Usando o Google Lighthouse para testar nossas páginas web. Pois afinal, performance é importante, performance é funcionalidade."
date: 2021-03-23 09:00:00 -0300
bodyClass:
tags: ['performance', 'ferramentas', 'google lighthouse']
image: "/assets/images/posts/google-lighthouse/logotipo-google-lighthouse.jpg"
---

A Performance é uma funcionalidade e deveria ser tratada como tal, porém não é o que vemos no dia-a-dia, onde os sites e as aplicações web têm cada vez mais dependências e entregam um caminhão de javascript para o usuário, mesmo que ele não precise disso.

> Performance é importante, performance é funcionalidade.

Hoje vamos falar um pouco sobre performance e sobre uma ferramenta que vai te ajudar a medir a performance das suas aplicações.

## Por que a performance é importante?

A performance sempre foi um ponto importante para as aplicações web. Antigamente existia um impacto na performance em virtude das velocidades de internet lentas, principalmente em países subdesenvolvidos.

Já atualmente, como o mundo é mobile, o número de pessoas como um smartphone nas mãos cresce a cada dia e, com isso, os problemas de performance começam a surgir.

Existem algumas coisas importantes que precisamos nos atentar quando estamos desenvolvendo nossas aplicações. As principais são:

- Quem é nosso público alvo?
- Quais tipos de dispositivos ele usa?
- Quais tipos de conexão com internet ele usa?

Esses são as perguntas iniciais que precisamos responder, pois elas vão basear o quão importante a funcionalidade **performance** vai ser na sua lista de prioridades.

## Como medir a performance do meu site?

Existem diversas formas de medir a performance das nossas aplicações, mas eu gosto de fazer um mistos de algumas sempre que possível.

- **Testar no dispositivo mais utilizado pelo público alvo:** Esse ponto pode ser mais difícil de fazer, mas sempre que possível gosto de ter o dispositivo em mãos e testar no uso mesmo os tempos de carregamentos e as interações. Existem também, serviços que você consegue realizar esses testes online,  como o AWS Device Farm da Amazon.
- **Testar usando ferramentas de benchmark:** A ferramenta que eu mais uso para esse tipo de testes é o Lighthouse da Google.


## O que é o Google Lighthouse?

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/google-lighthouse/logotipo-google-lighthouse.webp" />
    <source srcset="/assets/images/posts/google-lighthouse/logotipo-google-lighthouse.jpg" />
    <img itemprop="image" src="/assets/images/posts/google-lighthouse/logotipo-google-lighthouse.jpg" alt="Google Lighthouse" />
  </picture>
  <legend>Google Lighthouse</legend>
</figure>

O Lighthouse é uma ferramenta automatizada de código aberto criada pela Google, para medir a qualidade das páginas da web.

Pode ser executado em qualquer página da web, pública ou exigindo autenticação. O Lighthouse avalia as páginas da sua aplicação levando em consideração diversos quesitos e padrões web consolidados das suas aplicações web.
Esses quesitos são divididos em 5 categorias diferentes:

- Performance
- Acessibilidade
- Melhores práticas
- SEO
- PWA

### Performance

Este é o principal item que vamos nos atentar aqui. Ele mede o tempo que leva para a "primeira pintura com conteúdo" aparecer na tela, o tempo que leva para que o usuário consiga interagir com sua aplicação, se existem deslocamentos de layout, dentre outros itens.

### Acessibilidade

As verificações de acessibilidade destacam oportunidades para melhorar a acessibilidade de seu aplicativo da web, detectando automaticamente problemas comuns de acessibilidade

### Melhores práticas

O nome é autoexplicativo. Ele testa diversas melhores práticas consolidadas, como uso de HTTPS, erros de javascript no console, charset, imagens com proporções corretas, dentre muitos outros.

### SEO

As verificações de SEO (Otimização para mecanismos de busca) garantem que sua página seja otimizada para a classificação dos resultados do mecanismo de pesquisa.

Neste ponto, as verificações são básicas. Para otimizar sua página para os mecanismos de busca, não se baseie só nesse relatório, mas é um bom ponto de partida.

### PWA

As verificações de [PWA (Progressive Web App)](https://evertonstrack.com.br/como-transformar-seu-site-em-um-progressive-web-app/) validam os aspectos de um Progressive Web App.


Como vimos, ele aborda vários aspectos de uma aplicação. Talvez nem todas façam sentido para seu contexto e tudo bem.


## Como usar o Lighthouse


O Lighthouse pode ser utilizado via uma [extensão para o Google Chrome do Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?utm_source=chrome-ntp-icon){:target="_blank"}{:rel="noopener"} ou via linha de comando. Aqui vamos abordar a opção via extensão.

Você pode acessar a Chrome Web Store e instalar como você instalaria qualquer outra extensão. Após instalada, você pode acessar clicando no ícone do farol, que vai aparecer nas extensões, e depois em "Generate report".

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/google-lighthouse/google-lighthouse.webp" />
    <source srcset="/assets/images/posts/google-lighthouse/google-lighthouse.jpg" />
    <img itemprop="image" src="/assets/images/posts/google-lighthouse/google-lighthouse.jpg" alt="Google Lighthouse" />
  </picture>
  <legend>Extensão do Google Lighthouse</legend>
</figure>


Ela vai analisar todos os aspectos que comentamos acima e, depois, vai exibir uma pontuação para cada um dos itens que abordamos acima, além do detalhamento de cada um dos itens que foram analisados.

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/google-lighthouse/lighthouse-evertonstrack.com.br.webp" />
    <source srcset="/assets/images/posts/google-lighthouse/lighthouse-evertonstrack.com.br.jpg" />
    <img itemprop="image" src="/assets/images/posts/google-lighthouse/lighthouse-evertonstrack.com.br.jpg" alt="Resultado do relatório do Google Lighthouse para o site evertonstrack.com.br" />
  </picture>
  <legend>Resultado do relatório do Google Lighthouse para o site evertonstrack.com.br</legend>
</figure>


## Conclusão


A performance deve ser uma funcionalidade e não um "plus" das suas aplicações. Nós, quanto desenvolvedores, precisamos levar mais a sério e pensar mais em como podemos melhorar a performance das nossas aplicações. Seja não instalando aquela dependência que pesa 500kb para usar uma funcionalidade dela, ou adicionando imagens em 4K sendo que elas são exibidas no tamanho de 1200x800 pixels.

**Performance é importante, performance é funcionalidade.**

### Links

- [Auditar apps da Web com o Lighthouse - Google Web Dev](https://developers.google.com/web/tools/lighthouse?hl=pt-br){:target="_blank"}{:rel="noopener"}
- [Lighthouse na Chrome Web Store](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?utm_source=chrome-ntp-icon){:target="_blank"}{:rel="noopener"}
- [AWS Device Farm da Amazon](https://aws.amazon.com/pt/device-farm/){:target="_blank"}{:rel="noopener"}


Até logo e obrigado pelos peixes.
