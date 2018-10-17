function getCoords(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + pageXOffset,
        top: rect.top + pageYOffset,
        bottom: rect.bottom + pageYOffset
    }
}

class Palette {
    constructor({ elem, props }) {
        this.elem = elem;
        this.props = props;
        this.colors = { red: 0, green: 0, blue: 0 };
    }

    setColor({ type, percent }) {
        this.colors[type] = 255 / 100 * percent;
        const { elem, props, colors } = this,
            { red, green, blue } = colors;

        elem.style[props] = `rgb(${red}, ${green}, ${blue})`;
    }
}

class Slider {
    constructor() {
        document.addEventListener('mousedown',
            this.handleMouseDown.bind(this));

    }

    dispatchChange(percent) {
        const evt = new CustomEvent('change-color', {
            bubbles: true,
            cancelable: true,
            detail: { type: this.thumb.slider.dataset.unitColor, percent }
        });

        this.thumb.dispatchEvent(evt);
    }

    moveTo(e) {
        const computed = getComputedStyle(this.thumb.slider);
        let offset = getCoords(this.thumb.slider).bottom -
            e.pageY - this.thumb.shiftY - parseInt(computed.borderBottomWidth),
            topEdge = this.thumb.slider.offsetHeight -
                this.thumb.offsetHeight + parseInt(computed.borderTopWidth);

        if (offset < -parseInt(computed.borderBottomWidth))
            offset = -parseInt(computed.borderBottomWidth);
        if (offset > topEdge) offset = topEdge;

        const percent = offset * 100 / (this.thumb.slider.offsetHeight - this.thumb.offsetHeight);

        if (!this.thumb.palette) {
            this.thumb.palette = new Palette({
                elem: this.thumb.statusBar,
                props: 'backgroundColor'
            });
        }

        this.thumb.style.bottom = offset + 'px';
        this.thumb.palette.setColor({ type: this.thumb.slider.dataset.unitColor, percent });

        this.thumb.statusBar.style.height = percent + '%';
        this.dispatchChange(percent);
    }

    handleMouseMove(e) { this.moveTo(e) }

    handleMouseUp() {
        document.removeEventListener('mousemove', this.removeHandleMouseMove);
        document.removeEventListener('mouseup', this.removeHandleMouseUp);
    }

    handleMouseDown(e) {
        if (!e.target) return;

        const thumb = e.target.closest('.slider__thumb');
        if (!thumb) return;

        const slider = thumb.closest('.slider');
        if (!slider || slider && !slider.contains(thumb)) return;

        thumb.shiftY = e.pageY - getCoords(thumb).top;
        thumb.slider = slider;
        thumb.statusBar = slider.querySelector('.slider__status-bar');
        this.thumb = thumb;

        this.removeHandleMouseMove = this.handleMouseMove.bind(this);
        document.addEventListener('mousemove', this.removeHandleMouseMove);

        this.removeHandleMouseUp = this.handleMouseUp.bind(this);
        document.addEventListener('mouseup', this.removeHandleMouseUp);
    }
}

new Slider();
const palette = new Palette({
    elem: document.body,
    props: 'backgroundColor'
});

document.addEventListener('change-color', ({ detail }) => {
    palette.setColor({ ...detail });
});