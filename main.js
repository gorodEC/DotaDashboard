import Dashboard from "./js/Dashboard.js";

const dashboardContainer =
    document.getElementById("dashboard");

const dashboard =
    new Dashboard(dashboardContainer);

    
dashboard.addWidget("player");
dashboard.addWidget("matches");

document
    .getElementById("addTodo")
    .addEventListener("click", () =>
        dashboard.addWidget("todo")
    );

document
    .getElementById("addQuote")
    .addEventListener("click", () =>
        dashboard.addWidget("quote")
    );

document
    .getElementById("addPlayer")
    .addEventListener("click", () =>
        dashboard.addWidget("player")
    );

document
    .getElementById("addMatches")
    .addEventListener("click", () =>
        dashboard.addWidget("matches")
    );