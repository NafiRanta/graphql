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
    let location = path;
    if (jwt == null && path === '/graphql/') {
        location = '/login';
    }
    const route = urlRoutes[location];
    document.getElementById('main').innerHTML = route.template;

};
const urlRoute = (path) => {
    urlLocationHolder();
};
window.route = urlRoute;
urlLocationHolder();
