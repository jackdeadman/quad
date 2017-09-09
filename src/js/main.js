class UserWrapper {
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

    get image() {
        return this.user.image || "images/default-avatar.png";
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
            profileName: document.querySelector('.profile__name'),
            profileImage: document.getElementById('profile-img')
        };

        this.components.profileImage.onload = function() { show(this); };

        this._bindHandlers();
        this.currentUser = null;
    }

    loadUser(user) {
        this.currentUser = user;
        this._authenticate();
        this.components.profileName.innerHTML = user.display_name;
        this.components.profileImage.src = user.image;
    }

    incorrectPassword() {
        password.value = '';
        this._authenticate();
        this._stopLoading();
        show(this.components.passwordIncorrect)
        this._emthesiseLogin();
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

    _processLogin() {
        this._startLoading();

        if (lightdm.inBrowser) {
            setTimeout(() => {
                this.incorrectPassword();
            }, 1000);
        }

        lightdm.respond(password.value);
    }
}

// lightdn is undefined otherwise
let login;
setTimeout(() => {
    login = new Login();
    login.loadUser(new UserWrapper());
}, 1)

function authentication_complete() {
    if (lightdm.is_authenticated) {
        lightdm.start_session_sync();
	} else {
        login.incorrectPassword();
	}
}
