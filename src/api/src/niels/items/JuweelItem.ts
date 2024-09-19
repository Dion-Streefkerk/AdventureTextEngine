import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { PakOp, PakOpActionAlias } from "../actions/PakOpAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const JuweelItemAlias: string = "juweel";

/** This class defines a "jewel" item */
export class JuweelItem extends Item implements Examine, PakOp {
    public constructor() {
        super(JuweelItemAlias, ExamineActionAlias, PakOpActionAlias);
    }
    /** Name of the jewel
     * @returns Name of the jewel.
     */
    public name(): string {
        return "Juweel";
    }
    /** Describe the jewel
     * @returns Description of jewel and flavour text.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Dit is een juweel.", "Het ziet eruit alsof het van een nobele is."]);
    }

    /** Allow the player to pick up the jewel.
     *
     * @returns A message that the jewel has been added or
     * @returns A message that the jewel is already in the inventory
     */
    public pakOp(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.inventory.includes("juweel") === false) {
            playerSession.inventory.push(JuweelItemAlias);

            return new TextActionResult(["Het juweel is toegevoegd aan je inventaris!"]);
        }
        return new TextActionResult(["Je hebt het juweel al opgepakt."]);
    }
}
