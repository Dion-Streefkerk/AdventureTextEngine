// Imports
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

// Setup alias
export const RideActionAlias: string = "ride-action";

// Setup interface
export interface Ride {
    ride(): ActionResult | undefined;
}

// Setup action
export class RideAction extends Action {
    // Constructor with the alias and the display name
    public constructor() {
        super(RideActionAlias, "Rijd", true);
    }

    // Handle the action
    public static handle(gameObject: GameObject): ActionResult | undefined {
        // Check if the object implements the interface
        if (implementsInterface(gameObject, RideActionAlias)) {
            // Cast to the interface
            return castTo<Ride>(gameObject).ride();
        }

        // If the object does not implement the interface, return undefined
        return undefined;
    }
}
