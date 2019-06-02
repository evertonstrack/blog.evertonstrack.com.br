---
layout: blog
title: Blog
description: Um pequeno apanhado sobre o dia-a-dia de um front-end. As frustrações, as alegrias, vida, o universo e tudo mais.
permalink: /blog/
bodyClass: blog-page
---

<!-- breadcrumb - rich snippts -->
<div class="breadcrumb hide">
    <div id="a" itemscope itemtype="http://data-vocabulary.org/Breadcrumb" itemref="b">
        <a href="http://evertonstrack.com.br/" itemprop="url">
            <span itemprop="title">evertonstrack.com.br</span>
        </a> ›
    </div>
    <div id="b" itemscope itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="child">
        <a href="http://evertonstrack.com.br/blog/" itemprop="url">
            <span itemprop="title">Blog</span>
        </a> ›
    </div>
</div>
<!-- /breadcrumb - rich snippts -->

<script type="application/ld+json">
  {
      "@context": "http://schema.org/",
      "@type": "Website",
      "url": "https://evertonstrack.com.br/",
      "name": "Everton Strack Blog",
      "author": {
          "type": "Person",
          "name": "Everton Strack",
          "sameAs": [
              "https://www.instagram.com/evertonstrack/",
              "https://twitter.com/evertonstrack",
              "https://www.linkedin.com/in/evertonstrack/"
          ]
      },
      "description": "{{ site.description }}"
  }
</script>