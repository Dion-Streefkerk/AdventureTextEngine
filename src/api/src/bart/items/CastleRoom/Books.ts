import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
// import { getPlayerSession } from "../../instances";
// import { PlayerSession } from "../../types";
import { Gebruik, GebruikActionAlias } from "../../actions/Gebruik";

export const BooksItemAlias: string = "Books";

export class BooksItem extends Item implements Examine, Gebruik {
    public constructor() {
        super(BooksItemAlias, ExamineActionAlias, GebruikActionAlias);
    }

    public name(): string {
        return "Boeken";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["De boeken zien er oud en stoffig uit."]);
    }
    public gebruik(): ActionResult | undefined {
        return new TextActionResult([
            "Je pakt een boek uit de kast en bladert er doorheen.",
            "Je vind een kaart die lijd naar het mysterieuze bos van de verloren zielen.",
        ]);
    }
}
