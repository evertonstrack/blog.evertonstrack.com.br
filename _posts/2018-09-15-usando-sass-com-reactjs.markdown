---
layout: post
title:  "Usando Sass com Create React App (sem ejetar)"
description: "Quem usar Sass em seus projetos com o Create React App? Vamos ver como fazer isso sem ejetar o projeto ou rodar uma task extra."
date:   2018-09-15 18:30:00 -0300
bodyClass: post-javascript
theme-color: "#f0db4f"
tags: ['javascript', 'react', 'sass']
image: /assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/reactjs.jpg
---

A maneira mais fácil de iniciar um projeto com React é usando a ferramenta oficial que o Facebook criou, para nos dar um boilerplate inicial para qualquer projeto com react. Sim, estou falando do [Create React App](https://github.com/facebook/create-react-app){:target="_blank"}.

Para iniciar nosso projeto, só precisamos instalar o Create react app:

{% highlight cmd %}
npm install -g create-react-app
{% endhighlight %}

Criar o nosso projeto:

{% highlight cmd %}
create-react-app react-app-with-sass
{% endhighlight %}

E então rodamos nosso proejto e começamos a brincadeira:

{% highlight cmd %}
cd react-app-with-sass
npm start
{% endhighlight %}


## O problema

Como queremos usar Sass em seu projeto react, existem 2 maneiras comuns para fazer isso:

1. **Criar uma task separada para compilar o Sass para CSS**

Instalar o Sass, executar uma conversão para o CSS e incluir o CSS no aplicativo React. Este é um processo simples, pois o sass é uma gem do Ruby, porém é preciso executar um processo separado para fazer a conversão, paralelamente ao processo que está rodando o aplicativo React.

2. **Ejetando seu React app**
O processo de "Ejetar", remove parte da *"mágica"* do `Create react app`, revelando as configurações, scripts de criação e as dependências. Com isso, eles são movidos para dentro do projeto. 

Isso é ótimo para desenvolvedores avançados, e quando precisamos customizar algumas tasks do Webpack permite uma melhor personalização, mas para iniciantes acaba sendo mais confuso.


Mas então, como faremos isso sem ejetar nosso app e sem rodar uma task paralela? 


> ..você não é obrigado a usar nada. Pense e use se fizer sentido.


## Usando Sass no meu projeto

Felizmente esse problema é bem fácil de ser resolvido. Primeiro, vamos instalar a interface de linha de comando do Sass.

Para isso vamos instalar o `node-sass-chokidar` como dependência do nosso projeto:

{% highlight cmd %}
npm install --save node-sass-chokidar
{% endhighlight %}

O [`node-sass-chokidar`](https://github.com/michaelwayman/node-sass-chokidar#node-sass-chokidar){:target="_blank"}, é um pequeno wrapper em torno do executável *node-sass*, que usa o chokidar em vez de Gaze ao monitorar alterações nos arquivos. A funcionalidade é a mesma do node-sass, sendo a única diferença o chokidar em vez do Gaze para a visualização de arquivos.

No nosso `package.json`, vamos adicionar as seguintes linhas em "scripts":
Then in package.json, add the following lines to scripts:

{% highlight json %}
"scripts": {
  "build:sass": "node-sass-chokidar src/ -o src/",
  "watch:sass": "npm run build:sass && node-sass-chokidar src/ -o src/ --watch --recursive",
}
{% endhighlight %}

Dica: Caso queira utilizar um pré-processador diferente, apenas altere as tasks **build:sass** e **watch:sass** de acordo com a documentação do pré-processador.

Agora você pode renomear o `App.css` para `App.scss` e rodar o comando `npm run watch:sass`. Ele irá encontrar e monitorar qualquer arquivo Sass em qualquer subpasta da pasta **src**, e gerar um CSS correspondente na mesma pasta do `.scss`.

Se seu arquivo `App.css` continua sendo importado dentro do arquivo `App.js`. Você pode editar o arquivo `App.scss`, e o `App.css` será gerado automaticamente.

Para usar variáveis entre arquivos Sass, você pode usar imports.

Por exemplo, o arquivo `App.scss` pode importar `@import "./shared.scss";` com as definições das variáveis. Para habilitar imports sem usar os caminhos relativos, é só adicionar a opção `--include-path` no comando em seu `package.json`;

**Tudo bonito, tudo funcionando, mas ainda tenho que rodar uma task separada para gerar os arquivos CSS.**

Para resolver isso vamos alterar nossa task de **start** no nosso `package.json`:

{% highlight json %}
"start": "npm run watch:sass | react-scripts start",
{% endhighlight %}

Agora, toda vez que rodarmos nosso projeto, os arquivos Sass vão ser compilados, e Sass irá monitorar qualquer alteração nos arquivos e gerar novamente e o nosso script do create react app também continuará rodando. 


## Conclusão

Um post curto hoje que tem como meta facilitar nossa vida, mas lembre-se, você não é obrigado a usar nada. Pense e use se fizer sentido.

Até mais e obrigado pelos peixes.