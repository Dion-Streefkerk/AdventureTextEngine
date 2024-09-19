import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { implementsInterface, castTo } from "../../base/helpers";

export const VoedActionAlias: string = "voed";

export interface Voed {
    // word promise als het uit de database komt
    voed(): ActionResult | undefined;
}

export class VoedAction extends Action {
    public constructor() {
        super(VoedActionAlias, "Voed", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, VoedActionAlias)) {
            return castTo<Voed>(gameObject).voed();
        }

        return undefined;
    }
}
