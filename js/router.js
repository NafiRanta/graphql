console.log('router.js loaded');
let urlRoutes = {
    '/index.html': {
        template: "<dashboard-page></dashboard-page>"
    },
    '/login': {
        template: "<login-page></login-page>"
    },
};


const urlRoute = (path) => {
    console.log(path)
    urlLocationHolder()
};

const urlLocationHolder = async () => {
    var location = window.location.pathname;
    console.log(location)

    var jwt = localStorage.getItem('jwt');

    if (jwt == null && location == '/') {
        location = '/login';
    };
    console.log("location", location)
   
    const route = urlRoutes[location];
    console.log("route", route)
    const htmml = route.template;
    document.getElementById('main').innerHTML = htmml;
    
};

window.route = urlRoute;
urlLocationHolder();