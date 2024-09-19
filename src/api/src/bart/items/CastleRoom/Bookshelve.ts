import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { Gebruik, GebruikActionAlias } from "../../actions/Gebruik";

export const BookshelveItemAlias: string = "Bookshelve";

export class BookshelveItem extends Item implements Examine, Gebruik {
    public constructor() {
        super(BookshelveItemAlias, ExamineActionAlias, GebruikActionAlias);
    }

    public name(): string {
        return "Boekenkast";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Ziet er uit als een normale boekkenkast. Misschien zit er iets achter?",
        ]);
    }
    public gebruik(): ActionResult | undefined {
        return new TextActionResult([
            "Je duwt de boekenkast een stukje naar voren en ziet op wat stof na niks verschijnen.",
        ]);
    }
}
