import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineImageResult } from "../../base/actionResults/ExamineImageResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";


export const eindeAlias: string = "wat is dit?";

export class Einde extends Item implements Examine{
    public constructor() {
        super(eindeAlias, ExamineActionAlias);
    }

    public name(): string {
        return "wat was dit ? ";
    }

    public examine(): ActionResult | undefined {
        
        return new ExamineImageResult(

            [
                "Bedankt voor het spelen van knights quest!",
                
            ],
            ["gameover"],
        );
    
    }
}