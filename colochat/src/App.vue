<template>
  <div id="app">
    <!-- 
      This is the nav bar with links to conponents. These pages are specified
      in the router.js file. -->
    <div id="nav">
      <router-link to="/">CHAT</router-link> |
      <router-link to="/faq">HELP</router-link> |
      <router-link to="/info">INFO</router-link>
    </div>

    <!-- The router view shows the entire page you're currently on -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style>
/* Any styles here are applied globally to all components. It's unlikely
  that you need to put anything in here. */
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Averia+Serif+Libre");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background: white;
  height: 50px;
  font-family: "Averia Serif Libre", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

#nav a {
  padding: 0 20px;
  font-size: 1.2em;
}

.margin-auto {
  margin: auto;
}
</style>
