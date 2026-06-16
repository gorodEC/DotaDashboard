import UIComponent from "./UIComponent.js";

export default class QuoteWidget extends UIComponent {

    constructor(id) {

        super({
            id,
            title: "Мотивация"
        });

        this.quotes = [
            "MMR is just a number.",
            "One more game.",
            "Never give up.",
            "Push the lanes.",
            "Vision wins games.",
            "Farm first, fight later."
        ];
    }

    render() {

        this.element =
            document.createElement("div");

        this.element.className = "widget";

        const quote =
            this.quotes[
                Math.floor(
                    Math.random() *
                    this.quotes.length
                )
            ];

        this.element.innerHTML = `
            <div class="widget-header">
                <h3>${this.title}</h3>
                <button class="close-btn">✖</button>
            </div>

            <p>${quote}</p>
        `;

        return this.element;
    }
}