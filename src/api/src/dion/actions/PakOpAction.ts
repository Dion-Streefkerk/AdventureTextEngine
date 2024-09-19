import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { implementsInterface, castTo } from "../../base/helpers";

export const PakOpActionAlias: string = "pak-op-dion";

export interface PakOp {
    // word promise als het uit de database komt
    pickup(): ActionResult | undefined;
}

export class PakOpAction extends Action {
    public constructor() {
        super(PakOpActionAlias, "Pak op", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, PakOpActionAlias)) {
            return castTo<PakOp>(gameObject).pickup();
        }

        return undefined;
    }
}
