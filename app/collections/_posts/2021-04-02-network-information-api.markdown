---
layout: post
title: "Network Information API: Obtendo dados da conexão do usuário"
description: "A Network Information API é uma Web Api que nos fornece dados sobre a conexão do usuário, como largura de banda, tipo de conexão, dentre outros. Vamos descobrir como usá-la!"
date: 2021-04-02 09:00:00 -0300
bodyClass:
tags: ['performance', 'web api', 'javascript']
image: "/assets/images/posts/network-information-api/velocidade-da-conexao-de-internet.jpg"
---

Frequentemente usamos largura e altura da tela do usuário para exibir ou não conteúdos diferentes.  E se pudéssemos saber a qualidade da conexão usada pelo usuário e otimizar a performance da nossa aplicação para a conexão dele?

Vou te contar como é possível, e é mais simples do que parece.

## O que é a Network Information API?


A **Network Information API** (API de informações da rede) é uma Web Api, que como o nome já diz, nos fornece dados sobre a conexão do usuário, como largura de banda, tipo de conexão, dentre outros.

Ainda é uma API experimental e a [especificação está na fase de rascunho](https://wicg.github.io/netinfo/){:target="_blank"}{:rel="noopener"}, ou seja, nem todos os navegadores tem suporte e sua interface ainda pode mudar conforme a sua especificação evoluir. Mas isso não nos impede de usufruir da Network Information API nos navegadores que já suportam.

### Como acessar os dados da conexão do usuário?

Para termos acesso aos dados da conexão do usuário, precisamos acessar os dados no objeto navigator  do navegador.

{% highlight javascript %}
const connection = navigator.connection;
{% endhighlight %}

Para usarmos em outros navegadores, podemos usar os alias de cada navegador:

{% highlight javascript %}
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
{% endhighlight %}

Com esse objeto connection  temos acesso as seguintes informações:

- **downlink**: A largura de banda estimada em megabits por segundo.
- **effectiveType**: O tipo de conexão, "slow-2g", "2g", "3g", "4g"
- **rtt**: O tempo estimado de "ida e volta" da conexão atual
- **saveData**: Se o navegador ou dispositivo do usuário está com a opção de "Save data" ativada.


### Casos de uso da Network Information API


Um ótimo exemplo de uso que podemos citar, seria fazer ou não o pré-carregamento de um vídeo com base na conexão do usuário.  Então poderíamos implementar algo assim:

{% highlight javascript %}
let preloadVideo = true;
let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if (connection) {
  if (connection.effectiveType !== '4g') {
    // Se o effectiveType for "slow-2g", "2g" ou "3g", não faz o pré-carregamento do vídeo
    preloadVideo = false;
  }
}
{% endhighlight %}

No exemplo acima, temos uma variável `preloadVideo` que inicia com o valor `true`. Após, verificamos a conexão do usuário. Caso o `effectiveType` seja diferente de `4g`, mudamos o valor da variável para `false` e, consequentemente, não fazemos o pré-carregamento do vídeo.

### Escutando mudanças no tipo de conexão


Podemos ainda adicionar uma escuta de evento para saber quando há uma mudança na conexão do usuário.

{% highlight javascript %}
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
let type = connection.effectiveType;
function updateConnectionStatus() {
  console.log("Conexão alterada de " + type + " para " + connection.effectiveType);
  type = connection.effectiveType;
}
connection.addEventListener('change', updateConnectionStatus);
{% endhighlight %}


### Bônus

Para garantir que nosso código não vai quebrar nossa aplicação, caso o navegador não tenha suporte, podemos facilmente testar se o navegador tem suporte a Network Information API da seguinte forma:

{% highlight javascript %}
if( "connection" in navigator ) {
  // Nosso código vai aqui
}
{% endhighlight %}

Podemos também adicionar no nosso teste as vendors dos outros navegadores:

{% highlight javascript %}
if( "connection" in navigator || "mozConnection" in navigator || "webkitConnection" in navigator) {
  // Nosso código vai aqui
}
{% endhighlight %}

Aplicando isso ao nosso exemplo, de fazer o pré-carregamento do vídeo, nosso código ficaria assim:

{% highlight javascript %}
let preloadVideo = true;

// Verifica o suporte a Network Information API
if( "connection" in navigator || "mozConnection" in navigator || "webkitConnection" in navigator) {

  let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) {
    if (connection.effectiveType !== '4g') {
      preloadVideo = false;
    }
  }
}
{% endhighlight %}

Simples e direto! Assim garantimos que nosso código continue funcionando mesmo que o navegador não suporte a funcionalidade ou caso a interface mude no futuro.

## Conclusão

Apesar da especificação da **Network Information API** ainda ser um rascunho, ela já está implementada em alguns navegadores e já pode ser usada. Podemos usá-la nos navegadores que a suportam, sem que tenha problemas com os outros navegadores e sem que quebre nossa aplicação, caso a interface dela venha mudar posteriormente.

Mais uma forma de otimizarmos nossas aplicações para o nosso usuário.

### Links

- [Network Information API especification (em inglês)](https://wicg.github.io/netinfo/){:target="_blank"}{:rel="noopener"}
- [Network Information API - MDN (em inglês)](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API){:target="_blank"}{:rel="noopener"}
- [Network Information API - Can I Use (em inglês)](https://caniuse.com/?search=navigator.connection){:target="_blank"}{:rel="noopener"}

Até mais e obrigado pelos peixes.
