class Login extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
        <div class = "loginPage" id="loginPage">
        <!--LEFT-->
        <div class="container__left">
            <div class="main__logo-title">
                <a href="" class="mainlogo__link" id="mainlogo">
                    <h1>SkillStack</h1>
                    <h6>Track Your Progress</h6>
                </a>
            </div>
        </div>
        <!--RIGHT-->
        <div class="container__right">
            <!------------------------------------LOGIN FORM----------------------------------->
            <form class="form" id="login">
                <!--title-->
                <h1 class="form__title">Login</h1>
                <!--<div class="form__message form__message--error" id="loginErrorMessage"></div>-->
        
                <div class="form__input-group">
                    <!--username-->
                  <!--   <h2>Username</h2> -->
                    <div class="form__input-error-message" id="loginUsernameErrMsg"></div>
                    <input type="text" class="form__input" autofocus placeholder="Username" name="loginUsername" id="username" required>
                </div>
 
                <div class="form__input-group">
                    <!--password-->
                    <!-- <h2>Password</h2> -->
                    <div class="form__input-error-message" id="loginPasswordErrMsg"></div>
                    <input type="password" class="form__input" autofocus placeholder="Password" id="password" name="password" required>
                    
                </div>
 
                <!--submit button-->
                <input type="submit" class="form__button" id="loginSubmit" value="Submit">
            </form>`
    }
}

customElements.define("login-page", Login);






    