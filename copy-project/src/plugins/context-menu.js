// plugins/context-menu.js
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("no-context-menu", {
    mounted(el) {
      el.addEventListener("contextmenu", (event) => event.preventDefault());
    },
  });
});
