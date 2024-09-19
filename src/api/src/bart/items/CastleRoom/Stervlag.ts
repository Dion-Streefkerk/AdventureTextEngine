import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { Gebruik, GebruikActionAlias } from "../../actions/Gebruik";
import { getPlayerSession } from "../../../instances";
import { PlayerSession } from "../../../types";

export const TableItemAlias: string = "Table";

export class TableItem extends Item implements Examine, Gebruik {
    public constructor() {
        super(TableItemAlias, ExamineActionAlias, GebruikActionAlias);
    }

    public name(): string {
        return "Stervlag";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Een mooie banner. "]);
    }
    public gebruik(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        playerSession.PickedUpKey = true;

        return new TextActionResult([
            "Je schuift de banner opzij en ziet achter op de banner een SLEUTEL gepakt.",
            "Je pakt de sleutel van de banner en stopt hem in je zak.",
            "-->SLEUTELOPGEPAKT<--",
        ]);
    }
}
