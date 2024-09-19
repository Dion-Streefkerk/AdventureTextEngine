import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession, getGameObjectsFromInventory } from "../../instances";
import { PlayerSession } from "../../types";
import { EetAction } from "../actions/EetAction";
import { PakOpAction } from "../actions/PakOpAction";
import { RijdAction } from "../actions/RijdAction";
import { VoedAction } from "../actions/VoedAction";
import { BoerCharacter } from "../characters/BoerCharacter";
import { PaardCharacter } from "../characters/PaardCharacter";
import { RidderCharacter } from "../characters/RidderCharacter";
import { GebrokenZwaardItemAlias, GebrokenZwaardItem } from "../items/GebrokenZwaardItem";
import { PaddenstoelItemAlias, PaddenstoelItem } from "../items/PaddenstoelItem";

export const ForestRoomAlias: string = "forest-room";

export class ForestRoom extends Room {
    public constructor() {
        super(ForestRoomAlias);
    }

    public name(): string {
        return "Forest";
    }

    public images(): string[] {
        return ["forest-room"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
            new PakOpAction(),
            new EetAction(),
            new VoedAction(),
            new RijdAction(),
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if (!playerSession.inventory.includes(GebrokenZwaardItemAlias)) {
            objects.push(new GebrokenZwaardItem());
        }
        if (!playerSession.inventory.includes(PaddenstoelItemAlias)) {
            objects.push(new PaddenstoelItem());
        }

        objects.push(new RidderCharacter(), new BoerCharacter(), new PaardCharacter());

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Je rijdt op je paard door het mooie, grimmige bos. Je kijkt in het rond. Dit bos ziet er echt prachtig uit, maar je krijgt er een raar gevoel bij.",
        ]);
    }
}
