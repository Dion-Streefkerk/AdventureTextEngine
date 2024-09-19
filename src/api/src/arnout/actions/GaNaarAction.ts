import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

export const gaNaarActionAlias: string = "GaNaarActionArnout";

export interface GaNaarActionInterface {
    GaNaar(): ActionResult | undefined;
}

export class GaNaarAction extends Action {
    public constructor() {
        super(gaNaarActionAlias, "Ga naar", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, gaNaarActionAlias)) {
            return castTo<GaNaarActionInterface>(gameObject).GaNaar();
        }

        return undefined;
    }
}
