import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineActionAlias, ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { EetActionAlias, EetAction } from "./actions/EetAction";
import { PakOpActionAlias, PakOpAction } from "./actions/PakOpAction";
import { RijdActionAlias, RijdAction } from "./actions/RijdAction";
import { VoedActionAlias, VoedAction } from "./actions/VoedAction";

export function handleRoutesDion(
    _room: Room,
    alias: string,
    gameObjects: GameObject[],
): ActionResult | undefined {
    switch (alias) {
        case ExamineActionAlias:
            return ExamineAction.handle(gameObjects[0]);
        case PakOpActionAlias:
            return PakOpAction.handle(gameObjects[0]);
        case RijdActionAlias:
            return RijdAction.handle(gameObjects[0]);
        case VoedActionAlias:
            return VoedAction.handle(gameObjects[0]);
        case EetActionAlias:
            return EetAction.handle(gameObjects[0]);
    }
    return undefined;
}
