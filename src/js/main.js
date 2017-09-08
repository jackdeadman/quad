// lightdm is not defined immediately real one is being used

class User {
    constructor(user=null) {
        if (user === null) {
            user = lightdm.users[0];
        }

        this.user = user;
    }

    get display_name() {
        return this.user.display_name;
    }

    get username() {
        return this.user.username;
    }
}

function hide(node) {
    node.classList.add('hidden');
}

function show(node) {
    node.classList.remove('hidden');
}

class Login {

    constructor(context) {
        this.context = document.querySelector(context);
        this.components = {
            login: document.getElementById('login'),
            password: document.getElementById('password'),
            loginDetails: document.getElementById('login-details'),
            loginLoader: document.getElementById('login-loader'),
            passwordIncorrect: document.getElementById('password-incorrect'),
            profileName: document.querySelector('.profile__name')
        };

        this._bindHandlers();
        this.currentUser = new User();
    }

    loadUser(user) {
        this.currentUser = user;
        this._authenticate();
        this.components.profileName.innerHTML = user.display_name;
    }

    _authenticate() {
        lightdm.authenticate(this.currentUser.username);
    }

    _bindHandlers() {
        this.components.login.addEventListener('submit', e => {
            e.preventDefault();
            this._processLogin();
        });
    }

    _startLoading() {
        hide(this.components.loginDetails);
        show(this.components.loginLoader);
        this.components.password.blur();
        this.components.password.disabled = true;
    }

    _stopLoading() {
        show(this.components.loginDetails);
        hide(this.components.loginLoader);
        this.components.password.disabled = false;
        // Common hack
        setTimeout(() => password.focus(), 1);
    }

    _emthesiseLogin() {
        const login = this.components.login;
        login.classList.add('invalid');
        login.addEventListener('animationend', function handler() {
            login.removeEventListener('animationend', handler);
            login.classList.remove('invalid');
        });
    }

    _incorrectPassword() {
        password.value = '';
        this._authenticate();
        this._stopLoading();
        show(this.components.passwordIncorrect)
        this._emthesiseLogin();
    }

    _processLogin() {
        this._startLoading();

        if (lightdm.inBrowser) {
            setTimeout(() => {
                this._incorrectPassword();
            }, 1000);
        }

        lightdm.respond(password.value);
    }
}

setTimeout(() => {
    const login = new Login();
    login.loadUser(new User());
},1)
