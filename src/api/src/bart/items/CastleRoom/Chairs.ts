import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { Gebruik, GebruikActionAlias } from "../../actions/Gebruik";

export const ChairsItemAlias: string = "Chairs";

export class ChairsItem extends Item implements Examine, Gebruik {
    public constructor() {
        super(ChairsItemAlias, ExamineActionAlias, GebruikActionAlias);
    }

    public name(): string {
        return "Stoelen";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Wat een mooie stoelen. Goeie vaklieden hebben deze gemaakt."]);
    }
    public gebruik(): ActionResult | undefined {
        return new TextActionResult(["De stoelen zijn voor de sier, ze zitten voor geen meter."]);
    }
}
