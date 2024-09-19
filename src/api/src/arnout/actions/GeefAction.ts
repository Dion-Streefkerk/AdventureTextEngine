import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

export const giveActionAlias: string = "give";
// hieronder staat de interface waarmee de give class
export interface giveinterface {
    give(): ActionResult | undefined;
}
// hieronder word de give action class gedefinieerd
export class give extends Action {
    public constructor() {
        super(giveActionAlias, "geef", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, giveActionAlias)) {
            return castTo<giveinterface>(gameObject).give();
        }

        return undefined;
    }
}
