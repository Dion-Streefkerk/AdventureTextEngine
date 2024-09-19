import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { GaNaarAction } from "../actions/GaNaarAction";
import { throwAction } from "../actions/GooiAction";
import { pickupActionArnout } from "../actions/PakOpAction";
import { Guardcharacter } from "../characters/WachtCharacter";
import { CastleItem } from "../items/CastleItem";
import { stoneItem } from "../items/Steen";

export const bridgeroomAlias: string = "bridge-room";
// here are all actions and gameobject made instances off to be accessible in the room
export class bridgeRoom extends Room {
    public constructor() {
        super(bridgeroomAlias);
    }
    // this function returns the name you see above the image in the room
    public name(): string {
        return "2.Bridge";
    }
    // this retuns the image you see in the specific room
    public images(): string[] {
        return ["bridge"];
    }

    // these are all the actions you can take in the room

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.GotoCastle === true) {
            return [new GaNaarAction()];
        }
        return [new ExamineAction(), new TalkAction(), new pickupActionArnout(), new throwAction()];
    }
    // these are all the gameobjects that are in the room
    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.GotoCastle === true) {
            return [new CastleItem()];
        }
        return [new stoneItem(), new Guardcharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Na het stappen door de portal wordt de wereld weer helder",
            "Je bevindt je op een brug leidend naar een kasteel in de verte",
        ]);
    }
}
