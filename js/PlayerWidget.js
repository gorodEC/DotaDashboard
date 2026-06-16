import UIComponent from "./UIComponent.js";

export default class PlayerWidget extends UIComponent {

    constructor(id) {
        super({
            id,
            title: "Профиль игрока"
        });
    }

    async loadPlayer() {

        const response = await fetch(
            "https://api.opendota.com/api/players/287039854"
        );

        return await response.json();
    }

    getRankName(rankTier) {

        if (!rankTier) {
            return "Нет данных";
        }

        const ranks = {
            1: {
                name: "Herald",
                icon: "🛡"
            },
            2: {
                name: "Guardian",
                icon: "⚔️"
            },
            3: {
                name: "Crusader",
                icon: "🏹"
            },
            4: {
                name: "Archon",
                icon: "🔮"
            },
            5: {
                name: "Legend",
                icon: "⭐"
            },
            6: {
                name: "Ancient",
                icon: "👑"
            },
            7: {
                name: "Divine",
                icon: "💎"
            },
            8: {
                name: "Immortal",
                icon: "🔥"
            }
        };

        const tier =
            Math.floor(rankTier / 10);

        const star =
            rankTier % 10;

        if (tier === 8) {
            return `${ranks[8].icon} ${ranks[8].name}`;
        }

        return `
            ${ranks[tier].icon}
            ${ranks[tier].name}
            ${star}
        `;
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

            <div class="player-content">
                Загрузка профиля...
            </div>
        `;

        const content =
            this.element.querySelector(
                ".player-content"
            );

        this.loadPlayer()
            .then(player => {

                const rank =
                    this.getRankName(
                        player.rank_tier
                    );

                content.innerHTML = `
                    <div class="player-card">

                        <img
                            src="${player.profile.avatarfull}"
                            alt="avatar"
                            class="avatar"
                        >

                        <h3>
                            ${player.profile.personaname}
                        </h3>

                        <p>
                            <strong>Rank:</strong>
                            ${rank}
                        </p>

                        <p>
                            <strong>Steam ID:</strong>
                            ${player.profile.account_id}
                        </p>

                    </div>
                `;
            })
            .catch(error => {

                console.error(error);

                content.innerHTML =
                    "Ошибка загрузки профиля";
            });

        return this.element;
    }
}