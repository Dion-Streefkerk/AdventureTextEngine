// Imports
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Feed, FeedActionAlias } from "../actions/FeedAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { Ride, RideActionAlias } from "../actions/RideAction";

// Setup alias
export const FarmerCharacterAlias: string = "farmer-character";

// Create class with Examine, Feed, Pickup and Ride interfaces
export class FarmerCharacter extends Character implements Examine, Feed, Pickup, Ride {
    // Constructor with the alias to use for the character
    public constructor() {
        super(FarmerCharacterAlias, ExamineActionAlias, FeedActionAlias, PickupActionAlias, RideActionAlias);
    }

    // Name of the character
    public name(): string {
        return "Boer";
    }

    // Examine action for the character
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Een vriendelijke boer die altijd klaar staat om te helpen."]);
    }

    // Talk action for the character
    public talk(_choiceId?: number): ActionResult | undefined {
        // Check the choice id and return the correct action result
        switch (_choiceId) {
            case 1:
                // Formal talk action result
                return new TalkActionResult(
                    this,
                    ["Dat heb ik zeker! Maar ik kan je er niet zomaar een geven. Wat wil je ermee doen?"],
                    [
                        new TalkChoiceAction(3, "Opeten!"),
                        new TalkChoiceAction(4, "Ik ben opzoek naar mijn prinses."),
                    ],
                );
            case 2:
                // Rude talk action result
                return new TextActionResult([
                    "Dat is niet zo aardig. Kunt u alstublieft een beetje respect tonen?",
                ]);
            case 3:
                // Eat the horse action result
                return new TextActionResult([
                    "Waaat?! Nee, dat kan ik niet toestaan. Ik ben een boer, geen slager!",
                ]);
            case 4:
                // Get the player session and set the borrowed horse to true
                const playerSession: PlayerSession = getPlayerSession();

                playerSession.borrowedHorse = true;

                // Return the action result (final)
                return new TextActionResult([
                    "Haha, dat is een mooi verhaal. Hier heb je een paard. Hopelijk vind je je prinses snel!",
                ]);
            default:
                break;
        }

        // Return the default talk action result with the choices
        return new TalkActionResult(
            this,
            ["Hallo daar! Ik ben Henk de boer. Hoe kan ik je helpen?"],
            [
                // Formal talk choice
                new TalkChoiceAction(1, "Heeft u een paard voor mij?"),

                // Rude talk choice
                new TalkChoiceAction(2, "Geef me een paard!"),
            ],
        );
    }

    // Feed action for the character
    public feed(): ActionResult | undefined {
        return new TextActionResult(["Ik eet liever geen graan."]);
    }

    // Pickup action for the character
    public pickup(): ActionResult | undefined {
        return new TextActionResult(["BLIJF VAN MIJ AF!"]);
    }

    // Ride action for the character
    public ride(): ActionResult | undefined {
        return new TextActionResult(["Aaaaah! Wat doe je?!"]);
    }
}
