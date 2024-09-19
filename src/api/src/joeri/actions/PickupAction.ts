// Imports
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

// Setup alias
export const PickupActionAlias: string = "pickup-action";

// Setup interface
export interface Pickup {
    pickup(): ActionResult | undefined;
}

// Setup action
export class PickupAction extends Action {
    // Constructor with the alias and the display name
    public constructor() {
        super(PickupActionAlias, "Pak Op", true);
    }

    // Handle the action
    public static handle(gameObject: GameObject): ActionResult | undefined {
        // Check if the object implements the interface
        if (implementsInterface(gameObject, PickupActionAlias)) {
            // Cast to the interface
            return castTo<Pickup>(gameObject).pickup();
        }

        // If the object does not implement the interface, return undefined
        return undefined;
    }
}
