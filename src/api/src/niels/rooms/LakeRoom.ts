import { DuwOpAction } from "../actions/DuwOpAction";
import { Example, ExampleActionAlias } from "../../actions/ExampleAction";
import { PakOpAction } from "../actions/PakOpAction";
import { RaakAanAction } from "../actions/RaakAanAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { ZwaardItem } from "../items/ZwaardItem";
import { JuweelItem } from "../items/JuweelItem";
import { RotsItem } from "../items/RotsItem";
import { PlayerSession } from "../../types";
import { PortaalItem } from "../items/PortaalItem";
import { SleutelLakeItem } from "../items/SleutelLakeItem";
import { GaDoorAction } from "../actions/GaDoorAction";
import { ExamineActionNiels } from "../actions/ExamineActionNiels";
export const LakeRoomAlias: string = "lake-room";

/** Makes the Lake Room */
export class LakeRoom extends Room implements Example {
    public constructor() {
        super(LakeRoomAlias, ExampleActionAlias);
    }
    /** Returns the name of the room */
    public name(): string {
        return "Het Meer";
    }

    /** Returns the image of the room */
    public images(): string[] {
        return ["lake"];
    }

    /** Returns the actions that can be used in the room */
    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();
        const actionNames: Action[] = [];
        actionNames.push(new ExamineActionNiels());
        actionNames.push(new DuwOpAction());
        actionNames.push(new PakOpAction());
        actionNames.push(new RaakAanAction());

        if (playerSession.heeftRotsAangeraakt === true) {
            actionNames.push(new GaDoorAction());
        }

        return actionNames;
    }

    /** Returns the objects that can be used in the room */
    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [];

        objects.push(...getGameObjectsFromInventory());

        /** Make a list of objects and enter an item if it isn't already in the inventory. */
        if (playerSession.inventory.includes("juweel") === false) {
            objects.push(new JuweelItem());
        }

        if (playerSession.inventory.includes("zwaard") === false) {
            objects.push(new ZwaardItem());
        }

        objects.push(new RotsItem());

        /** Enter a portal in the list if the player has touched a rock formation. */
        if (playerSession.heeftRotsAangeraakt === true) {
            objects.push(new PortaalItem());
        }

        /** Enter a key in the list if the player has pushed on the rock formation and it isn't already in the inventory. */
        if (playerSession.heeftRotsGeduwd === true && playerSession.heeftSleutelLakeOpgepakt === false) {
            objects.push(new SleutelLakeItem());
        }

        return objects;
    }

    /** Give a description of the current room. */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Je bent bij de rand van een meer. Er is een grote rotspartij te zien, en er liggen een zwaard en een juweel in het gras.",
        ]);
    }

    public example(): ActionResult | undefined {
        return new TextActionResult(["This is an example action executed on a room."]);
    }
}
