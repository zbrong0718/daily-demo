(function(){
    var target;
    var noop = function() {};

    Element.prototype.startDrag = function() {
        this.addEventListener('mousedown', mouseDownHandler, false);
        this.addEventListener('mouseup', mouseUpHandler, false);
        document.addEventListener('mousemove', dragHandler,false);
        this.onselectstart = new Function('return false;');
    };

    function mouseDownHandler(e){
        target = this;
        this.dx = e.clientX - this.offsetLeft,
        this.dy = e.clientY - this.offsetTop;
        this.style.setProperty('position','absolute');
        this.style.setProperty('cursor','move');
    }

    function mouseUpHandler() {
        target = null;
        this.style.setProperty('cursor', '');
    }

    function dragHandler(e) {
        if(!target) return;
        var posX = e.clientX - target.dx,
            posY = e.clientY - target.dy;
        target.style.setProperty('left',posX+'px');
        target.style.setProperty('top',posY+'px');
    };

    Element.prototype.stopDrag = function() {
        this.removeEventListener('mousedown', mouseDownHandler);
        this.removeEventListener('mouseup', mouseUpHandler);
        document.removeEventListener('mousemove', dragHandler);
        this.onselectstart = noop;
    }

})();