import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Item } from "../../base/gameObjects/Item";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { pakop, pickupAliasArnout } from "../actions/PakOpAction";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";
import { ThrowActionInterface, throwactionAlias } from "../actions/GooiAction";

export const stoneAlias: string = "stone";
// here are all the returning values defined that you get when do certain actions on the stone item
export class stoneItem extends Item implements Examine, pakop, ThrowActionInterface {
    public constructor() {
        super(stoneAlias, ExamineActionAlias, pickupAliasArnout, throwactionAlias);
    }

    public name(): string {
        return "steen";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Het is een normaal uitziende steen"]);
    }
    // this function checks if the stone item is already in the inventory and if not it adds ti
    public pakop(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (!playerSession.inventory.includes("stone")) {
            playerSession.inventory.includes("stone") === true;
            playerSession.inventory.push(stoneAlias);
            return new TextActionResult(["je hebt de steen opgepakt en toegevoegd aan je inventaris"]);
        }
        return new TextActionResult(["je hebt de steen al opgepakt"]);
    }

     // this function also checks if the stone item is in the inventory if it is it removes it and returns text 
    public gooi(): ActionResult | undefined{
        const playerSession: PlayerSession= getPlayerSession();
        const itemIndex:any = playerSession.inventory.indexOf("stone");
        if(itemIndex !== -1){
        playerSession.inventory.splice(itemIndex,1);
        return new TextActionResult(["je gooit de steen tegen een andere steen aan"]); 
        }
        return new TextActionResult(["je hebt niks om te gooien"]); 


    }

}
