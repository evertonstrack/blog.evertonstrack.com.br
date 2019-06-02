---
layout: post
title:  "ReactJS: Uma biblioteca javascript para trabalhar com views."
description: "O que é? De onde veio? Para que foi criado? E o que você precisa fazer para começar a brincar hoje mesmo  com ReactJS."
date:   2018-09-09 09:30:00 -0300
bodyClass: post-javascript
theme-color: "#ffdd18"
tags: ['javascript', 'react']
image: /assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/reactjs.jpg
---

A mundo front-end é uma loucura total, principalmente quando falamos em frameworks e libs javascript. No momento que escrevo este post, é bem provável que esteja surgindo um novo framework. 

Hoje vamos falar sobre a lib que estampa a frente do trem do hype, isso mesmo, vamos falar do ReactJS.. ou apenas React, para os íntimos.

<figure>
  <picture>
      <source type="image/webp" srcset="/assets/images/webp/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/reactjs.webp" />
      <source srcset="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/reactjs.jpg" />
      <img itemprop="image" src="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/reactjs.jpg" alt="ReactJS: Uma biblioteca javascript para trabalhar com views" />
    </picture>
</figure>

> **TL;DR;** Vamos abordar o que é, para que foi criado e o que você precisa fazer para iniciar hoje mesmo.


## Contexto

### ReactJS: O que é?

Podemos definir o React facilmente em uma frase: O ReactJS é uma biblioteca javascript para construir interfaces, que aparece em todos os lugares.. as vezes até onde não deveria.


### Por que foi criado? Qual problema ele veio resolver?

Foi criado pelo Facebook para **resolver o problema na camada de apresentação, o V (view) do MVC**. O ReactJS começou como um port JavaScript do XHP, uma versão do PHP que o Facebook lançou em 2010.

Um engenheiro do Facebook negociou tempo com seu gerente para levar o XHP ao navegador usando JavaScript e recebeu seis meses para fazê-lo.

**O resultado é ReactJS.**


> Então esse tal de React.. é um tipo de Angular, certo?

<figure>
  <picture>
      <source type="image/webp" srcset="/assets/images/webp/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/faustao-errou.webp" />
      <source srcset="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/faustao-errou.jpg" />
      <img itemprop="image" src="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/faustao-errou.jpg" alt="ReactJS: Uma biblioteca javascript para trabalhar com views" />
    </picture>
</figure>

Não. O React é uma **biblioteca**, focada em resolver um problema específico, neste caso, renderizar componentes. Angular é um **framework**, um conjunto de ferramentas que foca em resolver vários problemas.

Mas não se prenda a isso, existem tantas coisas mais importantes no desenvolvimento que necessitam de um debate, mas discussões como essa, não levam a nada. Lib ou framework, não faz diferença.

> Lib ou framework, não importa.. não faz diferença.


<figure>
  <picture>
      <source type="image/webp" srcset="/assets/images/webp/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/lib-e-framwork.webp" />
      <source srcset="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/lib-e-framwork.jpg" />
      <img itemprop="image" src="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/lib-e-framwork.jpg" alt="Frameworks e libs javascript: AngularJS, ReactJS, VueJS, Ember" />
    </picture>
</figure>


## Entendendo melhor o React

Agora sabemos o que é o React, entendemos qual foi o motivo que levou a sua criação. Então vamos ao que mais importa, o que ele traz de interessante para o nosso dia-a-dia?

- Introduz o conceito de componentes;
- Faz a manipulação estruturada do DOM;
- O fluxo é sempre de cima para baixo, um componente passa o estado dele para os componentes abaixo dele;,
- Virtual DOM, que é uma cópia exata do DOM;
- Statefull e Stateless components. (Manter o estado sempre no componente pai, e os componenetes filhos recebem o estado este estado);

### Pilares do React

Para entender e usar o React, basicamente precisamos entender os 4 pilares principais: **states**, **props**, **render** e o **lifecycle**.

<figure>
  <picture>
      <source type="image/webp" srcset="/assets/images/webp/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/pilares-do-react.webp" />
      <source srcset="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/pilares-do-react.jpg" />
      <img itemprop="image" src="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/pilares-do-react.jpg" alt="Pilares do React" />
    </picture>
</figure>

Vamos explanar um pouco cada um desses pilares.

### Estado (State)

O state pode ser qualquer conjunto de informações que serão utilizadas em algum momento pela interface.

Como por exemplo: As informações do usuário, uma lista de itens, o resultado de um request ou até informações específicas de UI.

Vamos analisar o seguinte trecho de código:

{% highlight react %}
import React, { Component } from 'react';

export default class UserData extends Component {

  constructor(){
    super();

    this.state = {
      name: ''
    };
  }

   () {
    this.setState({
      name: 'Jubileu'
    });
  }

  render() {
    return (
      <div className="user-data">
        <h2>{this.state.name}</h2>
      </div>
    );
  }
}
{% endhighlight %}

Temos várias informações neste trecho de código, vamos abordar um à um.

Inicialmente, estamos importando os módulos do **React** e o **Component**, exportamos uma classe que extende do múdulo componente.

No contrutor, declaramos o nosso state "name", inicialmente ele tem como valor uma string vazia.

{% highlight react %}
this.state = {
  name: ''
};
{% endhighlight %}

Posteriormente, quando nosso componente é montado no DOM `componentDidMount`, setamos um valor neste state, usando o método `setState()`. No momento que fizemos isso, nosso componenete é atualizado automaticamente.

{% highlight react %}
this.setState({
  name: 'Jubileu'
});
{% endhighlight %}

No final, usamos nosso state no nosso compoenente, no método `render()` (que falaremos na sequência).

{% highlight react %}
render() {
  return (
    <div className="user-data">
      <h2>{this.state.name}</h2>
    </div>
  );
}
{% endhighlight %}


> A regra é: **se o componente precisa ser atualizado quando a informação mudar, essa informação deve ficar no state, pois ela representa o “estado” da aplicação**.
> A regra é: **se a mudança da informação impacta em uma (re)renderização do componente, essa informação deve ficar no state, pois ela representa o “estado” da aplicação**.


### Propriedades (Props)

Em todos os tipos de paradigmas no desenvolvimento, passar parâmetros é extremamente comum. Com os componentes do React isso não poderia ser diferente: a diferença é que no React, usamos os props (abreviação para properties).

Por exemplo: Um state passado de um componente pai para um componente filho, é uma **prop**.

{% highlight react %}
const UserName = (props) => {

  return (
    <div className="user-data">
      <h2>{props.name}</h2>
    </div>
  );
}

// Quando o componente for usado, chamariamos ele assim:
<UserName name="Jubileu" />
{% endhighlight %}

Podemos escrever o exemplo acima, omitindo o objeto "prop", ficaria assim: 

{% highlight react %}
const UserName = ({ name }) => {
  return (
    <div className="user-data">
      <h2>{name}</h2>
    </div>
  );
}
{% endhighlight %}


### Render

O método render é onde a mágica acontece. Como o nome já diz, ele é o responsável por renderizar nosso componente no navegador, é um método puro, o que significa que ele dá a mesma saída sempre que a mesma entrada é fornecida.

Toda vez que o state muda, ele é chamado automaticamente e a view é atualizada. O React atualiza **apenas a parte do DOM que sofreu alteração**, graças ao virtual DOM.

{% highlight react %}
  componentDidMount() {
    this.setState({
      favorite_thing: 'Pipoca'
    });
  }

  render() {
    return (
      <div className="user-data">
        <h2>{this.state.name}</h2>
        <p>{this.state.favorite_thing}</p>
      </div>
    );
  }
}
{% endhighlight %}


### Lifecycle

Tudo passa por um ciclo de vida _(até a uva)_: uma árvore, um software, você mesmo, um componente UI em um navegador da Web, todos eles tem seu nascimento, crescimento, atualizações e morte.

Um componente React também possui quatro fases:

**Inicialização**
-- Quando são feitas as configurações iniciais do nosso componente;

**Montagem**
-- Quando nosso componente é montado no DOM;

**Atualização**
-- Quando nosso componente sofre uma atualização;

**Desmontagem**
-- Quando nosso componente é desmontado do DOM;


Para nos ajudar a trabalhar com o ciclo de vida dos nossos componentes, o react nos disponibiliza alguns métodos que facilitam esse trabalhdo. 

{% highlight react %}
componentWillMount() {  }
{% endhighlight %}
Executado quando o componente estiver prestes a ser montado no DOM da página.

{% highlight react %}
componentDidMount() { }
{% endhighlight %}
Executado depois que o componente foi montado no DOM. **Chamadas da API devem ser feitas sempre neste método**.

{% highlight react %}
shouldComponentUpdate() { }
{% endhighlight %}
Deve retornar `true` ou `false`, e então o componente seria re-renderizado ou ignorado. Default: `true`.

{% highlight react %}
componentWillUpdate() {}
{% endhighlight %}
Executado somente quando `shouldComponentUpdate` retornar `true`.

{% highlight react %}
componentDidUpdate() { }
{% endhighlight %}
Executado quando o novo componente (já atualizado) foi atualizado no DOM. Usado para reativar as bibliotecas de terceiros.

{% highlight react %}
componentWillReceiveProps() { }
{% endhighlight %}
Executado quando as props mudaram e não são processados ​​pela primeira vez.

{% highlight react %}
componentWillUnmount() { }
{% endhighlight %}
Último método no ciclo de vida. Isso é executado imediatamente antes de o componente ser removido do DOM.

<figure>
  <picture>
      <source type="image/webp" srcset="/assets/images/webp/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/lifecycle-react.webp" />
      <source srcset="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/lifecycle-react.jpg" />
      <img itemprop="image" src="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/lifecycle-react.jpg" alt="Ciclo de vida do React" />
    </picture>
</figure>


### Algumas considerações

O React é uma biblioteca fantástica e funciona muito bem para o que se propõe. Vamos levantar alguns prós e contras, baseados na minha opinião e em pesquisas na comunidade.

**Prós**
- Facilidade de se criar componentes pequenos e reutilizáveis.
- Trabalhar com a abordagem do Virtual DOM, que é bem mais rápido que o DOM nativo.
- Curva de aprendizado relativamente baixa.
- Fácil de aplicar em um projeto.

**Contras**
- Não usa templates (HTML dentro do JS).
- Fácil de perder organização e legibilidade em projetos maiores.
- Diferente dos frameworks, o React manipula o DOM pra você, mas toda a parte de lógica da aplicação, você mesmo precisa fazer.


### Por onde começar?

Primeiramente, tenha em mente que todas as libs ou frameworks são puramente javascript, a base de tudo é essa linguagem multiparadiga.

> Um dos maiores problemas trabalhar com React, sem conhecer javascript.

Começe pelo basico:

- Comece aprendendo javascript, ou melhorando o seu conhecimento.
- Se familiarize com o Javascript Moderno.


Após isso, o pessoal do Facebook criou o [create react app](https://github.com/facebook/create-react-app){:target="_blank"}{:rel="noopener"}, um boilerplate que deixa tudo pronto para você só se preocupar em desenvolver.

{% highlight cmd %}
npm install -g create-react-app
npx create-react-app my-react-app
cd my-react-app
npm start
{% endhighlight %}

Com essas linhas de comando, você tem um projeto configurado e rodando para brincar com o React.


## Conclusão

O React é uma biblioteca fantástica que traz alguns conceitos bem interessantes, e ainda por cima tem uma curva de aprendizado relativamente baixa. Quer você goste ou não, ele teve e ainda tem uma grande importância no mundo front-end, sem contar que ele está no liderando o `trem do hype`.


### One more thing...

Toda biblioteca introduz um nível de complexidade adicional ao projeto, você deve avaliar se você realmente precisa dela e se já não há soluções dentro das bibliotecas que você já utiliza.

Antes de usar qualquer lib ou framework, tire algum tempo para pensar se realmente ele é necessário para a sua aplicação.

<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/webp/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/think.webp" />
    <source srcset="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/think.jpg" />
    <img itemprop="image" src="/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/think.jpg" alt="Pense se faz sentido" />
  </picture>
</figure>

Pode parecer só mais uma dependência pra você, mas é o plano de dados do usuário que paga o pato por fazer o download de 1 Kg de javascript.


Até mais e obrigado pelos peixes.

---

_Este post foi resultado de uma Tech Talk feita na [Accera](https://accera.com.br/){:target="_blank"}{:rel="noopener"} no dia 30/07._

![Tech Talk sobre React na Accera](/assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/tech-talk-react-aceera.jpg)

