console.log('router.js loaded');
const urlRoutes = {
    '/graphql/': {
        template: "<dashboard-page></dashboard-page>"
    },
    '/': {
        template: "<dashboard-page></dashboard-page>"
    },
    '/login': {
        template: "<login-page></login-page>"
    }
};

const urlLocationHolder = async () => {
    const path = window.location.pathname;
    const jwt = localStorage.getItem('jwt');
    let location = path;
    console.log("location", location)
    if (jwt == null && (path === '/graphql/' || path == '/')) {
        location = '/login';
    }
    const route = urlRoutes[location];
    console.log("route", route)
    document.getElementById('main').innerHTML = route.template;

};
const urlRoute = (path) => {
    urlLocationHolder();
};
window.route = urlRoute;
urlLocationHolder();
