import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { GebruikAction, GebruikActionAlias } from "./actions/Gebruik";
import { ExampleAction, ExampleActionAlias } from "./actions/ExampleAction";
import { BartSwitchRoomAction, BartSwitchRoomActionAlias } from "./actions/BartSwitchRoom";

export function handleRoutesBart(
    _room: Room,
    alias: string,
    gameObjects: GameObject[],
): ActionResult | undefined {
    switch (alias) {
        case ExamineActionAlias:
            return ExamineAction.handle(gameObjects[0]);
        case GebruikActionAlias:
            return GebruikAction.handle(gameObjects[0]);
        case ExampleActionAlias:
            return ExampleAction.handle(gameObjects[0]);
        case BartSwitchRoomActionAlias:
            return BartSwitchRoomAction.handle(gameObjects[0]);
    }

    return undefined;
}
