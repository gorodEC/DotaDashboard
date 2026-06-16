import ToDoWidget from "./ToDoWidget.js";
import QuoteWidget from "./QuoteWidget.js";
import PlayerWidget from "./PlayerWidget.js";
import MatchesWidget from "./MatchesWidget.js";

export default class Dashboard {

    constructor(container) {
        this.container = container;
        this.widgets = [];
    }

    updateLayout() {
    this.widgets.forEach(widget => {
        const el = widget.element;

        const rowHeight = 10;
        const height = el.scrollHeight;

        const span = Math.ceil(height / rowHeight);

        el.style.gridRowEnd = `span ${span}`;
    });
}
    addWidget(widgetType) {

        const id = Date.now();
     
        let widget;

        switch (widgetType) {

            case "todo":
                widget = new ToDoWidget(id);
                break;

            case "quote":
                widget = new QuoteWidget(id);
                break;

            case "player":
                widget = new PlayerWidget(id);
                break;

            case "matches":
                widget = new MatchesWidget(id);
                break;

            default:
                return;
        }

        const element = widget.render();
     this.container.appendChild(element);

requestAnimationFrame(() => {
    this.updateLayout();
    this.updateLayout = debounce(this.updateLayout.bind(this), 50);
});
      

   

        const closeBtn =
            element.querySelector(".close-btn");

        if (closeBtn) {

            closeBtn.addEventListener("click", () => {
                this.removeWidget(widget.id);
            });
        }

        this.widgets.push(widget);

        this.container.appendChild(element);
        
   
    }
    
    removeWidget(widgetId) {

        const widget =
            this.widgets.find(
                widget => widget.id === widgetId
            );

        if (!widget) return;

        widget.destroy();

        this.widgets =
            this.widgets.filter(
                widget => widget.id !== widgetId
            );
    }
updateLayout() {

    const rowHeight = parseInt(
        getComputedStyle(this.container)
        .getPropertyValue("grid-auto-rows")
    );

    const gap = parseInt(
        getComputedStyle(this.container)
        .getPropertyValue("gap")
    );

    this.container.querySelectorAll(".widget").forEach(widget => {

        // сброс перед пересчётом
        widget.style.gridRowEnd = "auto";

        const height = widget.getBoundingClientRect().height;

        const span = Math.ceil(
            (height + gap) / (rowHeight + gap)
        );

        widget.style.gridRowEnd = `span ${span}`;
    });
}

}
function debounce(fn, delay = 100) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}