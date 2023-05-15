console.log('router.js loaded');
const urlRoutes = {
    '/graphql/': {
        template: "<dashboard-page></dashboard-page>"
    },
    '/login': {
        template: "<login-page></login-page>"
    },
};

const urlLocationHolder = async () => {
    const path = window.location.pathname;
    const jwt = localStorage.getItem('jwt');
    console.log("path", path);
    console.log("jwt", jwt);

    let location = path;
    if (jwt == null && path === '/graphql/') {
        location = '/login';
    }
    console.log("location2", location);
   
    const route = urlRoutes[location];
    console.log("route", route);
    console.log("hello");
    console.log("routetemplate", route.template)
    console.log("world");
   
    document.getElementById('main').innerHTML = route.template;

};

const urlRoute = (path) => {
    console.log(path);
    urlLocationHolder();
};

window.route = urlRoute;
urlLocationHolder();
