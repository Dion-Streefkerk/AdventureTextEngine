// import { Example, ExampleAction, ExampleActionAlias } from "../../actions/ExampleAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { GebruikAction } from "../actions/Gebruik";
import { BooksItem } from "../items/CastleRoom/Books";
import { BookshelveItem } from "../items/CastleRoom/Bookshelve";
import { ChairsItem } from "../items/CastleRoom/Chairs";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { RaamItem } from "../items/CastleRoom/Raam";
import { Room315Item } from "../items/CastleRoom/Room315";
import { TableItem } from "../items/CastleRoom/Stervlag";
import { StervlagItem } from "../items/CastleRoom/Table";
import { VaasItem } from "../items/CastleRoom/Vaas";
import { VakkelhouderItem } from "../items/CastleRoom/Vakkelhouder";
import { BartSwitchRoomAction } from "../actions/BartSwitchRoom";
import { GaNaarStable } from "../items/GaNaarStable";

export const CastleRoomAlias: string = "castle-room";

export class CastleRoom extends Room {
    public constructor() {
        super(CastleRoomAlias);
    }

    public name(): string {
        return "Castle Room";
    }

    public images(): string[] {
        return ["Kasteel_demo_1"];
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.PickedUpKey) {
            return [new BartSwitchRoomAction()];
        }

        return [
            new ExamineAction(),
            new GebruikAction(),
            // new TalkAction(),
        ];
        // use door??
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.PickedUpKey) {
            return [new GaNaarStable()];
        }

        return [
            new BooksItem(),
            new BookshelveItem(),
            new ChairsItem(),
            new RaamItem(),
            new Room315Item(),
            new StervlagItem(),
            new TableItem(),
            new VaasItem(),
            new VakkelhouderItem(),
        ];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Nu je eenmaal gearriveerd bent in het kasteel kom je er achter een sleutel nodig te hebben.",
            "-->GA OP ZOEK NAAR DE SLEUTEL",
        ]);
    }
}
