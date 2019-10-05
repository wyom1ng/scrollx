document.addEventListener('DOMContentLoaded', evt => {
    const layers = document.querySelectorAll('.parallax');
    const main = document.getElementById('main');
    const maxY = 0;
    const minY = -(10000 - window.innerHeight); // negative (pageheight - viewport height)

    const transformElement = (element, pos) => {
        element.setAttribute('style', `transform: translate3d(0px, ${pos}px, 0px)`);
    };
    const tweenElement = (element, pos) => {
        TweenLite.to(element, 0.3, {top: pos});
    };

    const onDrag = moveElementFn => {
        moveElementFn = moveElementFn instanceof Function ? moveElementFn : transformElement;
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            const speed = parseInt(layer.getAttribute('data-speed'), 10) / 100;
            const yPos = draggable.y * speed + 1;   // offset by one pixel to bypass transform glitches (white lines)
            moveElementFn(layer, yPos);
        }
    };

    const draggable = Draggable.create(main, {
        allowContextMenu: true,
        type: 'y',
        bounds: { maxY, minY },
        cursor: 'default',
        throwProps: true,
        onDrag,
        onThrowUpdate: onDrag,
        zIndexBoost: false
    })[0];

    document.addEventListener('wheel', evt => {
        draggable.y -= evt.deltaY;
        if (draggable.y > maxY) draggable.y = maxY;
        if (draggable.y < minY) draggable.y = minY;
        tweenElement(main, draggable.y);
        onDrag(tweenElement);
    })
});