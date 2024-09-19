import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { DuwOpActionAlias, DuwOpAction } from "./actions/DuwOpAction";
import { ExampleAction, ExampleActionAlias } from "../actions/ExampleAction";
import { GaDoorActionAlias, GaDoorAction } from "./actions/GaDoorAction";
import { PakOpActionAlias, PakOpAction } from "./actions/PakOpAction";
import { RaakAanActionAlias, RaakAanAction } from "./actions/RaakAanAction";

/** Deze functie zorgt ervoor dat de juiste actie wordt uitgevoerd op het juiste voorwerp
 *
 * @param alias Alias van de actie
 * @param gameObjects Het voorwerp waarop de actie wordt uitgevoerd
 * @returns
 */
export function handleRoutesNiels(alias: string, gameObjects: GameObject[]): ActionResult | undefined {
    switch (alias) {
        case ExamineActionAlias:
            return ExamineAction.handle(gameObjects[0]);

        case ExampleActionAlias:
            return ExampleAction.handle(gameObjects[0]);

        case PakOpActionAlias:
            return PakOpAction.handle(gameObjects[0]);

        case DuwOpActionAlias:
            return DuwOpAction.handle(gameObjects[0]);

        case GaDoorActionAlias:
            return GaDoorAction.handle(gameObjects[0]);

        case RaakAanActionAlias:
            return RaakAanAction.handle(gameObjects[0]);
    }

    return undefined;
}
