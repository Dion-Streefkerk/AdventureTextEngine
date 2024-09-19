import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineImageResult } from "../../base/actionResults/ExamineImageResult";
import { Examine } from "../../base/actions/ExamineAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { ExamineActionAlias } from "../../niels/actions/ExamineActionNiels";
import { PlayerSession } from "../../types";


export const StroItemAlias: string = "stro";


export class stro extends Character implements Examine{

    public constructor() {
        super(StroItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "stro";
    }

    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        throw new Error("Method not implemented.");
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.examinestro = true;

        return new ExamineImageResult(

            [
                "dit ziet er erg comfortabel uit ik ga even me ogen rusten hier de ridder zal me hopelijk beshermen ik ben namelijk zo ongelofelijk moe.......",
            ],
            ["end-room2"],
        );
    }

}
