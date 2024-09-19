import { castTo, implementsInterface } from "../../base/helpers";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";

/** Alias used to identity the Examine action and interface */
export const ExamineActionAlias: string = "examine";

/**
 * Interface for GameObjects that need to support the Examine action
 */
export interface Examine {
    /**
     * Execute the Examine action
     *
     * @returns Result of the Examine action
     */
    examine(): ActionResult | undefined;
}

/**
 * Class used to represent the Examine action
 */
export class ExamineActionNiels extends Action {
    /**
     * Create a new instance of the Examine action
     */
    public constructor() {
        super(ExamineActionAlias, "Bekijk", true);
    }

    /**
     * Handle the Examine action
     *
     * @param gameObject Reference to the GameObject on which the Examine action should be executed
     *
     * @returns Result of the action
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, ExamineActionAlias)) {
            return castTo<Examine>(gameObject).examine();
        }

        return undefined;
    }
}
