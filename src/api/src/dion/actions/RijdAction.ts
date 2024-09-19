import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { implementsInterface, castTo } from "../../base/helpers";

export const RijdActionAlias: string = "rijd";

export interface Rijd {
    // word promise als het uit de database komt
    Rijd(): ActionResult | undefined;
}

export class RijdAction extends Action {
    public constructor() {
        super(RijdActionAlias, "Rijd", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, RijdActionAlias)) {
            return castTo<Rijd>(gameObject).Rijd();
        }

        return undefined;
    }
}
