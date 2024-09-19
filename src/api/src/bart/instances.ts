import { GameObject } from "../base/gameObjects/GameObject";
import { getRoomByAlias } from "../instances";
import { BooksItem, BooksItemAlias } from "./items/CastleRoom/Books";
import { ChairsItem, ChairsItemAlias } from "./items/CastleRoom/Chairs";
import { RaamItem, RaamItemAlias } from "./items/CastleRoom/Raam";
import { BookshelveItem, BookshelveItemAlias } from "./items/CastleRoom/Bookshelve";
import { CastleRoom, CastleRoomAlias } from "./rooms/CastleRoom";
import { Room315Item, Room315ItemAlias } from "./items/CastleRoom/Room315";
import { StervlagItem, StervlagItemAlias } from "./items/CastleRoom/Table";
import { TableItem, TableItemAlias } from "./items/CastleRoom/Stervlag";
import { VaasItem, VaasItemAlias } from "./items/CastleRoom/Vaas";
import { VakkelhouderItem, VakkelhouderItemAlias } from "./items/CastleRoom/Vakkelhouder";
import { GaNaarStable, GaNaarStableAlias } from "./items/GaNaarStable";

export function getRoomByAliasBart(alias: string): CastleRoom | undefined {
    switch (alias) {
        case CastleRoomAlias:
            return new CastleRoom();
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
export function getGameObjectByAliasBart(alias: string): GameObject | undefined {
    switch (alias) {
        // Items for Castleroom
        case BooksItemAlias:
            return new BooksItem();
        case BookshelveItemAlias:
            return new BookshelveItem();
        case ChairsItemAlias:
            return new ChairsItem();
        case RaamItemAlias:
            return new RaamItem();
        case Room315ItemAlias:
            return new Room315Item();
        case StervlagItemAlias:
            return new StervlagItem();
        case TableItemAlias:
            return new TableItem();
        case VaasItemAlias:
            return new VaasItem();
        case VakkelhouderItemAlias:
            return new VakkelhouderItem();

        // Items for Castleroom2
        // case BooksItemAlias:
        //     return new BooksItem();
        // case BookshelveItemAlias:
        //     return new BookshelveItem();

        case GaNaarStableAlias:
            return new GaNaarStable();

        default:
            return getRoomByAlias(alias);
    }
}
