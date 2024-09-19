// Imports
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Feed, FeedActionAlias } from "../actions/FeedAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { Ride, RideActionAlias } from "../actions/RideAction";
import { SaddleItemAlias } from "../items/SaddleItem";
import { WheatItemAlias } from "../items/WheatItem";

// Setup alias
export const HorseCharacterAlias: string = "horse-character";

// Create class with Examine, Feed, Pickup and Ride interfaces
export class HorseCharacter extends Character implements Examine, Ride, Feed, Pickup {
    // Constructor with the alias to use for the character
    public constructor() {
        super(HorseCharacterAlias, ExamineActionAlias, RideActionAlias, FeedActionAlias, PickupActionAlias);
    }

    // Name of the character
    public name(): string {
        // Get the player session and check if the player has a borrowed horse
        return "Paard";
    }

    // Examine action for the character
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Een mooi sterk paard!"]);
    }

    // Talk action for the character
    public talk(_choiceId?: number): ActionResult | undefined {
        return new TextActionResult(["Hinnik!"]);
    }

    // Ride action for the character
    public ride(): ActionResult | undefined {
        // Get the player session
        const playerSession: PlayerSession = getPlayerSession();

        // If the player has no borrowed horse, return a text action result
        if (!playerSession.borrowedHorse) {
            return new TextActionResult(["Je hebt geen paard om op te rijden."]);
        }

        // If the player has no saddle, return a text action result
        if (!playerSession.inventory.includes(SaddleItemAlias)) {
            return new TextActionResult(["Je hebt geen zadel om op het paard te rijden."]);
        }

        // If the player has not fed the horse, return a text action result
        if (!playerSession.hasFedHorse) {
            return new TextActionResult(["Het paard heeft niet genoeg energie om op te bewegen."]);
        }

        // Set the entered horse to true and return a text action result
        playerSession.enteredHorse = true;

        playerSession.inventory = playerSession.inventory.filter((item) => item !== SaddleItemAlias);

        // Return the action result (final)
        return new TextActionResult(["Je rijdt op het paard."]);
    }

    // Feed action for the character
    public feed(): ActionResult | undefined {
        // Get the player session
        const playerSession: PlayerSession = getPlayerSession();

        // If the player has no borrowed horse, return a text action result
        if (!playerSession.borrowedHorse) {
            return new TextActionResult(["Je hebt geen paard om eten te geven."]);
        }

        // If the player has no wheat, return a text action result
        if (!playerSession.inventory.includes(WheatItemAlias)) {
            return new TextActionResult(["Je hebt geen eten voor het paard."]);
        }

        // If the player has fed the horse, return a text action result
        if (playerSession.hasFedHorse) {
            // Return if the horse has already been fed (final)
            return new TextActionResult(["Je hebt het paard al gevoerd."]);
        } else if (!playerSession.hasFedHorse) {
            // Set the has fed horse to true and remove the wheat from the inventory
            playerSession.hasFedHorse = true;

            playerSession.inventory = playerSession.inventory.filter((item) => item !== WheatItemAlias);

            // Return the action result (final)
            return new TextActionResult(["Je geeft het paard wat eten."]);
        }

        // Return undefined if the checks fail
        return undefined;
    }

    // Pickup action for the character
    public pickup(): ActionResult | undefined {
        return new TextActionResult(["Oeps, dit paard is te groot om op te pakken."]);
    }
}
