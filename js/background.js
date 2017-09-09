
function removeNode(node) {
    node.parentNode.removeChild(node);
}


class Background {

    constructor(context, noBlocksInBurst=10) {
        this.context = document.querySelector(context);
        this.page = {
            height: document.body.offsetHeight,
            width: document.body.offsetWidth
        };
        this.noBlocksInBurst = noBlocksInBurst;
    }

    start() {
        this.burst();
        setInterval(() => {
            this.burst();
        }, 14000);

        setInterval(() => {
            this.addBlockToScreen()
        }, 2000);
    }


    burst() {
        for (var i = 0; i < this.noBlocksInBurst; i++) {
            this.addBlockToScreen()
        }

        setTimeout(() => {
            for (var i = 0; i < this.noBlocksInBurst; i++) {
                this.addBlockToScreen()
            }
            setTimeout(() => {
                for (var i = 0; i < this.noBlocksInBurst; i++) {
                    this.addBlockToScreen()
                }
            }, 1000);
        }, 1000);
    }

    addBlockToScreen() {
        const div = this._createBox();
        this.context.appendChild(div);
        return setTimeout(() => removeNode(div), 10000);
    }

    _createBox() {
        const page = this.page;
        const pos = {
            left: (Math.random() * page.width) - 200,
            bottom: Math.random() * page.height
        };

        const div = document.createElement('div');
        div.className = 'floating-box';
        div.style.left = `${pos.left}px`;
        div.style.bottom = `${pos.bottom}px`;

        const presense = Math.random();

        div.style.opacity = presense * 0.5
        const size = presense * 250;

        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
        return div;
    }

}

const bg = new Background('#main-container');
bg.start();
