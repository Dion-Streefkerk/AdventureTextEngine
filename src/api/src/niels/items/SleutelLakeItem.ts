import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { PakOp, PakOpActionAlias } from "../actions/PakOpAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const SleutelLakeItemAlias: string = "sleutel-lake-room";

/** This class defines a "key" item */
export class SleutelLakeItem extends Item implements Examine, PakOp {
    public constructor() {
        super(SleutelLakeItemAlias, ExamineActionAlias, PakOpActionAlias);
    }
    /** Name of the key
     * @returns Name of the key.
     */
    public name(): string {
        return "Sleutel";
    }
    /** Describe the key
     * @returns Description of key and flavour text.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Hier is nog een sleutel!"]);
    }

    /** Allow the player to pick up the key.
     *
     * @returns A message that the key has been added or
     * @returns A message that the key is already in the inventory
     */
    public pakOp(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.heeftSleutelLakeOpgepakt === false) {
            playerSession.inventory.push(SleutelLakeItemAlias);
            playerSession.heeftSleutelLakeOpgepakt = true;

            return new TextActionResult(["De sleutel is toegevoegd aan je inventaris!"]);
        }
        return new TextActionResult(["Je hebt de sleutel al opgepakt."]);
    }
}
