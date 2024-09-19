import { bridgeRoom } from "../arnout/rooms/Bridgeroom";
import { CastleRoom } from "../bart/rooms/CastleRoom";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { EndRoom } from "../dion/rooms/EndRoom";
import { ForestRoom } from "../dion/rooms/ForestRoom";
import { getPlayerSession } from "../instances";
import { StableRoom } from "../joeri/rooms/StableRoom";
import { LakeRoom } from "../niels/rooms/LakeRoom";

export const StartupRoomAlias: string = "startup";

export class StartupRoom extends Room {
    public constructor() {
        super(StartupRoomAlias);
    }

    public name(): string {
        return "Knight's Quest";
    }

    public images(): string[] {
        return ["startup"];
    }

    public actions(): Action[] {
        if (process.env.NODE_ENV === "development") {
            return [
                new CustomAction("start-game", "Begin Spel", false),
                new CustomAction("bridge-room", "Loopbrug", false),
                new CustomAction("castle-room", "Kasteel", false),
                new CustomAction("stable-room", "paardenstal", false),
                new CustomAction("forest-room", "Bos", false),
                new CustomAction("end-room", "End", false),
            ];
        }

        return [new CustomAction("start-game", "Begin Spel", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Welkom bij de game! Klik op 'Begin Spel' om te beginnen!"]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "start-game") {
            const room: LakeRoom = new LakeRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "bridge-room") {
            const room: bridgeRoom = new bridgeRoom();

            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "castle-room") {
            const room: CastleRoom = new CastleRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "stable-room") {
            const room: StableRoom = new StableRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "forest-room") {
            const room: ForestRoom = new ForestRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "end-room") {
            const room: EndRoom = new EndRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
