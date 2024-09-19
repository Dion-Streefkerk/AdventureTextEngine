import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { Gebruik, GebruikActionAlias } from "../../actions/Gebruik";

export const VaasItemAlias: string = "Vaas";

export class VaasItem extends Item implements Examine, Gebruik {
    public constructor() {
        super(VaasItemAlias, ExamineActionAlias, GebruikActionAlias);
    }

    public name(): string {
        return "Vaas";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Een beetje groen mag inderdaad wel hier binnen.",
            "De vaas is ook zeker niet verkeerd.",
        ]);
    }
    public gebruik(): ActionResult | undefined {
        return new TextActionResult([
            "Je pakt de vaas op en zet hem weer terug.",
            "Helaas niks van een sleutel te vinden.",
        ]);
    }
}
