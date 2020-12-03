<template>
<div id="app">
  <div class="header">
    <router-link to="/">
    </router-link>
    <div class="title">
      <h1>Falsk Correspondance</h1>
    </div>
    <div class="pageWrap">
      <router-link class="navlink" to="/">Home</router-link>
      <router-link class="navlink" to="/timeline">Archives</router-link>
      <router-link class="navlink" to="/admin">Admin</router-link>
      </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <!-- <router-link to="/admin">Admin</router-link> -->
    <p></p>
    <a href="https://github.com/mintyfreshfish/creative-mongo">github repository</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
  
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #F3E9D2;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #121420;
  color: #F3E9D2;
  justify-content: space-between;
}

.title {
  margin-top: 5px;
  margin-right: 100px;
  position: absolute;
  /* align-self: flex-start; */
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

.navlink {
  font-size: 24px;
  font-weight: 800;
  margin: 30px;
  color: white;
  text-decoration: none;
}

.navlink:hover {
  color: #F3E9D2;
}



.pageWrap {
  padding: 30px;
  text-align: right;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #121420;
  font-size: 12px;
  text-align: center;
}

.footer a {
  color: #F3E9D2;
  text-decoration: none;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
