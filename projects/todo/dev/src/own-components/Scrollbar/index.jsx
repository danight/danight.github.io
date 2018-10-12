import React, { Component } from 'react';
import './index.css';

function getCoords(elem) {
    const rect = elem.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset
    }
}

export default class Scrollbar extends Component {
    componentDidUpdate() {
        if (this.content.offsetHeight > this.props.maxHeight) {
            if (!this.scrollbar.slideTrack) {
                const slideTrack = document.createElement('div');
                slideTrack.className = 'slide-track scrollbar__slide-track';

                const thumb = document.createElement('div');
                thumb.className = 'slide-track__thumb';
                thumb.addEventListener('mousedown', this.handleMouseDown.bind(this));
                thumb.ondragstart = () => false;

                slideTrack.appendChild(thumb);

                this.scrollbar.slideTrack = 
                    this.scrollbar.appendChild(slideTrack);
                this.scrollbar.thumb = thumb;
            }

            this.scrollbar.thumb.style.height =
                Math.max(this.props.maxHeight / this.content.scrollHeight * 100, 16) + '%';
            
                this.scrollbar.classList.add('scrollbar_active');
        } else {       
            if (this.scrollbar.slideTrack) {
                this.scrollbar.classList.remove('scrollbar_active');
            }
        }
    }

    moveTo(e) {
        let offset = e.pageY - 
            getCoords(this.scrollbar.slideTrack).top - this.scrollbar.thumb.shiftY;
        
        const rightEdge = this.scrollbar.slideTrack.offsetHeight - this.scrollbar.thumb.offsetHeight;

        if (offset < 0) offset = 0;
        if (offset > rightEdge) offset = rightEdge;

        const scrollingInPercent = offset * 100 / 
            (this.scrollbar.slideTrack.offsetHeight - this.scrollbar.thumb.offsetHeight );
            
        this.content.scrollTop = (this.content.scrollHeight - this.content.offsetHeight) / 100 * scrollingInPercent;
        this.scrollbar.thumb.style.top = offset + 'px';
    }
    
    handleMouseMove(e) { this.moveTo(e) }
    
    handleSelection(e) { e.preventDefault() }
    handleMouseUp() {
        document.removeEventListener('mousedown', this.removeSelectionHandler);
        document.removeEventListener('mousemove', this.removeMouseMoveHandler);
        document.removeEventListener('mouseup', this.removeMouseUpHandler);
    }
    
    handleMouseDown(e) {
        e.target.shiftY = e.pageY - getCoords(e.target).top;

        this.removeMouseMoveHandler = this.handleMouseMove.bind(this);
        document.addEventListener('mousemove', this.removeMouseMoveHandler);
        
        this.removeSelectionHandler = this.handleSelection.bind(this);
        document.addEventListener('mousedown', this.removeSelectionHandler);
        
        this.removeMouseUpHandler = this.handleMouseUp.bind(this);
        document.addEventListener('mouseup', this.removeMouseUpHandler)
    }

    render () {
        const { children, maxHeight } = this.props;
        return (
            <div 
                ref={el => this.scrollbar = el}
                style={{ maxHeight: `${maxHeight}px` }} 
                className="scrollbar"
            >
                <div 
                    ref={el => this.content = el}
                    style={{ maxHeight: `${maxHeight}px`}}
                    className="scrollbar__content" >
                    {children}
                </div>
            </div>
        )
    }
}