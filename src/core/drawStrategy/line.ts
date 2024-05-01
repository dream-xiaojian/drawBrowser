class LineStrategy extends StrategyBase<SVGLineElement> {


    /**
     * 因为每次画都只是一个策略
     * 所以在一次画的过程，起点，过程，终点都调用的是一个策略
     * 所以把root svg传进来，或者将结果返回都是可以的
     * 但是更好的还是返回，这个类就可以更纯粹的做画，样式这两件事
     */
    override onStart(point: PointerEvent) {
        this.el = this.createElement('line');
        this.el.setAttribute('x1', point.clientX.toString());
        this.el.setAttribute('y1', point.clientY.toString());
        return this.el;
    }

    override onProcess(point: PointerEvent) {
        if (this.el) return;
        this.el!.setAttribute('x2', point.clientX.toString());
        this.el!.setAttribute('y2', point.clientY.toString());
        
    }

    override onEnd(point: PointerEvent) {
        if (this.el) return;
        this.el!.setAttribute('x2', point.clientX.toString());
        this.el!.setAttribute('y2', point.clientY.toString());
    }
}