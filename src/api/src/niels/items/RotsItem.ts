import { ExamineActionAlias } from "../../base/actions/ExamineAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { RaakAan, RaakAanActionAlias } from "../actions/RaakAanAction";
import { DuwOp, DuwOpActionAlias } from "../actions/DuwOpAction";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";
import { ExamineImageResult } from "../../base/actionResults/ExamineImageResult";

export const RotsItemAlias: string = "rots";

/** This class defines a "rock" item */
export class RotsItem extends Item implements Examine, RaakAan, DuwOp {
    public constructor() {
        super(RotsItemAlias, ExamineActionAlias, RaakAanActionAlias, DuwOpActionAlias);
    }
    /** Name of the rock
     * @returns Name of the rock.
     */
    public name(): string {
        return "Rots";
    }

    /** Describe the rock
     * @returns Description of rock and flavour text.
     */
    public examine(): ActionResult | undefined {
        return new ExamineImageResult(
            ["Dit is een grote rotspartij.", "Er is een vreemd symbool op te zien."],
            ["Symbool"],
        );
    }
    /** Let the player touch the rock.
     * @returns A message that a portal appears and sets "hasTouchedRock" to "true" or
     * @returns A message that nothing happens.
     */
    public raakAan(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.heeftRotsAangeraakt === false) {
            playerSession.heeftRotsAangeraakt = true;

            return new TextActionResult([
                "Er is een lichtflits en er verschijnt een portaal in de rotspartij.",
            ]);
        }
        return new TextActionResult(["Je raakt de rots opnieuw aan. Er gebeurt niets."]);
    }

    /** Let the player push on the rock.
     * @returns A message that a key appears and sets "hasPushedRock" to "true" or
     * @returns A message that nothing happens.
     */
    public duwOp(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.heeftRotsGeduwd === false) {
            playerSession.heeftRotsGeduwd = true;

            return new TextActionResult([
                "Na lang duwen op de rotspartij komt er een sleutel tevoorschijn van onder de rots.",
            ]);
        }
        return new TextActionResult(["Je duwt opnieuw op de rots. Er komt verder niets meer tevoorschijn."]);
    }
}
