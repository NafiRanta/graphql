console.log('router.js loaded');
let urlRoutes = {
    '/graphql/': {
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
   
    var route = urlRoutes[location];
    console.log("route", route)
    if (location == '/login') {
        document.getElementById('main').innerHTML = "<login-page></login-page>"
    }
    document.getElementById('main').innerHTML = "<dashboard-page></dashboard-page>"
    
    // var htmml = route.template;
    // document.getElementById('main').innerHTML = htmml;
    
};

window.route = urlRoute;
urlLocationHolder();