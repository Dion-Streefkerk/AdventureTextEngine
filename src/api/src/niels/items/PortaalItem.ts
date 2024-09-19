import { bridgeRoom } from "../../arnout/rooms/Bridgeroom";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { GaDoor, GaDoorActionAlias } from "../actions/GaDoorAction";

export const PortaalItemAlias: string = "portaal";

/** This class defines a "portal" item */
export class PortaalItem extends Item implements Examine, GaDoor {
    public constructor() {
        super(PortaalItemAlias, ExamineActionAlias, GaDoorActionAlias);
    }
    /** Name of the jewel
     * @returns Name of the jewel.
     */
    public name(): string {
        return "Portaal";
    }
    /** Describe the portal
     * @returns Description of portal and flavour text.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Door het portaal kan je in de verte een kasteel zien!",
            "Vlak voor je is een loopbrug.",
        ]);
    }
    /** Allow the player to go through the portal and into the next room.
     * @returns The "examine" message of the next room.
     */
    public gaDoor(): ActionResult | undefined {

        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.inventory.includes("sleutel-lake-room")) {
            playerSession.inventory = (["sleutel-lake-room"]);
        }
        else {playerSession.inventory = ([]);}

        const room: bridgeRoom = new bridgeRoom();

        getPlayerSession().currentRoom = room.alias;

        return room.examine();
    }
}
