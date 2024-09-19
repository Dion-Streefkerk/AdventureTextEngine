// Imports
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { Ride, RideActionAlias } from "../actions/RideAction";

// Setup alias
export const SaddleItemAlias: string = "saddle-item";

// Create class with Examine, Pickup and Ride interfaces
export class SaddleItem extends Item implements Examine, Pickup, Ride {
    // Constructor with the alias and the display name
    public constructor() {
        super(SaddleItemAlias, ExamineActionAlias, PickupActionAlias, RideActionAlias);
    }

    // Name of the item
    public name(): string {
        return "Zadel";
    }

    // Examine action for the item
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Een sterk, leren zadel."]);
    }

    // Pickup action for the item
    public pickup(): ActionResult | undefined {
        // Get the player session
        const playerSession: PlayerSession = getPlayerSession();

        // If the player has the saddle, return a text action result
        if (playerSession.inventory.includes(SaddleItemAlias)) {
            return new TextActionResult(["Je hebt het zadel al opgepakt."]);
        }

        // Add the saddle to the player's inventory
        playerSession.inventory.push(SaddleItemAlias);

        // Return a text action result that the player has picked up the saddle (final)
        return new TextActionResult(["Je pakt het zadel op."]);
    }

    // Ride action for the item
    public ride(): ActionResult | undefined {
        return new TextActionResult(["Je zit op het zadel.", "Boer: 'Haha, waarom zit je op de grond?'"]);
    }
}
