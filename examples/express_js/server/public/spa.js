const authorizationUrl =
  "http://localhost:8080/wallet?client_id=http%3A%2F%2Flocalhost%3A3000%2Fspa.html%23%2Fcallback&scope=openid&response_type=id_token&response_mode=fragment";

var $iframe = document.createElement("iframe");
$iframe.src = authorizationUrl;
$iframe.sandbox = "allow-top-navigation allow-scripts";

document.body.append($iframe);

// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };
function checkAuth() {
  console.log(window.location.hash);
  const params = new URLSearchParams(window.location.hash);
  const idToken = params.get("id_token");
  console.log(idToken);
}
const Wat = { template: "<div>really</div>", created: checkAuth };

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: "/", component: Wat },
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
});

// https://github.com/vuejs/vue-router/issues/1849
window.addEventListener(
  "hashchange",
  () => {
    var currentPath = window.location.hash.slice(1);
    router.push(currentPath);
  },
  false
);

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router
}).$mount("#app");
