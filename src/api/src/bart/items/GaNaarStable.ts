// Imports
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { StableRoom } from "../../joeri/rooms/StableRoom";
import { BartSwitchRoomActionAlias } from "../actions/BartSwitchRoom";
import { BartSwitchRoom } from "../actions/BartSwitchRoom";

// Setup alias
export const GaNaarStableAlias: string = "ga-naar-stable";

// Create class with BartSwitchRoom interface
export class GaNaarStable extends Item implements BartSwitchRoom {
    // Constructor with the alias and the display name
    public constructor() {
        super(GaNaarStableAlias, BartSwitchRoomActionAlias);
    }

    // Name of the item
    public name(): string {
        return "Ga naar Stal";
    }

    // BartSwitchRoom function to go to the stable
    public bartSwitchRoom(): ActionResult | undefined {
        const room: StableRoom = new StableRoom();

        getPlayerSession().currentRoom = room.alias;

        return room.examine();
    }
}
