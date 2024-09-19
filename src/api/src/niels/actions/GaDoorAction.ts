import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

export const GaDoorActionAlias: string = "ga-door";

/** Interface for going through objects
 *
 * @interface
 */
export interface GaDoor {
    gaDoor(): ActionResult | undefined;
}

/** Class that defines the function of going through objects */
export class GaDoorAction extends Action {
    public constructor() {
        super(GaDoorActionAlias, "GA DOOR", true);
    }

    /** Implements "gaDoor"
     *
     * @param gameObject
     * @returns An implementation of "gaDoor" in "gameObject"
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, GaDoorActionAlias)) {
            return castTo<GaDoor>(gameObject).gaDoor();
        }

        return undefined;
    }
}
