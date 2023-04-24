class Dashboard extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
        
            <h1>Hello</h1>
        `;
        
    }
}

customElements.define("dashboard-page", Dashboard);