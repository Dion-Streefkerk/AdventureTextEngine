import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

export const GebruikActionAlias: string = "Gebruik";

export interface Gebruik {
    gebruik(): ActionResult | undefined;
}

export class GebruikAction extends Action {
    public constructor() {
        super(GebruikActionAlias, "Gebruik", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, GebruikActionAlias)) {
            return castTo<Gebruik>(gameObject).gebruik();
        }

        return undefined;
    }
}
