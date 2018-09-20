---
layout: post
title:  "Internacionalização com React usando Create react app"
description: "Como internacionalizar a sua aplicação em react de forma simples, tanto seus componentes react quanto seu código escrito em Vanilla JS."
date:   2018-09-20 16:10:00 -0300
bodyClass: post-javascript
theme-color: "#f0db4f"
tags: ['javascript', 'react', 'internacionalizacao']
image: /assets/images/posts/internacionalizacao-com-create-react-app/internacionalizacao-react.jpg
---

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/internacionalizacao-com-create-react-app/internacionalizacao-react.webp" />
    <source srcset="/assets/images/posts/internacionalizacao-com-create-react-app/internacionalizacao-react.jpg" />
    <img itemprop="image" src="/assets/images/posts/internacionalizacao-com-create-react-app/internacionalizacao-react.jpg" alt="Internacionalização com React usando Create react app i18n" />
  </picture>
</figure>


Qundo falamos em internacionalização em React, a primeira lib que nos vem a mente é a [react-intl](https://github.com/yahoo/react-intl){:target="_blank"}{:rel="noopener"}, uma das bibliotecas mais pupulares do mercado, criada pelo Yahoo para internacionalizar aplicações feitas em React.

## Por que outra solução de internacionalização para React?

Para respondermos esta pergunta, precisamos primeiro entender como o `react-intl` funciona.


### Como o react-intl funciona?

O react-intl decora seu component react com um wrapper component, onde as mensagens internacionalizadas são injetadas para que os dados do idioma possam ser carregados dinamicamente sem recarregar a página. A seguir está o código de exemplo usando reac-intl.

{% highlight react %}
import { injectIntl } from 'react-intl';
class MyComponent extends Component {
  render() {
    const intl = this.props;
    const titulo = intl.formatMessage({ id: 'titulo' });
    return (<div>{titulo}</div>);
  }
};
export default injectIntl(MyComponent);
{% endhighlight %}

No entanto, com essa abordagem nos deparamos com dois problemas novos:

1 - A internacionalização pode ser aplicada apenas na camada de visualizaçâo, em um component react. Em um arquivo com Vanilla JS não é possível internacionalizá-lo, como por exemplo, imaginamos o código abaixo, um validador genérico que é usado por diversos componentes em nossa aplicação.

{% highlight javascript %}
export default const rules = {
  noSpace(value) {
    if (value.includes(' ')) {
      return 'O campo não pode conter espaços.';
    }
  }
};
{% endhighlight %}


2 - Como o seu componente react é envolvido por outra classe, o comportamento não é o esperado. Para obter a instância do componente, não poderiamos usar da maneira tradicional:

{% highlight react %}
class App {
  render() {
    <MyComponent ref="my"/>
  }
  getMyInstance() {
    console.log('Minha instância', this.refs.my);
  }
}
{% endhighlight %}

Neste caso, precisaríamos exportar nosso componente, passando como parâmetro `{withRef: true}`:

{% highlight react %}
class MyComponent {
  // Código omitido
}
export default injectIntl(MyComponent, {withRef: true});
{% endhighlight %}

E usar o método `getWrappedInstance()` para a instância do componente:

{% highlight react %}
  // Código omitido

  getMyInstance() {
    console.log('Minha instância', this.refs.my.getWrappedInstance());
  }

  // Código omitido
{% endhighlight %}


Além disso, as propriedades do seu componente react não são herdadas na subclasse, pois o componente é injetado pelo react-intl.

Devido aos empecilhos citados acima, o pessoal do [Alibaba](https://github.com/alibaba){:target="_blank"}{:rel="noopener"} criou o [react-intl-universal](https://github.com/alibaba/react-intl-universal){:target="_blank"}{:rel="noopener"} para internacionalizar aplicações em React.


## Setup do projeto

Vamos a prática! Inciamos criando nosso app com o `create-react-app`. Caso não tenha instalado, confira o início [deste post](http://localhost:3000/blog/usando-sass-com-reactjs/) onde ensino como instalar.

{% highlight cmd %}
create-react-app react-intl-universal-exemple
{% endhighlight %}

Nossa aplicação foi criada, vamos instalar o react-intl-universal:

{% highlight cmd %}
npm install react-intl-universal --save
{% endhighlight %}

Após isso, vamos criar uma pasta `locales`, dentro da pasta **src** do nosso projeto. O nome desta pasta é você quem escolhe, caso queira definir um nome ou localização diferente para ela, sinta-se à vontade. 

Na sequência, podemos criar nossos arquivos que contém os textos que serão traduzidos. Aqui neste exemplo, vamos criar 2 arquivos `.json` dentro da pasta que acabamos de criar. Um para o idioma português e outro para o idioma inglês.

**pt-BR.json**
{% highlight json %}
{
  "header": {
    "title": "Bem-vindo ao React"
  },
  "home": {
    "description": "Para começar, edite o arquivo <code>src/App.js</code> e salve para atualizar."
  }
}
{% endhighlight %}

**en-US.json**
{% highlight json %}
{
  "header": {
    "title": "Welcome to React"
  },
  "home": {
    "description": "To get started, edit <code>{arquivo}</code> and save to reload."
  }
}
{% endhighlight %}


Vamos editar nosso `App.js`, adicionando o import do `react-intl-universal`.

{% highlight react %}
import React, { Component } from 'react';
import intl from 'react-intl-universal';
// Código omitido
{% endhighlight %}

Vamos criar uma constante referênciando nossos arquivos de tradução.

{% highlight react %}
// Código omitido
const locales = {
  'pt-BR': require('./locales/pt-BR.json'),
  'en-US': require('./locales/en-US.json')
};
// Código omitido
{% endhighlight %}

E finalizando o setup do projeto, vamos inicializar o `react-intl-universal`, passando para ele nossos arquivos de tradução e qual é o idioma padrão. *Vamos pegar o idioma do navegador do usuário e caso não exista tradução para ele, colocaremos como padrão* **pt-BR**.

{% highlight react %}
// Código omitido
constructor() {
  super();

  const currentLocale = locales[navigator.language] ? navigator.language : 'pt-BR';

  intl.init({
    currentLocale,
    locales
  });
}
// Código omitido
{% endhighlight %}

O arquivo `App.js`, após as mudanças ficou desta forma. *Note que ainda estamos passando os textos fixos dentro do método render*.

{% highlight react %}
import React, { Component } from 'react';
import intl from 'react-intl-universal';

import logo from './logo.svg';
import './App.css';

const locales = {
  'pt-BR': require('./locales/pt-BR.json'),
  'en-US': require('./locales/en-US.json')
};

class App extends Component {

  constructor() {
    super();

    const currentLocale = locales[navigator.language] ? navigator.language : 'pt-BR';

    intl.init({
      currentLocale,
      locales
    });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
{% endhighlight %}

Com isso, a internacionalização do nosso projeto está configurada e podemos partir para as traduções. 


## Como aplicamos as traduções

O `react-intl-universal` disponibiliza 2 métodos bem simples mas bastante poderosos para nós: o `intl.get()` e o `intl.getHTML()`. 


**intl.get()** -- Usamos ele para buscar uma string simples ou uma string que tenha algum trecho que precisamos fazer um replace. 

**intl.getHTML()** -- Usamos para buscar uma string que também contenha blocos de HTML.

Vamos ao exemplo:

**pt-BR.json**
{% highlight json %}
{ 
  "text": "Lorem ipsum dolor sit amet",
  "textHTML": "Lorem ipsum <span style='color:red'>dolor</span> sit amet"
}
{% endhighlight %}

**nosso-javascript.js**
{% highlight react %}
intl.get('text');
intl.getHTML('text');
{% endhighlight %}

Podemos também definir um texto padrão quando a texto que buscarmos não existir:

{% highlight javascript %}
// Padrão
intl.get('um-texto-inexistente').default('Esta tradução não existe'); // Esta tradução não existe

// Reduzida
intl.get('um-texto-inexistente').d('Esta tradução não existe'); // Esta tradução não existe

// Com HTML
intl.getHTML('um-texto-inexistente').d('<p>Esta tradução não existe</p>'); // <p>Esta tradução não existe</p>
{% endhighlight %}

### Textos com variáveis

Se a mensagem contiver variáveis, o `{nome_da_variavel}` será substituído diretamente na string. No exemplo abaixo, temos duas variáveis `{nome}` e `{local}`, o segundo argumento representando as variáveis no método get é substituído na string.

**pt-BR.json**
{% highlight json %}
{ 
  "bemvindo": "Olá, {name}. Bem vindo a {where}!"
}
{% endhighlight %}


**nosso-javascript.js**
{% highlight javascript %}
intl.get('bemvindo', {name:'Everton', where:'Meu blog'}) // "Olá, Everton. Bem vindo ao Meu blog!"
{% endhighlight %}

A lib também tem suporte para Plural, números, separadores, moeda, datas, horas, etc. Os textos no Plural, suportam o padrão [ICU Message syntax](http://userguide.icu-project.org/formatparse/messages){:target="_blank"}{:rel="noopener"}.

Você pode conferir mais no [GitHub do Alibaba](https://github.com/alibaba/react-intl-universal){:target="_blank"}{:rel="noopener"}.


## Aplicando as traduções ao nosso projeto

Vamos aplicar as traduções ao nosso projeto, seguindo o que aprendemos até agora vamos alterar nossos arquivos `.json` para adicionarmos uma variável.

**pt-BR.json**
{% highlight json %}
{
  "header": {
    "title": "Olá {nome}, Bem-vindo ao React"
  },
  "home": {
    "description": "Para começar, edite o arquivo <code>{arquivo}</code> e salve para atualizar."
  }
}
{% endhighlight %}

**en-US.json**
{% highlight json %}
{
  "header": {
    "title": "Hello {nome}, Welcome to React"
  },
  "home": {
    "description": "To get started, edit <code>{arquivo}</code> and save to reload."
  }
}
{% endhighlight %}


E vamos alterar o método `render` do nosso App.js, para renderizar nossos textos conforme o idioma e as váriáveis que passarmos.

{% highlight react %}
render() {
  const nome = 'Everton';
  const arquivo = 'src/App.js';
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">
          {intl.get('header.title', {nome: nome})}
        </h1>
      </header>
      <p className="App-intro">
        {intl.getHTML('home.description', {arquivo: arquivo})}
      </p>        
    </div>
  );
}
{% endhighlight %}

E pronto, temos nossa aplicação rodando e internacionalizada.

<figure>
  <picture>
      <source type="image/webp" srcset="/assets/images/webp/posts/internacionalizacao-com-create-react-app/react-intl-universal-exemple.webp" />
      <source srcset="/assets/images/posts/internacionalizacao-com-create-react-app/react-intl-universal-exemple.jpg" />
      <img itemprop="image" src="/assets/images/posts/internacionalizacao-com-create-react-app/react-intl-universal-exemple.jpg" alt="React intl universal exemplo" />
    </picture>
</figure>


## Próximos passos

O bacana no `react-intl-universal` é que ele não se limita somente ao react, mas você pode usar ele para tradução de mensagens em suas aplicações que rodam Vanilla JS, ou como no exemplo que citei, em uma função javascript que não é um componente do React. O que facilita bastante, pois não nos prende a usar o contexto do react.

Na hora dos testes unitários, também é bem fácil de usar. Apenas chamamos o arquivo com a localização e iniciamos o `react-intl-universal`.

Como próximo passo poderíamos adicionar um seletor de idioma na nossa aplicação, para alterar de um idioma para o selecionado. 


## Conclusão

Tenho trabalhado bastante com react nos últimos tempos, e passei semanas atrás de uma solução menos *engessada* para internacionalizar a aplicação que estou construindo, o `react-intl-universal` supriu essa minha necessidade de uma forma simples e menos intrusiva. 

Dê uma conferida no [react-intl-universal](https://github.com/alibaba/react-intl-universal){:target="_blank"}{:rel="noopener"}.

**O código que desenvolvemos aqui está [GithHub](https://github.com/evertonstrack/react-intl-universal-exemple), para ver o código completo é só acessar.**

Até mais e obrigado pelos peixes.