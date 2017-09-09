setTimeout(() => {
    const power = document.getElementById('power');
    const refresh = document.getElementById('refresh');

    power.addEventListener('click', lightdm.shutdown);
    refresh.addEventListener('click', lightdm.restart);
}, 1);
