// Imports
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

// Setup alias
export const RideToActionAlias: string = "ride-to-action";

// Setup interface
export interface RideTo {
    rideTo(): ActionResult | undefined;
}

// Setup action
export class RideToAction extends Action {
    // Constructor with the alias and the display name
    public constructor() {
        super(RideToActionAlias, "Rijd naar", true);
    }

    // Handle the action
    public static handle(gameObject: GameObject): ActionResult | undefined {
        // Check if the object implements the interface
        if (implementsInterface(gameObject, RideToActionAlias)) {
            // Cast to the interface
            return castTo<RideTo>(gameObject).rideTo();
        }

        // If the object does not implement the interface, return undefined
        return undefined;
    }
}
