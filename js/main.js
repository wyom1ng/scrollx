document.addEventListener('DOMContentLoaded', evt => {
    const layers = document.querySelectorAll('.parallax');

    const onDrag = () => {
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            const speed = parseInt(layer.getAttribute('data-speed'), 10) / 100;
            const yPos = draggable.y * speed + 1;
            layer.setAttribute('style', `transform: translate3d(0px, ${yPos}px, 0px)`);
        }
    };

    const draggable = Draggable.create('#main', {
        allowContextMenu: true,
        type: 'y',
        bounds: { maxY: 0, minY: -(10000 - window.innerHeight)},
        cursor: 'default',
        throwProps: true,
        onDrag,
        onThrowUpdate: onDrag,
        zIndexBoost: false
    })[0];
});