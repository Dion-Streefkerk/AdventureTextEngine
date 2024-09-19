import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getRoomByAlias } from "../instances";
import { Guardcharacter, GuardcharacterAlias } from "./characters/WachtCharacter";
import { CastleItem, castleItemAlias } from "./items/CastleItem";
import { stoneAlias, stoneItem } from "./items/Steen";
import { bridgeRoom, bridgeroomAlias } from "./rooms/Bridgeroom";

export function getroomByAliasArnout(alias: string): Room | undefined {
    switch (alias) {
        case bridgeroomAlias:
            return new bridgeRoom();
    }
    return undefined;
}

export function getGameObjectbyAliasArnout(alias: string): GameObject | undefined {
    switch (alias) {
        case GuardcharacterAlias:
            return new Guardcharacter();
        case stoneAlias:
            return new stoneItem();

        case castleItemAlias:
            return new CastleItem();

        default:
            return getRoomByAlias(alias);
    }
}
