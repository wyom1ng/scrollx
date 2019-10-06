document.addEventListener('DOMContentLoaded', evt => {
    const layers = document.querySelectorAll('.parallax');
    const main = document.getElementById('pl-4');
    const maxX = 0;
    const minX = -(7453 - window.innerWidth); // negative (page width - viewport width)
    console.log(minX);

    const transformElement = (element, pos) => {
        element.style.transform = `translate3d(${pos}px, 0px, 0px)`;
    };

    const tweenElement = (element, pos) => {
        TweenMax.to(element, .25, {
                x: pos,
                ease: Power2.easeOut
            },
        );
    };

    const onDrag = moveElementFn => {
        moveElementFn = moveElementFn instanceof Function ? moveElementFn : transformElement;
        const percentage = draggable.x / -minX;
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            const xPos = (layer.offsetWidth - window.innerWidth) * percentage;   // offset by one pixel to bypass transform glitches (white lines)
            moveElementFn(layer, xPos);
        }
    };

    const draggable = Draggable.create(main, {
        allowContextMenu: true,
        type: 'x',
        bounds: {maxX, minX},
        cursor: 'default',
        throwProps: true,
        onDrag: () => requestAnimationFrame(onDrag),
        onThrowUpdate: () => requestAnimationFrame(onDrag),
        zIndexBoost: false
    })[0];


    let mainAnim, layerAnim;
    document.addEventListener('wheel', evt => {
        if (mainAnim) {
            cancelAnimationFrame(mainAnim);
        }
        if (layerAnim) {
            cancelAnimationFrame(layerAnim)
        }

        draggable.x -= evt.deltaY * 2;
        if (draggable.x > maxX) draggable.x = maxX;
        if (draggable.x < minX) draggable.x = minX;
        mainAnim = requestAnimationFrame(() => tweenElement(main, draggable.x));
        layerAnim = requestAnimationFrame(() => onDrag(tweenElement));
    })
});