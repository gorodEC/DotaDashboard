import ToDoWidget from "./ToDoWidget.js";
import QuoteWidget from "./QuoteWidget.js";
import PlayerWidget from "./PlayerWidget.js";
import MatchesWidget from "./MatchesWidget.js";

export default class Dashboard {

    constructor(container) {
        this.container = container;
        this.widgets = [];
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
}