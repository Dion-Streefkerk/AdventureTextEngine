import { ActionReference, GameObjectReference, GameState } from "../../../shared/types";
import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { getState, performAction } from "../services/routeService";
import Typewriter from "typewriter-effect/dist/core";

@customElement("game-canvas")
export class GameCanvas extends LitElement {
    public static styles = css`
        .game {
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 0 2rem;
        }

        .navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
        }

        .navigation a:hover {
            cursor: pointer;
        }

        .title {
            text-align: center;
        }

        .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            position: relative;
            margin-top: 1.5rem;
        }

        .header img {
            width: 100%;
            object-fit: cover;
            image-rendering: pixelated;
            max-height: 32rem;
        }

        .header img:nth-child(n + 2) {
            position: absolute;
        }

        .content {
            margin-top: 1rem;
            height: 100%;
        }

        .content p {
            margin: 0 0 1rem 0;
        }

        .content p:last-of-type {
            margin: 0;
        }

        .footer {
            border-radius: 1rem 1rem 0 0;
            margin-top: 1rem;
            display: flex;
            padding-bottom: 4rem;
        }

        .buttons {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            gap: 1.5rem;
            height: 100%;
            width: 100%;
        }

        @media (min-width: 768px) {
            .footer .buttons {
                height: 108px;
            }
        }

        .top-buttons,
        .bottom-buttons {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            /* min-height: 42px; */
        }

        .button {
            background-color: #262626;
            padding: 0.5rem 1rem;
            text-transform: uppercase;
            cursor: pointer;
            display: inline-block;
            user-select: none;
            height: fit-content;
        }

        .inventory-item {
            background-color: #262626;
            padding: 0.5rem 1rem;
            display: inline-block;
            height: fit-content;
        }

        .button.active {
            color: #eab308;
        }

        .button:hover {
            background-color: #404040;
        }

        .inventory-img {
            width: 2rem;
            height: 2rem;
        }

        .inventory-container {
            height: fit-content;
            margin-top: 1rem;
            margin-bottom: 1rem;
            display: flex;
            gap: 1.5rem;
        }
    `;

    private roomTitle?: string;
    private roomImages?: string[];
    private contentText?: string[];
    private actionButtons?: ActionReference[];
    private gameObjectButtons?: GameObjectReference[];
    private inventory?: string[];

    private selectedActionButton?: ActionReference;
    private selectedGameObjectButtons: Set<GameObjectReference> = new Set<GameObjectReference>();

    public connectedCallback(): void {
        super.connectedCallback();

        void this.refreshState();
    }

    private async refreshState(): Promise<void> {
        const state: GameState = await getState();

        this.updateState(state);
    }

    private updateState(state: GameState): void {
        //Reset the component
        this.roomTitle = state.roomTitle;
        this.roomImages = state.roomImages;
        this.contentText = state.text;
        this.actionButtons = state.actions;
        this.inventory = state.inventory;

        this.gameObjectButtons = state.objects;

        this.selectedActionButton = undefined;
        this.selectedGameObjectButtons.clear();

        this.requestUpdate();
    }

    private async handleClickAction(button: ActionReference): Promise<void> {
        if (button.needsObject) {
            this.selectedActionButton = button;
            this.selectedGameObjectButtons.clear();

            this.requestUpdate();
        } else {
            const state: any = await performAction(button.alias);

            if (state === undefined) {
                return;
            }

            this.updateState(state);
        }
    }

    private async handleClickObject(button: GameObjectReference): Promise<void> {
        if (!this.selectedActionButton) {
            return;
        }

        this.selectedGameObjectButtons.add(button);

        const state: GameState | undefined = await performAction(
            this.selectedActionButton.alias,
            [...this.selectedGameObjectButtons].map((e) => e.alias),
        );

        if (this.selectedGameObjectButtons.size >= 2) {
            this.selectedActionButton = undefined;
            this.selectedGameObjectButtons.clear();
        }

        this.requestUpdate();

        if (state === undefined) {
            return;
        }

        this.updateState(state);
    }

    private async resetPlayerSession(): Promise<void> {
        const state: GameState | undefined = await performAction("reset");

        this.requestUpdate();

        if (state === undefined) {
            return;
        }

        this.updateState(state);
    }

    protected render(): TemplateResult {
        return html`
            <div class="game">
                ${this.renderTitle()} ${this.renderHeader()} ${this.renderInventory()} ${this.renderContent()}
                ${this.renderFooter()}
            </div>
        `;
    }

    private renderTitle(): TemplateResult {
        if (this.roomTitle) {
            return html`
                <div class="navigation">
                    <div class="title">${this.roomTitle}</div>
                    ${process.env.NODE_ENV === "development"
                        ? html`<a @click=${(): void => void this.resetPlayerSession()}>RESET</a>`
                        : nothing}
                </div>
            `;
        }

        return html`${nothing}`;
    }

    private renderHeader(): TemplateResult {
        if (this.roomImages && this.roomImages.length > 0) {
            return html`
                <div class="header">
                    ${this.roomImages?.map((url) => html`<img src="/assets/img/rooms/${url}.png" />`)}
                </div>
            `;
        }

        return html`${nothing}`;
    }

    private renderInventory(): TemplateResult {
        return html`
            ${this.inventory && this.inventory.length > 0
                ? html`<div class="inventory-container">
                      ${this.inventory.map(
                          (item) =>
                              html`<div class="inventory-item">
                                  <img class="inventory-img" src="/assets/img/inventory/${item}.png" />
                              </div>`,
                      )}
                  </div>`
                : nothing}
        `;
    }

    private previousContentText: string[] | undefined;

    private renderContent(): TemplateResult {
        if (JSON.stringify(this.contentText) !== JSON.stringify(this.previousContentText)) {
            const typewriter: Typewriter = new Typewriter(
                this.shadowRoot?.getElementById("content") as HTMLElement,
                {
                    loop: false,
                    delay: 25,
                    cursor: "",
                },
            );

            this.contentText?.forEach((sentence) => {
                typewriter.typeString(sentence + " ").pauseFor(500);
            });

            typewriter.start();

            // Update previousContentText after typewriter effect is set up
            this.previousContentText = [...(this.contentText ?? [])];
        }

        return html` <div class="content" id="content"></div> `;
    }

    private renderFooter(): TemplateResult {
        return html`
            <div class="footer">
                <div class="buttons">
                    <div class="top-buttons">
                        ${this.actionButtons?.map(
                            (button) =>
                                html`<a
                                    class="button ${this.selectedActionButton === button ? "active" : ""}"
                                    @click=${(): void => void this.handleClickAction(button)}
                                    >${button.label}</a
                                >`,
                        )}
                    </div>

                    <div class="bottom-buttons">
                        ${this.selectedActionButton
                            ? this.gameObjectButtons?.map(
                                  (button) =>
                                      html`<a
                                          class="button ${this.selectedGameObjectButtons.has(button)
                                              ? "active"
                                              : ""}"
                                          @click=${(): void => void this.handleClickObject(button)}
                                          >${button.name}</a
                                      >`,
                              )
                            : nothing}
                    </div>
                </div>
            </div>
        `;
    }
}
