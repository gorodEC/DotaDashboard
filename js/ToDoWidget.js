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

        this.element = document.createElement("div");
        this.element.className = "widget";

        this.element.innerHTML = `
            <div class="widget-header">
                <h3>${this.title}</h3>
                <button class="close-btn">✖</button>
            </div>

            <input
                type="text"
                class="task-input"
                placeholder="Введите задачу"
            >

            <button class="add-btn">
                Добавить
            </button>

            <ul class="task-list"></ul>
        `;

        const input = this.element.querySelector(".task-input");
        const addBtn = this.element.querySelector(".add-btn");
        const list = this.element.querySelector(".task-list");

        const addTask = () => {

            const text = input.value.trim();
            if (!text) return;

            const li = document.createElement("li");

            li.className = "task-item";

            li.innerHTML = `
                <span class="task-text">${text}</span>
                <button class="done-btn">Готово</button>
            `;

            const doneBtn = li.querySelector(".done-btn");
            const taskText = li.querySelector(".task-text");

            doneBtn.addEventListener("click", () => {
                taskText.classList.toggle("done");
            });

            list.appendChild(li);

            input.value = "";
            requestAnimationFrame(() => {
    window.dashboard.updateLayout();
});
        };

        addBtn.addEventListener("click", addTask);
        

        return this.element;
    }
}