import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { ThrowActionInterface, throwactionAlias } from "../actions/GooiAction";
import { pakop, pickupAliasArnout } from "../actions/PakOpAction";

export const GuardcharacterAlias: string = "guard";
// here are all actions defined that have to do with the guardcharacter
export class Guardcharacter extends Character implements Examine, pakop, ThrowActionInterface {
    public constructor() {
        super(GuardcharacterAlias, ExamineActionAlias, pickupAliasArnout, throwactionAlias);
    }
    // this function returns the value that label for this gameobject displays
    public name(): string {
        return "wachter";
    }
    // this function returns the value that you get when use the examine on the guardcharacter
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Het is een wachter die de brug aan het bewaken is"]);
    }

    public pakop(): ActionResult | undefined {
        return new TextActionResult(["Oi, zet me neer"]);
    }

    public gooi(): ActionResult | undefined {
        const playerSession: PlayerSession= getPlayerSession();
        const itemIndex:any = playerSession.inventory.indexOf("stone");
        if(itemIndex !== -1){
        playerSession.inventory.splice(itemIndex,1);
        playerSession.hasthrown= true; 
        return new TextActionResult(["je gooit de steen naar de wachter","de steen raakt hem recht op zijn voorhoofd",
         " je hoort de wachter kijhard 'AUW welke klootviool gooit er nou weer somaar een steen naar iemand' schreeuwen "]); 
        }
        return new TextActionResult(["je probeert de wachter to gooien maar hij is te zwaar"]);
    }

    // here are the returned values defined that  you get when you use the talk action on the guard character
    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        switch (_choiceId) {
            case 1:
                return new TalkActionResult(
                    this,
                    [
                        "Haha, dan was het vast heel gezellig met de jonkvrouw.",
                        "Dit is slot Hoogezaal, u bent de zoon van heer Frederiks. ",
                    ],
                    [new TalkChoiceAction(3, "Ah ja juist en met wie was ik gisteren?")],
                );
            case 2:
                return new TalkActionResult(
                    this,
                    ["Nou nou nou jonkheer, rustig aan met die attidude. Ging je date gisteren niet goed?"],
                    [new TalkChoiceAction(4, "Niks rustig aan met die attitude, en DATE?")],
                );
            case 3:
                return new TalkActionResult(
                    this,
                    [
                        "Je was gisteravond op pad gegaan met jonkvrouw Westerbrink, de dochter van heer Westerbrink, van het nabijgelegen slot Zoetaarde.",
                    ],
                    [new TalkChoiceAction(5, "Nu je het zegt.....")],
                );

            case 4:
                return new TalkActionResult(
                    this,
                    [
                        "Ja ik was ook al verbaasd dat een etter zoals jij een date zou kunnen krijgen, maar toch was jij gister op pad",
                        "en dan ook nog met die schat van een jonkvrouw Westerbrink van slot Zoeteraarde hier dichtbij.",
                        "Alleen neem ik aan vanwege jouw humeur dat het gister avond niet zo goed ging",
                    ],
                    [new TalkChoiceAction(5, "Dat gaat jouw helemaal niks aan wachter")],
                );

            case 5:
                playerSession.GotoCastle = true;
                return new TextActionResult([
                    "Er begint je langzaam wat te dagen. Het was half donker toen jullie met zijn tweeën het kasteel verlieten.",
                    "Jullie namen een aangelijnd paard van de nabijgelegen paardenstal en reden het bos in richting het meer. Daar lagen jullie in het gras",
                    "te genieten van de sterren, maar plots was daar een vreemd geluid…",
                    "Nog voor je de gedachte kan afmaken voel je een heftige steek in je hoofd en je zakt door je knieën.",
                    "Je slaat je handen om je gezicht, “Ahhh!”, roep je. “Mijnheer!”, roept de bewaker bezorgd. Het wordt zwart voor je ogen",
                    "en je hoort niet meer wat de bewaker allemaal aan je vraagt, je zakt weg.",
                ]);
            
            case 6: 
            return new TalkActionResult(
                this, 
                ["Oke excuses aanvaard, maar alleen omdat jij mijn jonkheer bent", 
                "Oh maar mijn jonkheer, ik hoorde dat jij gisteren een wilde avond heb gehad"],
                [
                    new TalkChoiceAction(1,"Bedankt voor het aanvaarden en misschien was het ook gisteravond iets te wild")
                ]
                ); 
            
            case 7:
                playerSession.GotoCastle = true;
                return new TextActionResult(["Je trapt de wachter tegen zijn schenen aan en het lukt je om langs hem te rennen",
            "'Hoe die etter van een jonkheer de jonkvrouw heeft weten te versieren zal ik nooit snappen' hoor je de wachter vloeken.",
        "Na deze woorden gehoord te hebben begint er je langzaam wat te dagen... je bent de  jonkheer van dit slot.",
        "Voordat je in je eentje bij het meer wakker werd, herinner je dat jij samen met de jonkvrouw van het nabijgelegen slot Westerbrink gisteravond op pad bent gegaan",
         "richting het meer.",
        "Jullie namen toen een aangelijnd paard van de nabijgelegen paardenstal en reden het bos in richting het meer.",
        "Daar lagen jullie in het gras, te genieten van de sterren, maar plots hoorden jullie een vreemd geluid…",
        "Je slaat je handen om je gezicht, “Ahhh!”, roep je. “Etter!”, roept de bewaker bezorgd.",
        "Het wordt zwart voor je ogen, je hoort niet meer wat de bewaker allemaal aan je vraagt, en zakt weg."]); 
        }

        if(playerSession.hasthrown=== true){
            return new TalkActionResult(
                this, 
                ["HEY, WAS JIJ DE ETTER DIE DIE STEEN GOOIDE" ], 
                [
                    new TalkChoiceAction(6,"Ja sorry meneer hij gleed uit mijn hand toen ik hem van de brug wel gooien"), 
                    new TalkChoiceAction(7,"Fack jouw ouwe flikker [trap hem tegen zn schenen aan]")
                ]
                );
        }
        else{
        return new TalkActionResult(
            this,
            [
                "Welkom terug jonkheer",
                "wilde nacht achter de rug?",
                "zegt de bewaker met een grijns op zijn gezicht",
            ],
            [
                new TalkChoiceAction(1, "Ja.. eh.. wellicht iets te wild... waar ben ik precies?"),
                new TalkChoiceAction(2, "Dat gaat jou niks aan oude man, vertel me waar ik ben"),
            ],
        );
        }
    }
}
