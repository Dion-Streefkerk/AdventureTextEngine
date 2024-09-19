import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineImageResult } from "../../base/actionResults/ExamineImageResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";


export const raargeluidAlias: string = "raar-geluid";

export class raargeluid extends Item implements Examine{
    public constructor() {
        super(raargeluidAlias, ExamineActionAlias);
    }

    public name(): string {
        return "raar geluid?";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.einde = true;

        
        return new ExamineImageResult(

            [
                "je hoort iets ritselen....",
                "er komt iets dichterbij"
            ],
            ["raargeluid"],
        );
    
    }
}



