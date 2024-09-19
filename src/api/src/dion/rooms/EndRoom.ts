import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { stro } from "../characters/stro";
import { Einde } from "../items/einde";
import { raargeluid } from "../items/raargeluid";



export const EndRoomAlias: string = "end-room";

export class EndRoom extends Room {
    public constructor() {
        super(EndRoomAlias);
    }

    public name(): string {
        return "Het Veld";
    }

    public images(): string[] {
        return ["end-room"];
    }

    public actions(): Action[] {
        // hier if statement if examined return new raar geluid?  game over 
        return [new ExamineAction()];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        
        
        if (playerSession.einde && playerSession.examinestro){
            return [new Einde()];
        }
    
        if (playerSession.examinestro){
            return [new raargeluid()];
        }
    
        return [new stro()];
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "je komt terecht in een groot open veld de zon schijnt mischien is dit een goed moment om mijn rust te pakken want ik voel me super duizelig..",
        ]);
    }
    
}
