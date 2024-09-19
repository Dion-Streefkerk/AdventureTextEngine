import { ExamineActionAlias } from "../../base/actions/ExamineAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { PakOp, PakOpActionAlias } from "../actions/PakOpAction";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";

export const ZwaardItemAlias: string = "zwaard";

/** This class defines a "sword" item */
export class ZwaardItem extends Item implements Examine, PakOp {
    public constructor() {
        super(ZwaardItemAlias, ExamineActionAlias, PakOpActionAlias);
    }
    /** Name of the sword
     * @returns Name of the sword.
     */
    public name(): string {
        return "Zwaard";
    }
    /** Describe the sword
     * @returns Description of sword and flavour text.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Dit is een zwaard.",
            "Zou dit van jou kunnen zijn?",
            "Het is hoe dan ook goed om te hebben.",
        ]);
    }
    /** Allow the player to pick up the sword.
     *
     * @returns A message that the sword has been added or
     * @returns A message that the sword is already in the inventory
     */
    public pakOp(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.inventory.includes("zwaard") === false) {
            playerSession.inventory.push(ZwaardItemAlias);

            return new TextActionResult(["Het zwaard is toegevoegd aan je inventaris!"]);
        }
        return new TextActionResult(["Je hebt het zwaard al opgepakt."]);
    }
}
