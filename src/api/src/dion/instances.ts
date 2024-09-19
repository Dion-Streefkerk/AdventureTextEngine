import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getRoomByAlias } from "../instances";
import { StartupRoomAlias, StartupRoom } from "../rooms/StartupRoom";
import { BoerCharacter, BoerCharacterAlias } from "./characters/BoerCharacter";
import { PaardCharacterAlias, PaardCharacter } from "./characters/PaardCharacter";
import { RidderCharacter, RidderCharacterAlias } from "./characters/RidderCharacter";
import { GebrokenZwaardItem, GebrokenZwaardItemAlias } from "./items/GebrokenZwaardItem";
import { PaddenstoelItem, PaddenstoelItemAlias } from "./items/PaddenstoelItem";
import { StroItemAlias, stro } from "./characters/stro";
import { EndRoom, EndRoomAlias } from "./rooms/EndRoom";
import { ForestRoom, ForestRoomAlias } from "./rooms/ForestRoom";
import { raargeluid, raargeluidAlias } from "./items/raargeluid";
import { Einde, eindeAlias } from "./items/einde";

export function getRoomByAliasDion(alias: string): Room | undefined {
    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();

        case ForestRoomAlias:
            return new ForestRoom();
        case EndRoomAlias:
            return new EndRoom();
    }

    return undefined;
}

export function getGameObjectByAliasDion(alias: string): GameObject | undefined {
    switch (alias) {
        case RidderCharacterAlias:
            return new RidderCharacter();

        case GebrokenZwaardItemAlias:
            return new GebrokenZwaardItem();

        case PaddenstoelItemAlias:
            return new PaddenstoelItem();

        case BoerCharacterAlias:
            return new BoerCharacter();
        case PaardCharacterAlias:
            return new PaardCharacter();
        case StroItemAlias:
            return new stro();
        case raargeluidAlias:
            return new raargeluid();
        case eindeAlias:
            return new Einde();

        default:
            return getRoomByAlias(alias);
    }
}
