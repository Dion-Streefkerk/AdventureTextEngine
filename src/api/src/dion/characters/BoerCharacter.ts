import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";

import { PlayerSession } from "../../types";

export const BoerCharacterAlias: string = "boer";
export class BoerCharacter extends Character implements Examine {
    public constructor() {
        super(BoerCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Boer";
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            const playerSession: PlayerSession = getPlayerSession();

            if (playerSession.boerheeftgegeven) {
                return new TextActionResult(["Ik heb helaas geen suikerklontjes meer over!"]);
            } else if (!playerSession.suikerklontjesopgepakt) {
                playerSession.suikerklontjesopgepakt = true;
                playerSession.boerheeftgegeven = true;
                return new TextActionResult([
                    "Wat een prachtig paard! Hopelijk zal hij wat opknappen van het eten en kan je avontuur verder!",
                ]);
            }
        } else if (choiceId === 2) {
            return new TextActionResult([
                "Oké dan, ik had al het gevoel dat je niet door dit bos heen was gekomen zoals alle andere voor je. Ik denk dat je het bos niet uit komt...",
            ]);
        }

        return new TalkActionResult(
            this,
            [
                "Hé, ik ben de lokale boer. Ik zie hier niet vaak mensen... Kan ik je ergens mee helpen? Ik heb suikerklontjes bij me voor je paard. Hij ziet er moe uit. Wil je deze meenemen?",
            ],
            [
                new TalkChoiceAction(1, "Ja graag, dat zou erg veel helpen!"),
                new TalkChoiceAction(2, "Nee, deze man staat me niet aan."),
            ],
        );
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Een aparte man staat hier langs de weg. Het lijkt erop dat hij van het platteland komt. Zou hij iets waardevols aanbieden?",
        ]);
    }
}
