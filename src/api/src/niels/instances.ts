import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { JuweelItemAlias, JuweelItem } from "./items/JuweelItem";
import { PortaalItemAlias, PortaalItem } from "./items/PortaalItem";
import { RotsItemAlias, RotsItem } from "./items/RotsItem";
import { SleutelLakeItemAlias, SleutelLakeItem } from "./items/SleutelLakeItem";
import { ZwaardItemAlias, ZwaardItem } from "./items/ZwaardItem";
import { LakeRoomAlias, LakeRoom } from "./rooms/LakeRoom";

/** Make the lake room
 *
 * @param alias Alias of the room
 * @returns The lake room
 */
export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {
        case LakeRoomAlias:
            return new LakeRoom();
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
export function getGameObjectByAliasNiels(alias: string): GameObject | undefined {
    switch (alias) {
        case ZwaardItemAlias:
            return new ZwaardItem();

        case RotsItemAlias:
            return new RotsItem();

        case JuweelItemAlias:
            return new JuweelItem();

        case PortaalItemAlias:
            return new PortaalItem();

        case SleutelLakeItemAlias:
            return new SleutelLakeItem();

        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            return getRoomByAlias(alias);
    }
}
