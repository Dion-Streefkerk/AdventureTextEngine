import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

export const DuwOpActionAlias: string = "duw-op";

/** Interface for pushing on objects
 *
 * @interface
 */
export interface DuwOp {
    duwOp(): ActionResult | undefined;
}

/** Class that defines the function of pushing on objects */
export class DuwOpAction extends Action {
    public constructor() {
        super(DuwOpActionAlias, "DUW OP", true);
    }
    /**
     *
     * @param gameObject
     * @returns An implementation of "duwOp" in "gameObject"
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, DuwOpActionAlias)) {
            return castTo<DuwOp>(gameObject).duwOp();
        }

        return undefined;
    }
}
