import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { GebrokenZwaardItemAlias } from "../items/GebrokenZwaardItem";
import { PlayerSession } from "../../types";

export const RidderCharacterAlias: string = "ridder-character";

export class RidderCharacter extends Character implements Examine {
    public constructor() {
        super(RidderCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Ridder";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Dit is de ridder die je volgt."]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (_choiceId === 1) {
            return new TextActionResult([
                "De ridder lacht zachtjes. Dit voorspelt niet veel goeds. Heb je te veel zelfvertrouwen...?",
            ]);
        } else if (_choiceId === 2) {
            return new TextActionResult([
                "Komt goed. Met mij aan je zij is er niks om je druk over te maken!",
            ]);
        } else if (_choiceId === 3) {
            playerSession.iszwaardgegeven = true;
            playerSession.inventory = [];
            return new TextActionResult([
                "Dit kan ik zeer goed gebruiken. Er loeren veel vijanden in dit bos. Dankjewel!",
            ]);
        }

        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Maar natuurlijk, geen twijfel aan!"),
            new TalkChoiceAction(2, "Ik hoop het niet. Ik maak me reuze zorgen..."),
        ];

        if (playerSession.inventory.includes(GebrokenZwaardItemAlias)) {
            choiceActions.push(new TalkChoiceAction(3, "Geef het zwaard aan de ridder."));
        }

        return new TalkActionResult(
            this,
            [
                "Weet je zeker dat je dieper het bos in wil gaan? Ik heb veel reizigers deze bossen zien betreden en nooit meer terug zien komen.",
            ],
            choiceActions,
        );
    }
}
