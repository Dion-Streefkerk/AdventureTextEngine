// Imports
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { Examine, ExamineAction, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { FarmerCharacter } from "../characters/FarmerCharacter";
import { HorseCharacter } from "../characters/HorseCharacter";
import { SaddleItem } from "../items/SaddleItem";
import { WheatItem } from "../items/WheatItem";
import { PickupAction } from "../actions/PickupAction";
import { RideAction } from "../actions/RideAction";
import { FeedAction } from "../actions/FeedAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { RideToAction } from "../actions/RideToAction";
import { ForestItem } from "../items/ForestItem";

// Setup alias
export const StableRoomAlias: string = "stable-room";

// Create class with Examine interface
export class StableRoom extends Room implements Examine {
    // Constructor with the alias and the display name
    public constructor() {
        super(StableRoomAlias, ExamineActionAlias);
    }

    // Name of the room
    public name(): string {
        return "De Paardenstal";
    }

    // Images of the room
    public images(): string[] {
        return ["stable"];
    }

    // Actions in the room
    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();

        // If the player has entered the horse, return a ride to action
        if (playerSession.enteredHorse) {
            return [new RideToAction()];
        }

        // Return the examine, talk, pickup, ride and feed actions (base)
        return [
            new ExamineAction(),
            new TalkAction(),
            new PickupAction(),
            new RideAction(),
            new FeedAction(),
        ];
    }

    // Objects in the room
    public objects(): GameObject[] {
        // If the player has entered the horse, return a forest item
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.enteredHorse) {
            return [new ForestItem()];
        }

        // Return the farmer, horse, saddle and wheat items (base)
        return [new FarmerCharacter(), new HorseCharacter(), new SaddleItem(), new WheatItem()];
    }

    // Examine action for the room
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Welkom in de paardenstal! Ga in gesprek met de boer."]);
    }
}
