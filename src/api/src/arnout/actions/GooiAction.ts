import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

export const throwactionAlias: string = "throwAction";
// here is the throwactioninterface declared
export interface ThrowActionInterface {
    gooi(): ActionResult | undefined;
}

// in this class are all methods to do with the throwaction declared
export class throwAction extends Action {
    public constructor() {
        super(throwactionAlias, "gooi naar", true);
    }
    // this function casts methods defined in throwaction class to the gooi action in the throwactioninterface
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, throwactionAlias)) {
            return castTo<ThrowActionInterface>(gameObject).gooi();
        }

        return undefined;
    }
}
