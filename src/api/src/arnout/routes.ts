import { ActionResult } from "../base/actionResults/ActionResult";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { giveActionAlias, give } from "./actions/GeefAction";
import { pickupActionArnout, pickupAliasArnout } from "./actions/PakOpAction";
import { throwAction, throwactionAlias } from "./actions/GooiAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GaNaarAction, gaNaarActionAlias } from "./actions/GaNaarAction";

export function handleRoutesArnout(
    _room: Room,
    alias: string,
    GameObject: GameObject[],
): ActionResult | undefined {
    switch (alias) {
        case ExamineActionAlias:
            return ExamineAction.handle(GameObject[0]);
        case giveActionAlias:
            return give.handle(GameObject[0]);
        case pickupAliasArnout:
            return pickupActionArnout.handle(GameObject[0]);
        case throwactionAlias:
            return throwAction.handle(GameObject[0]);
        case gaNaarActionAlias:
            return GaNaarAction.handle(GameObject[0]);
        case throwactionAlias: 
        return throwAction.handle(GameObject[0]); 
    }
    return undefined;
}
