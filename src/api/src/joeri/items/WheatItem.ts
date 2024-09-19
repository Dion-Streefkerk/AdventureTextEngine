// Imports
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";

// Setup alias
export const WheatItemAlias: string = "wheat-item";

// Create class with Examine and Pickup interfaces
export class WheatItem extends Item implements Examine, Pickup {
    // Constructor with the alias and the display name
    public constructor() {
        super(WheatItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    // Name of the item
    public name(): string {
        // Return the name with the amount of wheat the player has
        return "Graan";
    }

    // Examine action for the item
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Vers graan, net geoogst!"]);
    }

    // Pickup action for the item
    public pickup(): ActionResult | undefined {
        // Get the player session
        const playerSession: PlayerSession = getPlayerSession();

        // If the player has the wheat, return a text action result
        if (playerSession.inventory.includes(WheatItemAlias)) {
            return new TextActionResult(["Je hebt het graan al opgepakt."]);
        }

        // Add the wheat to the player's inventory
        playerSession.inventory.push(WheatItemAlias);

        // Return a text action result that the player has picked up the wheat (final)
        return new TextActionResult(["Je pakt het graan op."]);
    }
}
