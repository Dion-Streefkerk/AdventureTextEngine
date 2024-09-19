import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { Gebruik, GebruikActionAlias } from "../../actions/Gebruik";

export const Room315ItemAlias: string = "Room315";

export class Room315Item extends Item implements Examine, Gebruik {
    public constructor() {
        super(Room315ItemAlias, ExamineActionAlias, GebruikActionAlias);
    }

    public name(): string {
        return "Room315";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Je klopt op de deur, maar er wordt niet opengedaan. Je hoort binnen wel wat gemompel en gerommel.",
        ]);
    }

    public gebruik(): ActionResult | undefined {
        return new TextActionResult([
            "De deur zit op slot. misschien kan je wat vragen aan de persoon binnen.",
        ]);
    }

    // public talk(): ActionResult | undefined {
    //     return new TextActionResult([
    //         "Je vraagt of de persoon binnen de princess/jonkvrouw is. Nee, ik ben de schoonmaker de princess/jonkvrouw zit vast weer te niksen op haar kamer. Verder op in de hall.",
    //     ]);
    // }
}
