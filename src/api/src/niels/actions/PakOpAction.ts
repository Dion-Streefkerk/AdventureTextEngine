import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

export const PakOpActionAlias: string = "pak-op";

/** Interface for picking up objects
 *
 * @interface
 */
export interface PakOp {
    pakOp(): ActionResult | undefined;
}

/** Class that defines the function of picking up objects */
export class PakOpAction extends Action {
    public constructor() {
        super(PakOpActionAlias, "PAK OP", true);
    }

    /**
     *
     * @param gameObject
     * @returns An implementation of "pakOp" in "gameObject"
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, PakOpActionAlias)) {
            return castTo<PakOp>(gameObject).pakOp();
        }

        return undefined;
    }
}
