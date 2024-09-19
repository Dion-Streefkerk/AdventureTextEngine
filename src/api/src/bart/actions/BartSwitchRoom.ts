import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

export const BartSwitchRoomActionAlias: string = "bart-switch-room-action";

export interface BartSwitchRoom {
    bartSwitchRoom(): ActionResult | undefined;
}

export class BartSwitchRoomAction extends Action {
    public constructor() {
        super(BartSwitchRoomActionAlias, "Ga naar de volgende kamer", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, BartSwitchRoomActionAlias)) {
            return castTo<BartSwitchRoom>(gameObject).bartSwitchRoom();
        }

        return undefined;
    }
}
