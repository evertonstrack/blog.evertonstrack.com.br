---
layout: post
title:  "React Hooks: O que são e porque eles são importantes"
description: "Hoje vamos conversar sobre React Hooks. O que são, e porque são importantes e como eles mudam a forma como escrevemos nossos componentes com react."
date:   2018-11-03 17:45:00 -0300
bodyClass: post-javascript
theme-color: "#ffdd18"
tags: ['javascript', 'react']
image: /assets/images/posts/reactjs-uma-biblioteca-javascript-para-trabalhar-com-views/reactjs.jpg
---

Hoje vamos conversar sobre **React Hooks**. O que são, porque são importantes e como eles mudam a forma como escrevemos nossos componentes com react.


## O que são Hooks

Os Hooks no react são uma nova funcionalidade proposta pelo pessoal do Facebook, que nos deixa usar o state e outras features do React *como os métodos do ciclo de vida*, sem precisarmos escrever uma **class**. 


## A motivação

Os componentes e o fluxo de dados de cima para baixo nos ajudam a organizar uma interface de usuário grande em partes pequenas, independentes e reutilizáveis. 

O React é uma lib fantástica que nos permite construir insterfaces componentizadas com grande facilidade, porém em alguns momentos é bem difícil reaproveitar a lógica entre componentes por que ela é **stateful** e não pode ser extraída para uma função ou outro componente.  

Quando tentamos resolver esses casos de uso apenas com componentes, geralmente acabamos com:

- Componentes enormes que são difíceis de refatorar e testar;
- Lógica duplicada entre diferentes componentes e métodos de ciclo de vida;
- Padrões complexos como render props e High order components;
- E o Wrapper hell;

Hoje, para criarmos um componente **stateful**, obrigatóriamente temos que declarar uma class. Mas e se **pudessemos usar state em uma function componente?**

Como hooks podemos fazer isso, e vamos ver isso agora, mas antes de você sair correndo e gritando para o mundo que as classes vão ser depreciadas no React:

> **TLDR: Não há planos para remover classes do React.**


## React Hooks

Como já dei o spoiler antes, os Hooks nos deixam usar o state e outras features do React *como os métodos do ciclo de vida*, sem precisarmos escrever uma **class**. 

Mas não é só isso, também conseguimos usar o Context sem cair no **Wrapper hell**. Vamos ver como funciona:

Aqui temos o nosso componente, stateful que tem o nosso state, com o `name` e o `lastname`. Nosso componente também consome 2 contextos, `ThemeContext` e `LocaleContext` um dele é o tema e outro é o idioma.

{% highlight react %}
import React, { Component } from 'react';
import Row from '../Row/Row';
import { ThemeContext, LocaleContext } from '../../context';
import './card.scss';

export default class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Jubileu',
      lastname: 'Pipoca'
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({theme}) => (
          <section className={theme}>
            <Row label="Nome">
              <input 
                id="name" 
                value={this.state.name} 
                onChange={this.handleChange}
              />
            </Row>
            <Row label="Sobrenome">
              <input 
                id="lastname"
                value={this.state.lastname} 
                onChange={this.handleChange}
                />
            </Row>
            <Row label="Idioma">
              <LocaleContext.Consumer>
                {({ locale }) => (
                  <p>{locale}</p>
                )}
              </LocaleContext.Consumer>
            </Row>
          </section>
        )}
       </ThemeContext.Consumer>
    );
  }
}
{% endhighlight %}

Agora vamos escrever o mesmo componente, utilizado Hooks e vamos observar as diferenças.

{% highlight react %}
import React, { useState, useContext } from 'react';
import Row from '../Row/Row';
import { ThemeContext, LocaleContext } from '../../context';
import './card.scss';

export default function CardWithHooks() {
  const [name, setName ] = useState('Jubileu');
  const [lastname, setLastname ] = useState('Pipoca');
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);

  function handlerChangeName(e) {
    setName(e.target.value)
  }

  function handlerChangeLastname(e) {
    setLastname(e.target.value)
  }
  
  return (
    <section className={theme}>
      <Row label="Nome">
        <input 
          id="name"
          value={name}
          onChange={handlerChangeName}
        />
      </Row>
      <Row label="Sobrenome">
        <input 
          id="lastname"
          value={lastname}
          onChange={handlerChangeLastname}
        />
      </Row>
      <Row label="Idioma">
        <p>{locale}</p>
      </Row>
    </section>
  );
}
{% endhighlight %}

A primeira coisa que notamos é que nosso componente é apenas uma função, e não mais uma classe. Para usarmos o state dentro no nosso compoente, importamos o hook `useState`:

{% highlight react %}
import React, { useState } from 'react';
{% endhighlight %}

E no nosso compoente, usamos o hook da seguinte forma:

{% highlight react %}
const [name, setName ] = useState('Jubileu');
{% endhighlight %}

No exemplo acima, declaramos o valor, no caso o `name` e o método que setá esse valor `setName`. O valor inicial é passado como argumento para nosso hook `useState('Jubileu')`. Hooks nada mais são que funções.

Outra coisa muito bacana é que quando usamos o `useContext` hook, eliminamos o **wrapper hell**, e usamos da mesma forma que usamos o state:

{% highlight react %}
import React, { useContext } from 'react';

 // código omitido

const { theme } = useContext(ThemeContext);
{% endhighlight %}

Esses são apenas 2 exemplos de uso dos hooks do react, as possibilidades são muitas. 


## Lifecycle 

Imagine que precisamos atualizar o title da página com o nome e sobre nome do usuário conforme ele digita nos inputs, do modo convencional, usariamos 2 métodos do ciclo de vida do React: `componentDidMount` e `componentDidUpdate`, para setarmos o valor inicial e atualizá-lo sempre que o state for atualizado.

{% highlight react %}
// código omitido
componentDidMount() {
  document.title = this.state.name + ' ' + this.state.lastname;
}

componentDidUpdate() {
  document.title = this.state.name + ' ' + this.state.lastname;
}
// código omitido
{% endhighlight %}

Com hooks, podemos fazer a mesma coisa de uma forma mais simples, e também em um function component. Neste caso, usamos o `useEffect`.

O Effect Hook, useEffect, adiciona a capacidade de realizar *efeitos colaterais* de um function component. Ele serve o mesmo propósito que `componentDidMount`, `componentDidUpdate` e `componentWillUnmount` nas classes React, mas unificado em uma única API. 

Para usá-lo, importamos ele e usamos da seguinte forma:

{% highlight react %}
import React, { useEffect } from 'react';
// código omitido
useEffect(() => {
  document.title = name.value + ' ' + lastname.value;
});
// código omitido
{% endhighlight %}

Desta forma, o title da página será alterado quando o componente for montado no DOM e toda a vez que ele for atualizado, a alteração serão feita no title da págian também. Fácil não? :)

## One more thing

Antes de finalizarmos, vamos melhorar nossa reutilização de código e legibilidade do nosso componente, criando um hook customizado.

Vamos separar o gerenciamento do nosso state e a alteração do state em um hook customizado, que pode ser usado por qualquer input dentro da nossa aplicação.

{% highlight react %}
import React, { useState } from 'react';

// Custom React Hook
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handlerChange(e) {
    setValue(e.target.value);
  }
  
  return {
    value: value,
    onChange: handlerChange
  }
}
{% endhighlight %}

Vamos analisar esse hook. 

Recebemos como argumento o valor inicial do nosso input, usamos o hook `useState`, declaramos um método que seta o valor quando ele for atualizado e por fim, retornamos um objeto com o value e o envento de change.

Após essa alteração, veja como nosso componente ficou bem mais legível e mais enxuto:

{% highlight react %}
import React, { useContext, useEffect } from 'react';
import { ThemeContext, LocaleContext } from '../../context';
import Row from '../Row/Row';
import useFormInput from '../hooks/useFormInput';
import './card.scss';

export default function CardWithHooks() {
  const name = useFormInput('Jubileu');
  const lastname = useFormInput('Pipoca');
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);
  
  useEffect(() => {
    document.title = name.value + ' ' + lastname.value;
  });

  return (
    <section className={theme}>
      <Row label="Nome">
        <input id="name" {...name} />
      </Row>
      <Row label="Sobrenome">
        <input id="lastname" {...lastname} />
      </Row>
      <Row label="Idioma">
        <p>{locale}</p>
      </Row>
    </section>
  );
}

{% endhighlight %}

## Considerações finais

Apesar que Hooks do react ainda são uma versão alpha, o Facebook tem usado a cerca de 1 mês em produção já, então não serão esperados grandes problemas, mas eles alertam para que você não reescreva seus componentes usando hooks ainda, pois a feature ainda é uma proposta e muita coisa pode mudar.

Alguns pontos muito importantes sobre os hooks:

- Os hooks são 100% retrocompatívies, ou seja, não vão quebrar seus componentes atuais;
- São completamente opcionais;
- Eles podem ser usados lado a lado com class components;
- Novas APIs propostas;
- O pessoal do React precisa do feedback dos desenvolvedores;

Caso queira entender mais sobre os Hooks, acesse a [documentação oficial](https://reactjs.org/docs/hooks-intro.html){:target="_blank"}{:rel="noopener"} e [contribua para a evolução dos hooks](https://github.com/reactjs/rfcs/pull/68){:target="_blank"}{:rel="noopener"}.

O exemplo que criamos aqui é bem simples, mas é uma boa introdução aos Hooks. Ele está [diponível no github](https://github.com/evertonstrack/react-hooks){:target="_blank"}{:rel="noopener"}, baixe e faça seus testes.

Caso tenha dúvidas, comente aqui embaixo que terei o prazer de responder.

Até mais e obrigado pelos peixes.