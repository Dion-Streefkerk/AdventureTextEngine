// Imports
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

// Setup alias
export const FeedActionAlias: string = "feed-action";

// Setup interface
export interface Feed {
    feed(): ActionResult | undefined;
}

// Setup action
export class FeedAction extends Action {
    // Constructor with the alias and the display name
    public constructor() {
        super(FeedActionAlias, "Voed", true);
    }

    // Handle the action
    public static handle(gameObject: GameObject): ActionResult | undefined {
        // Check if the object implements the interface
        if (implementsInterface(gameObject, FeedActionAlias)) {
            // Cast to the interface
            return castTo<Feed>(gameObject).feed();
        }

        // If the object does not implement the interface, return undefined
        return undefined;
    }
}
