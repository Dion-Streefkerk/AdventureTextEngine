import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { PlayerSession } from "./types";
import { getRoomByAlias as getRoomByAliasNiels } from "./niels/instances";
import { getGameObjectByAliasNiels } from "./niels/instances";
import { ExampleRoomAlias, ExampleRoom } from "./rooms/ExampleRoom";
import { ExampleItem, ExampleItemAlias } from "./items/ExampleItem";
import { ExampleCharacter, ExampleCharacterAlias } from "./characters/ExampleCharacter";
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { getGameObjectByAliasJoeri, getRoomByAliasJoeri } from "./joeri/instances";
import { getGameObjectByAliasBart, getRoomByAliasBart } from "./bart/instances";
import { getGameObjectByAliasDion, getRoomByAliasDion } from "./dion/instances";
import { getGameObjectbyAliasArnout, getroomByAliasArnout } from "./arnout/instances";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "startup",
        inventory: [],
        heeftRotsGeduwd: false,
        heeftRotsAangeraakt: false,
        heeftSleutelLakeOpgepakt: false,
        hasFedHorse: false,
        borrowedHorse: false,
        enteredHorse: false,
        gebrokenzwaardopgepakt: false,
        paddenstoelopgepakt: false,
        suikerklontjesopgepakt: false,
        boerheeftgegeven: false,
        ispaardgevoed: false,
        iszwaardgegeven: false,
        hasthrown: false,
        GotoCastle: false,
        PickedUpKey: false,
        examinestro: false,
        einde: false,

    };
}

/**
 * Get the player session from the current request
 *
 * @returns Player session from the current request
 */
export function getPlayerSession(): PlayerSession {
    return getPlayerSessionFromContext<PlayerSession>();
}

/**
 * Reset the player session
 */
export function resetPlayerSession(): void {
    resetPlayerSessionInContext(createNewPlayerSession);
}

/**
 * Get the instance of a room by its alias
 *
 * @param alias Alias of the room
 *
 * @returns Instance of the room
 */
export function getRoomByAlias(alias: string): Room | undefined {
    let room: Room | undefined = getRoomByAliasNiels(alias);

    if (room) {
        return room;
    }

    room = getRoomByAliasJoeri(alias);

    if (room) {
        return room;
    }

    room = getRoomByAliasDion(alias);

    if (room) {
        return room;
    }

    room = getRoomByAliasBart(alias);

    if (room) {
        return room;
    }

    room = getroomByAliasArnout(alias);
    if (room) {
        return room;
    }

    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();

        case ExampleRoomAlias:
            return new ExampleRoom();
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
export function getGameObjectByAlias(alias: string): GameObject | undefined {
    let gameObject: GameObject | undefined = getGameObjectByAliasNiels(alias);

    if (gameObject) {
        return gameObject;
    }

    gameObject = getGameObjectByAliasJoeri(alias);

    if (gameObject) {
        return gameObject;
    }

    gameObject = getGameObjectByAliasDion(alias);

    if (gameObject) {
        return gameObject;
    }

    gameObject = getGameObjectByAliasBart(alias);

    if (gameObject) {
        return gameObject;
    }

    gameObject = getGameObjectbyAliasArnout(alias);
    if (gameObject) {
        return gameObject;
    }

    switch (alias) {
        case ExampleItemAlias:
            return new ExampleItem();

        case ExampleCharacterAlias:
            return new ExampleCharacter();

        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            return getRoomByAlias(alias);
    }
}

/**
 * Get a list of game objects instances by their alias
 *
 * @param alias List of game object aliases
 *
 * @returns List of game object instances
 */
export function getGameObjectsByAliases(objectAliases?: string[]): GameObject[] {
    return objectAliases?.map((e) => getGameObjectByAlias(e)!).filter((e) => e) || [];
}

/**
 * Get a list of game object instances based on the inventory of the current player session
 *
 * @returns List of game object instances
 */
export function getGameObjectsFromInventory(): GameObject[] {
    return getGameObjectsByAliases(getPlayerSession().inventory);
}
