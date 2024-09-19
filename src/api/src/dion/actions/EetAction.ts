import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { implementsInterface, castTo } from "../../base/helpers";

export const EetActionAlias: string = "eet";

export interface Eet {
    // word promise als het uit de database komt
    eet(): ActionResult | undefined;
}

export class EetAction extends Action {
    public constructor() {
        super(EetActionAlias, "Eet", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, EetActionAlias)) {
            return castTo<Eet>(gameObject).eet();
        }

        return undefined;
    }
}
