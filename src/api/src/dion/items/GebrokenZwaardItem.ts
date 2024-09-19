import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { PakOp, PakOpActionAlias } from "../actions/PakOpAction";

export const GebrokenZwaardItemAlias: string = "gebroken-zwaard";

export class GebrokenZwaardItem extends Item implements Examine, PakOp {
    public constructor() {
        super(GebrokenZwaardItemAlias, ExamineActionAlias, PakOpActionAlias);
    }

    public name(): string {
        return "gebroken zwaard";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(
            [
                "Een gevaarlijk uitziend zwaard. Er komt een rare gloed vanaf. Je krijgt een naar gevoel hiervan. Wat zou dit betekenen ?",
            ],
            
        );
    }


    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.gebrokenzwaardopgepakt) {
            playerSession.gebrokenzwaardopgepakt = true;
            playerSession.inventory.push(GebrokenZwaardItemAlias);
            return new TextActionResult(["Je hebt het gebroken zwaard opgepakt!"]);
        }

        return undefined;
    }
}
