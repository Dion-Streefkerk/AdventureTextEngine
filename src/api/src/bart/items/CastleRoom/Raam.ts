import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { Gebruik, GebruikActionAlias } from "../../actions/Gebruik";

export const RaamItemAlias: string = "Raam";

export class RaamItem extends Item implements Examine, Gebruik {
    public constructor() {
        super(RaamItemAlias, ExamineActionAlias, GebruikActionAlias);
    }

    public name(): string {
        return "Raam";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Je bekijkt het raam. Het is een groot raam met een mooi uitzicht van het kasteel en omgeving.",
        ]);
    }
    public gebruik(): ActionResult | undefined {
        return new TextActionResult([
            "Je kijkt uit het raam en ziet in de verte het meer waar je wakker werd. Daarna kijk je nog even naar beneden naar de wachters die je binnen hebben gelaten. Ook zie je de tuin en paardenstal van het kasteel.",
        ]);
    }
}
