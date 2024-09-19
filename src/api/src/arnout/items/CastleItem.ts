import { ActionResult } from "../../base/actionResults/ActionResult";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { GaNaarActionInterface, gaNaarActionAlias } from "../actions/GaNaarAction";
import { CastleRoom } from "../../bart/rooms/CastleRoom";
import { PlayerSession } from "../../types";

export const castleItemAlias: string = "CastleArnout";

export class CastleItem extends Item implements GaNaarActionInterface {
    public constructor() {
        super(castleItemAlias, gaNaarActionAlias);
    }

    public name(): string {
        return "kasteel";
    }

    public GaNaar(): ActionResult | undefined {
        const playerSession: PlayerSession= getPlayerSession();
        const itemIndex:any = playerSession.inventory.indexOf("stone");
        if(itemIndex !== -1){
            playerSession.inventory.splice(itemIndex,1);
            const room: CastleRoom = new CastleRoom();

        getPlayerSession().currentRoom = room.alias;

        return room.examine();
        }


        const room: CastleRoom = new CastleRoom();

        getPlayerSession().currentRoom = room.alias;

        return room.examine();
    }
}

