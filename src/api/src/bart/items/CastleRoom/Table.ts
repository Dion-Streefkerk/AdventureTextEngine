import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { Gebruik, GebruikActionAlias } from "../../actions/Gebruik";

export const StervlagItemAlias: string = "Stervlag";

export class StervlagItem extends Item implements Examine, Gebruik {
    public constructor() {
        super(StervlagItemAlias, ExamineActionAlias, GebruikActionAlias);
    }

    public name(): string {
        return "Tafel";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Wat een mooie tafel. Goeie vaklieden hebben deze gemaakt."]);
    }
    public gebruik(): ActionResult | undefined {
        return new TextActionResult([
            "De tafel is misschien functioneel, maar een beetje laag wat mij betreft.",
        ]);
    }
}
