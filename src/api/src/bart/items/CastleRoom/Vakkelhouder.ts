import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { Gebruik, GebruikActionAlias } from "../../actions/Gebruik";

export const VakkelhouderItemAlias: string = "Vakkelhouder";

export class VakkelhouderItem extends Item implements Examine, Gebruik {
    public constructor() {
        super(VakkelhouderItemAlias, ExamineActionAlias, GebruikActionAlias);
    }

    public name(): string {
        return "Fakkelhouder";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "hmmn, een lege fakkelhouder. Misschien zit iets in.",
        ]);
    }
    public gebruik(): ActionResult | undefined {
        return new TextActionResult([
            "Je gebruikt wat objecten om je heen te klimmen naar de fakkelhouder.",
            "Je kijkt in de fakkelhouder en ziet op wat stof na niks verschijnen.",
        ]);
    }
}
