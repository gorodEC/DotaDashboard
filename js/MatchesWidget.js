import UIComponent from "./UIComponent.js";

export default class MatchesWidget extends UIComponent {

    constructor(id) {
        super({
            id,
            title: "Последние матчи"
        });
    }

    async loadData() {

        const [matchesResponse, heroesResponse] =
            await Promise.all([
                fetch(
                    "https://api.opendota.com/api/players/287039854/recentMatches"
                ),
                fetch(
                    "https://api.opendota.com/api/heroes"
                )
            ]);

        const matches =
            await matchesResponse.json();

        const heroes =
            await heroesResponse.json();

        const heroMap = {};

        heroes.forEach(hero => {
            heroMap[hero.id] =
                hero.localized_name;
        });

        return {
            matches,
            heroMap
        };
        this.loadData().then(() => {

    content.innerHTML = "...";

    requestAnimationFrame(() => {
        window.dashboard.updateLayout();
    });
});
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

            <div class="matches-content">
                Загрузка матчей...
            </div>
        `;

        const content =
            this.element.querySelector(
                ".matches-content"
            );

        this.loadData()
            .then(data => {

                const { matches, heroMap } =
                    data;

                content.innerHTML =
                    matches
                    .slice(0, 5)
                    .map(match => {

                        const heroName =
                            heroMap[match.hero_id] ||
                            "Unknown Hero";

                        const isRadiant =
                            match.player_slot < 128;

                        const won =
                            (isRadiant &&
                                match.radiant_win) ||
                            (!isRadiant &&
                                !match.radiant_win);

                        return `
                            <div class="match">

                                <h4>
                                    ${heroName}
                                </h4>

                                <p>
                                    KDA:
                                    ${match.kills}/
                                    ${match.deaths}/
                                    ${match.assists}
                                </p>

                                <p>
                                    ${
                                        won
                                            ? "✅ Победа"
                                            : "❌ Поражение"
                                    }
                                </p>

                            </div>
                        `;
                    })
                    .join("");
            })
            .catch(error => {

                console.error(error);

                content.innerHTML =
                    "Ошибка загрузки матчей";
            });

        return this.element;
    }
}