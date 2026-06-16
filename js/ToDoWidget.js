import UIComponent from "./UIComponent.js";

export default class ToDoWidget extends UIComponent {

    constructor(id) {
        super({
            id,
            title: "Игровые цели"
        });

        this.tasks = [];
    }

    render() {

        this.element =
            document.createElement("div");

        this.element.className = "widget";

        this.element.innerHTML = `
            <div class="widget-header">
                <h3>${this.title}</h3>
                <button class="close-btn">✖</button>
            </div>

            <input
                type="text"
                class="task-input"
                placeholder="Введите цель"
            >

            <button class="task-btn">
                Добавить
            </button>

            <ul class="task-list"></ul>
        `;

        const input =
            this.element.querySelector(".task-input");

        const button =
            this.element.querySelector(".task-btn");

        const list =
            this.element.querySelector(".task-list");

        const addTask = () => {

            const text = input.value.trim();

            if (!text) return;

            this.tasks.push(text);

            const li =
                document.createElement("li");

            li.textContent = text;

            list.appendChild(li);

            input.value = "";
        };

        this.addListener(
            button,
            "click",
            addTask
        );

        return this.element;
    }
}