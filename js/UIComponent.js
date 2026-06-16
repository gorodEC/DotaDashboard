export default class UIComponent {
    constructor({ id, title }) {
        this.id = id;
        this.title = title;
        this.element = null;
        this.listeners = [];
    }

    render() {
        throw new Error(
            "Метод render() должен быть реализован"
        );
    }

    addListener(element, event, handler) {
        element.addEventListener(event, handler);

        this.listeners.push({
            element,
            event,
            handler
        });
    }

    destroy() {

        this.listeners.forEach(listener => {
            listener.element.removeEventListener(
                listener.event,
                listener.handler
            );
        });

        this.listeners = [];

        if (this.element) {
            this.element.remove();
        }
    }
}