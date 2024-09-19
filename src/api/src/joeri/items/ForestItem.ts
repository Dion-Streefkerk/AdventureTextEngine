// Imports
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Item } from "../../base/gameObjects/Item";
import { ForestRoom } from "../../dion/rooms/ForestRoom";
import { getPlayerSession } from "../../instances";
import { RideToActionAlias } from "../actions/RideToAction";
import { RideTo } from "../actions/RideToAction";

// Setup alias
export const ForestItemAlias: string = "forest-item";

// Create class with RideTo interface
export class ForestItem extends Item implements RideTo {
    // Constructor with the alias and the display name
    public constructor() {
        super(ForestItemAlias, RideToActionAlias);
    }

    // Name of the item
    public name(): string {
        return "Bos";
    }

    // RideTo function to go to the forest
    public rideTo(): ActionResult | undefined {
        // Get the player session
        const room: ForestRoom = new ForestRoom();

        // Set the current room to the forest-room
        getPlayerSession().currentRoom = room.alias;

        // Set the current room to the forest-room
        return room.examine();
    }
}
