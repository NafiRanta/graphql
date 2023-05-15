console.log('router.js loaded');
let urlRoutes = {
    '/': {
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
    var jwt = localStorage.getItem('jwt');
    console.log("location", location)
    
    console.log("jwt", jwt)
    if (jwt == null && location == '/graphql/') {
        console.log("no jwt and index.html")
        location = '/login';
    };
    console.log("location2", location)
   
    const route = urlRoutes[location];
    console.log("route", route)
    const htmml = route.template;
    document.getElementById('main').innerHTML = htmml;
    
};

window.route = urlRoute;
urlLocationHolder();