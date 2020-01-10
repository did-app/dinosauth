const authorizationUrl =
  "http://localhost:8080/wallet?client_id=http%3A%2F%2Flocalhost%3A3000%2Fspa.html%23%2Fcallback&scope=openid&response_type=id_token&response_mode=fragment";

var $iframe = document.createElement("iframe");
$iframe.src = authorizationUrl;
$iframe.sandbox = "allow-top-navigation allow-scripts";

document.body.append($iframe);

const Home = { template: "<div>Home page</div>" };
const Callback = {
  data: function() {
    return {
      id: null
    };
  },
  template: "<p>hello {{ id }}</p>",
  beforeMount: checkAuth
};
const routes = [
  { path: "/", component: Home },
  { path: "/callback", component: Callback }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});
function checkAuth() {
  // console.log(this.$route.hash.substring(1));
  const params = new URLSearchParams(this.$route.hash.substring(1));
  const idToken = params.get("id_token");
  console.log(idToken);
  this.id = "12323";
  // Vue.set(this.data, "id", "123");
  // router.replace({ path: "/" });
}

// https://github.com/vuejs/vue-router/issues/1849
window.addEventListener(
  "hashchange",
  () => {
    var currentPath = window.location.hash.slice(1);
    router.push(currentPath);
  },
  false
);

const app = new Vue({
  router
}).$mount("#app");
