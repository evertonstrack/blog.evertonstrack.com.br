---
layout: post
title:  "React Fragment: O que é, e por que você deveria usá-lo"
description: "Quantas vezes já nos pegamos em uma aplicação onde o HTML tem muitos elementos, que quando analisamos, ficamos nos perguntando, por que isso está aqui? Hoje vamos tentar resolver isso!"
date:   2020-04-01 13:00:00 -0300
bodyClass: post-javascript
theme-color: "#ffdd18"
tags: ['javascript', 'react']
image: /assets/images/posts/react-fragments/react-fragments.jpg
---

Quantas vezes já nos pegamos em uma aplicação onde o HTML tem muitos elementos, que quando analisamos, ficamos nos perguntando, por que isso está aqui? Hoje vamos falar sobre uma dica bem simples, mas que muitos desenvolvedores acabam não usando. Em linhas gerais, é sobre semântica e organização de código.


## Motivação

Você que trabalha com front-end, ao ter seu primeiro contato com aplicações desenvolvidas com React já deve ter parado e se perguntando: Por que na maioria das aplicações o código tem tantas `divs`?

O que acontece é que o método render(), eu só posso retornar um elemento no nível primário, ou seja, se preciso retornar vários elementos, preciso envolvê-los em um outro elemento. Comumente, uma `div`.

É bem comum um componente retornar uma lista de elementos filhos, veja o exemplo:

{% highlight react %}
class List extends Component {
  render() {
    return (
      <dl>
        <ListItem />
      </dl>
    );
  }
}
{% endhighlight %}

O componente `<ListItem />` precisa mais de 1 elemnto, no caso de uma [definition list](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/dl){:target="_blank"}{:rel="noopener"}, **zero ou mais elementos `<dt>`, cada um seguido de um ou mais elementos `<dd>`**. Se uma `<div>` for usada dentro do método `render()`:

{% highlight react %}
class ListItem extends Component {
  render() {
    return (
      <div>
        <dt>Firefox</dt>
        <dd>A free, open source, cross-platform,
          graphical web browser developed by the Mozilla Corporation
          and hundreds of volunteers.</dd>
      </div>
    );
  }
}
{% endhighlight %}

O HTML resultante do componente `<List />` não seria muito semântico:

{% highlight html %}
<dl>
  <div>
    <dt>Firefox</dt>
    <dd>A free, open source, cross-platform,
      graphical web browser developed by the Mozilla Corporation
      and hundreds of volunteers.</dd>
  </div>
</dl>
{% endhighlight %}

Isso poderia ser pior, no caso de uma `<table>`, onde teriamos o componente pai `<Table />`:

{% highlight react %}
class Table extends Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
{% endhighlight %}

E o componente `<Columns />`:

{% highlight react %}
class Columns extends Component {
  render() {
    return (
      <div>
        <td>Id</td>
        <td>Name</td>
        <td>Email</td>
      </div>
    );
  }
}
{% endhighlight %}

O HTML resultante, além de não ser semântico, seria inválido:

{% highlight html %}
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
{% endhighlight %}

O **React Fragment** resolve esse problema. :)

## React Fragment

Com o lançamento da versão 16.x do React em 2017, o React disponibilizou o `<React.Fragment>` ou somente `<Fragment>`, que nos permite encapsular os elementos filhos sem ter que adicionar um novo elemento ao HTML.

### Usando o React Fragment

Usando nosso mesmo exemplo, nosso componente `<ListItem />` ficaria assim:

{% highlight react %}
class ListItem extends Component {
  render() {
    return (
      <Fragment>
        <dt>Firefox</dt>
        <dd>A free, open source, cross-platform,
          graphical web browser developed by the Mozilla Corporation
          and hundreds of volunteers.</dd>
      </Fragment>
    );
  }
}
{% endhighlight %}

Que resulta no nosso HTML limpo e semântico conforme queriamos:

{% highlight html %}
<dl>
  <dt>Firefox</dt>
  <dd>A free, open source, cross-platform,
    graphical web browser developed by the Mozilla Corporation
      and hundreds of volunteers.</dd>
</dl>
{% endhighlight %}

### Sintaxe curta do React Fragment

Você pode usar também a sintaxe curta para usar o `Fragament`, como se fossem tags vazias:

{% highlight react %}
class ListItem extends Component {
  render() {
    return (
      <>
        <dt>Firefox</dt>
        <dd>A free, open source, cross-platform,
          graphical web browser developed by the Mozilla Corporation
          and hundreds of volunteers.</dd>
      </>
    );
  }
}
{% endhighlight %}

### Considerações importantes

Usando a sintaxe curta, não são suportadas chaves ou quaisquer atributos, já usando a tag `<Fragment />`, como por exemplo para mapear um array e criar uma lista de definições, você pode usar somente o atributo `key`.

{% highlight react %}
// código omitido
render() {
  return (
    <dl>
      {this.props.items.map(item => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
// código omitido
{% endhighlight %}


## Conclusão

Não é algo novo, mas ainda assim é algo bem útil para nos ajudar a construir aplicações melhores. O React tem essa funcionalidade há bastante tempo, mas ainda hoje vemos muitas aplicações com incontáveis `divs` sem a real necessidade.

Além de facilitar a leitura, um HTML com menos elementos, é um HTML mais performático. Mas isso é um assunto para outro momento.

Tudo que falei aqui, você pode conferir na [documentação do React](https://pt-br.reactjs.org/docs/fragments.html){:target="_blank"}{:rel="noopener"} em português.

Dúvidas, sugestões, comenta aqui embaixo! :)

Até mais e obrigado pelos peixes.
