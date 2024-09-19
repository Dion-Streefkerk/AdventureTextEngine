import { Rijd, RijdActionAlias } from "../actions/RijdAction";
import { Voed, VoedActionAlias } from "../actions/VoedAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { EndRoom } from "../rooms/EndRoom";

export const PaardCharacterAlias: string = "paard";
export class PaardCharacter extends Character implements Examine, Voed, Rijd {
    public constructor() {
        super(PaardCharacterAlias, ExamineActionAlias, VoedActionAlias, RijdActionAlias);
    }

    public name(): string {
        return "Paard";
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            return new TextActionResult([
                "Misschien heeft hij honger en is hij daarom zo vermoeid. Ik heb alleen geen eten bij me.",
            ]);
        }

        return new TalkActionResult(
            this,
            ["<paard hinnikt vermoeid>"],
            [new TalkChoiceAction(1, "Gaat het goed, paardje?")],
        );
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Mijn paard ziet er prachtig uit, alleen wel een beetje moe. Hoe zou dit komen?",
        ]);
    }

    public voed(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.ispaardgevoed) {
            return new TextActionResult(["Je paard is al gevoerd. Je kan hem niet nog een keer voeren."]);
        } else if (playerSession.suikerklontjesopgepakt) {
            playerSession.ispaardgevoed = true;
            return new TextActionResult([
                "Je paard is gevoed. Hij ziet er veel beter uit. Je denkt dat je nu wel het einde van het bos gaat halen.",
            ]);
        }
        return new TextActionResult([
            "Je hebt geen voer voor je paard. Misschien kan ik dit ergens vinden...",
        ]);
    }

    public Rijd(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.gebrokenzwaardopgepakt && playerSession.ispaardgevoed) {
            // hier moet functionaliteit zitten om naar de end room te gaan
            const room: EndRoom = new EndRoom();

            getPlayerSession().currentRoom = room.alias;
    
            return room.examine();
            
        }
        return new TextActionResult(["Je bent nog niet klaar om naar de volgende room te gaan."]);
    }
}
