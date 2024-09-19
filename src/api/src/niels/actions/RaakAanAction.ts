import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

export const RaakAanActionAlias: string = "raak-aan";

/** Interface for touching objects
 *
 * @interface
 */
export interface RaakAan {
    raakAan(): ActionResult | undefined;
}

/** Class that defines the function of touching objects */
export class RaakAanAction extends Action {
    public constructor() {
        super(RaakAanActionAlias, "RAAK AAN", true);
    }

    /**
     *
     * @param gameObject
     * @returns An implementation of "raakAan" in "gameObject"
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, RaakAanActionAlias)) {
            return castTo<RaakAan>(gameObject).raakAan();
        }

        return undefined;
    }
}
