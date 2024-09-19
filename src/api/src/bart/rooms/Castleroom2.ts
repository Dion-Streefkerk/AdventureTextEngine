// import { Example, ExampleAction, ExampleActionAlias } from "../../actions/ExampleAction";
// import { ActionResult } from "../../base/actionResults/ActionResult";
// import { TextActionResult } from "../../base/actionResults/TextActionResult";
// import { Action } from "../../base/actions/Action";
// import { ExamineAction } from "../../base/actions/ExamineAction";
// import { GameObject } from "../../base/gameObjects/GameObject";
// import { Room } from "../../base/gameObjects/Room";
// import { getPlayerSession } from "../../instances";
// import { GebruikAction } from "../actions/Gebruik";

// export const CastleRoom2Alias: string = "castle-room2";

// export class CastleRoom2 extends Room  {
//     public constructor() {
//         super(CastleRoom2Alias, );
//     }

//     public name(): string {
//         return "Castle Room2";
//     }

//     public images(): string[] {
//         return ["Kasteel_demo_2"];
//     }

//     public actions(): Action[] {

//         return [
//             new ExamineAction(),
//             new GebruikAction(),
//             // new TalkAction(),

//         ];
//         // use door??
//     }

//     public objects(): GameObject[] {
//         // Directe initialisatie van objecten in de kamer, zonder checks op de inventaris
//         const objects: GameObject[] = [
//         // new BooksItem(),
//         // new BookshelveItem(),

//     ];

//     return objects;
// }

//     public examine(): ActionResult | undefined {
//         return new TextActionResult([
//             "Nu je eenmaal gearriveerd bent in het kasteel kom je er achter een sleutel nodig te hebben.",
//             "GA OP ZOEK NAAR DE SLEUTEL",
//         ]);
//     }

// }
