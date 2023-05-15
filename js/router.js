console.log('router.js loaded');
const urlRoutes = {
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
    const location = window.location.pathname;
    const jwt = localStorage.getItem('jwt');
    console.log("location", location)
    console.log("jwt", jwt)

    if (jwt == null && location == '/graphql/') {
        console.log("no jwt and index.html")
        location = '/login';
    };
    console.log("location2", location)
   
    var route = urlRoutes[location];
    console.log("route", route)
    console.log("hello")
    console.log("route template", route.template)
    console.log("world")
   
    
    document.getElementById('main').innerHTML = route.template
    
    // var htmml = route.template;
    // document.getElementById('main').innerHTML = htmml;
    
};

window.route = urlRoute;
urlLocationHolder();