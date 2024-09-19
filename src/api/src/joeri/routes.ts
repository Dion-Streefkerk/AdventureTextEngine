// Imports
import { ActionResult } from "../base/actionResults/ActionResult";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { FeedAction, FeedActionAlias } from "./actions/FeedAction";
import { PickupAction, PickupActionAlias } from "./actions/PickupAction";
import { RideAction, RideActionAlias } from "./actions/RideAction";
import { RideToAction, RideToActionAlias } from "./actions/RideToAction";

// Handle the routes
export function handleRoutesJoeri(
    _room: Room,
    alias: string,
    gameObjects: GameObject[],
): ActionResult | undefined {
    switch (alias) {
        case PickupActionAlias:
            return PickupAction.handle(gameObjects[0]);
        case FeedActionAlias:
            return FeedAction.handle(gameObjects[0]);
        case RideActionAlias:
            return RideAction.handle(gameObjects[0]);
        case RideToActionAlias:
            return RideToAction.handle(gameObjects[0]);
    }

    return undefined;
}
