import { Eet, EetActionAlias } from "../actions/EetAction";
import { PakOp, PakOpActionAlias } from "../actions/PakOpAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession, resetPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const PaddenstoelItemAlias: string = "paddenstoel";

export class PaddenstoelItem extends Item implements Examine, PakOp, Eet {
    public constructor() {
        super(PaddenstoelItemAlias, ExamineActionAlias, PakOpActionAlias, EetActionAlias);
    }

    public name(): string {
        return "paddenstoel";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Een lekker uitziende paddenstoel. Het heeft een erg rare kleur. Zou je deze kunnen eten?",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.paddenstoelopgepakt) {
            playerSession.paddenstoelopgepakt = true;
            playerSession.inventory.push(PaddenstoelItemAlias);
            return new TextActionResult(["Je hebt de paddenstoel opgepakt!"]);
        }

        return undefined;
    }

    public eet(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.paddenstoelopgepakt) {
            resetPlayerSession();
            return new TextActionResult([
                "Je begint je erg raar te voelen... De paddenstoel was giftig!",
                "<GAME OVER>",
            ]);
        }

        return new TextActionResult([
            "Je hebt geen paddenstoel om op te eten. Misschien kan je er ergens eentje vinden?",
        ]);
    }
}
