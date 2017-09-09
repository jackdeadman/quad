setTimeout(() => {
    const power = document.getElementById('power');
    const refresh = document.getElementById('refresh');

    power.addEventListener('click', lightdm.shutdown);
    refresh.addEventListener('click', lightdm.restart);

    power.addEventListener('keydown', e => {
        if (e.keyCode === 13) {
            lightdm.shutdown();
        }
    });

    refresh.addEventListener('keydown', e => {
        if (e.keyCode === 13) {
            lightdm.restart();
        }
    });
}, 1);
