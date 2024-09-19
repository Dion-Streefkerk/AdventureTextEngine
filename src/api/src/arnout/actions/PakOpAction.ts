import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

export const pickupAliasArnout: string = "pickupArnout";
// here is the interfaace for the pickupArnout function declared
export interface pakop {
    pakop(): ActionResult | undefined;
}
// her is the class for the pickup class from Arnout declared
export class pickupActionArnout extends Action {
    public constructor() {
        super(pickupAliasArnout, "pak op", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, pickupAliasArnout)) {
            return castTo<pakop>(gameObject).pakop();
        }

        return undefined;
    }
}
