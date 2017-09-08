const page = {
    height: document.body.offsetHeight,
    width: document.body.offsetWidth
};

const main = document.getElementById('main-container');

function createBox() {
    const left = (Math.random() * page.width) - 200;
    const bottom = Math.random() * page.height;
    const div = document.createElement('div');
    div.className = 'floating-box';
    div.style.left = `${left}px`;
    div.style.bottom = `${bottom}px`;

    const presense = Math.random();

    div.style.opacity = presense * 0.5
    const size = presense * 250;

    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    main.appendChild(div);
    return div;

}

burst();
setInterval(() => {
    burst();
}, 14000);

setInterval(() => {
    foo();
}, 1000);

function foo() {
    const div = createBox();
    setTimeout(() => {
        div.parentNode.removeChild(div);
    },10000);
}

function burst() {
    for (var i = 0; i < 10; i++) {
        foo()
    }

    setTimeout(() => {
        for (var i = 0; i < 10; i++) {
            foo()
        }
        setTimeout(() => {
            for (var i = 0; i < 10; i++) {
                foo()
            }
        }, 1000);
    }, 1000);
}

const login = document.getElementById('login');
const password = document.getElementById('password');


function processlogin() {
    main.classList.add('hidden');
}


password.addEventListener('keydown', (e) => {


    if (e.keyCode === 13) {
        if (password.value === 'password') {
            processlogin();
        } else {
            login.classList.add('invalid');
            password.value = '';
        }
    }

});

login.addEventListener('animationend', () => {
    login.classList.remove('invalid');
});
