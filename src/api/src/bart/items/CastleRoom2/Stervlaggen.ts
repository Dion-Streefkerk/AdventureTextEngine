import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
// import { getPlayerSession } from "../../../instances";
// import { PlayerSession } from "../../../types";
import { Gebruik, GebruikActionAlias } from "../../actions/Gebruik";

export const FormatItemAlias: string = "Format";

export class FormatItem extends Item implements Examine, Gebruik {
    public constructor() {
        super(FormatItemAlias, ExamineActionAlias, GebruikActionAlias);
    }

    public name(): string {
        return "Format";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Format tekst examine."]);
    }
    public gebruik(): ActionResult | undefined {
        return new TextActionResult(["Format tekst gebruik."]);
    }
}
