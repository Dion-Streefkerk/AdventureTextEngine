// Imports
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getRoomByAlias } from "../instances";
import { FarmerCharacter, FarmerCharacterAlias } from "./characters/FarmerCharacter";
import { HorseCharacter, HorseCharacterAlias } from "./characters/HorseCharacter";
import { ForestItem, ForestItemAlias } from "./items/ForestItem";
import { SaddleItem, SaddleItemAlias } from "./items/SaddleItem";
import { WheatItem, WheatItemAlias } from "./items/WheatItem";
import { StableRoom, StableRoomAlias } from "./rooms/StableRoom";

// Export the aliases for room(s)
export function getRoomByAliasJoeri(alias: string): Room | undefined {
    switch (alias) {
        case StableRoomAlias:
            return new StableRoom();
    }

    return undefined;
}

/**
 * Get the instance of a game object by its alias
 *
 * @param alias Alias of the game object
 *
 * @returns Instance of the game object
 */
// Export the aliases for game objects
export function getGameObjectByAliasJoeri(alias: string): GameObject | undefined {
    switch (alias) {
        case FarmerCharacterAlias:
            return new FarmerCharacter();
        case HorseCharacterAlias:
            return new HorseCharacter();
        case SaddleItemAlias:
            return new SaddleItem();
        case WheatItemAlias:
            return new WheatItem();
        case ForestItemAlias:
            return new ForestItem();

        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            // Return the room if no game object is found
            return getRoomByAlias(alias);
    }
}
