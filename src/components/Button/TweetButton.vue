<template>
  <div>
    <a class="tweet-button twitter-share-button" href="https://twitter.com/intent/tweet" data-text="年賀状をWebアプリで作ってみた" :data-url="'https://newyearmaker.netlify.app/#'+$route.path" data-lang="ja"><i class="fab fa-twitter"></i> ツイート</a>
  </div>
</template>

<style scoped>
a {
  position: relative;
  background-color: #55acee;
  font-weight: 500;
  padding: 1px 8px 1px 6px;
  cursor: pointer;
  border: 2px solid #55acee;
  border-radius: 3px;
  color: white;
  line-height: 30px;
  font-size: 12px;
  text-decoration: none;
}
a:hover {
  background-color:  #4791c9;
}
</style>
