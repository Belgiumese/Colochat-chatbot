<template>
  <div id="app">
    <!-- 
      This is the nav bar with links to conponents. These pages are specified
      in the router.js file. -->
    <div id="nav">
      <router-link to="/">CHAT</router-link> |
      <router-link to="/faq">HELP</router-link> |
      <router-link to="/info">RESOURCES</router-link> |
      <router-link to="/languages">LANGUAGES</router-link>
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
  font-family: "Open Sans", sans-serif;
  border: none;
  outline: none;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.margin-auto {
  margin: auto;
}

.svg-icon {
  width: 16px;
  height: 16px;
  color: inherit;
  vertical-align: middle;
  fill: none;
  stroke: currentColor;
}

.svg-fill {
  fill: currentColor;
  stroke: none;
}
</style>

<style lang="scss">
#nav {
  background: white;
  height: 40px;
  font-family: "Averia Serif Libre", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #958781;
  border-bottom: 2px solid #be9689;
  box-sizing: border-box;

  a {
    padding: 0 20px;
    font-size: 1.2em;
    text-decoration: none;
    color: #958781;

    &.router-link-exact-active {
      color: #b83a75;
      font-weight: 600;
    }
  }
}

@media only screen and (max-width: 1000px) {
  #nav {
    a {
      font-size: 0.9em;
    }
  }

  p,
  li,
  a {
    font-size: 0.9em !important;
  }
}
</style>



