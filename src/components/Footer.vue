<template>
  <div class="footer">
    <p>© {{ new Date().getFullYear()}} shuuuu </p>
  </div>
</template>

<style scoped>
.footer{
  left: 0;
  margin: 0;
  margin-top: 20px;
  padding-bottom: 40px;
  position: relative;/* ←相対位置 */
  box-sizing: border-box;
  /* ↑ヘッダーやフッターを含むすべての要素の高さ＝min-height:100vhになるように指定 */
}
.footer p {
  position: absolute;/* ←絶対位置 */
  text-align: center;
  bottom: 0;
  line-height: 40px;
  font-size: 15px;
  margin: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.70);
}
</style>
