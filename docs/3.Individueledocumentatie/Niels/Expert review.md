# Learning Story #15: Als student wil ik leren hoe ik interfaces toepas in mijn code

Om deze learning story te kunnen doen, ben ik op zoek gegaan naar informatie over interfaces, te beginnen met de (https://kb-se-b3.hbo-ict.cloud/5_gameengine/1_documentation/#game-engine)[Knowledgebase.]

Vervolgens ben ik verder gaan zoeken, bij (https://www.w3schools.com/java/java_interface.asp)[W3Schools.]

Toen ik eenmaal had geleerd hoe ik met interfaces aan de slag moest, ben ik hiermee aan de slag gegaan in de code.

Hier is een voorbeeld van een interface die ik heb gedefiniëerd:

```typescript
/** Interface for picking up objects 
 * 
 * @interface
 */
export interface PakOp {
    pakOp(): ActionResult | undefined;
}
```
Ik maak hier een interface aan voor de methode die de speler in staat stelt iets op te pakken.

In het bestand waar ik een sleutel aanmaak, doe ik dit: 

```typescript
/** This class defines a "key" item */
export class SleutelItem extends Item implements Examine, PakOp {}
```
Hier definiëer ik een klasse voor de sleutel, die de bovenstaande interface en de interface "Examine" implementeert. Ik heb dit zo gedaan om ervoor te zorgen dat ik voor dit object niet de methodes opnieuw hoef te bepalen.

Voor dit voorwerp heb ik de interface als volgt geïmplementeerd:

```typescript
    /** Allow the player to pick up the key.
     * 
     * @returns A message that the key has been added or
     * @returns A message that the key is already in the inventory
     */
    public pakOp(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.inventory.includes("sleutel") === false) {
            playerSession.inventory.includes("sleutel") === true;
            playerSession.inventory.push(SleutelItemAlias);

            return new TextActionResult(["De sleutel is toegevoegd aan je inventaris!"]);
        }
        return new TextActionResult(["Je hebt de sleutel al opgepakt."]);
    }
```
Voor het voorwerp "zwaard" heb ik deze functie bijvoorbeeld als volgt geïmplementeerd:
```typescript
    /** Allow the player to pick up the sword.
     * 
     * @returns A message that the sword has been added or
     * @returns A message that the sword is already in the inventory
     */
    public pakOp(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.inventory.includes("zwaard") === false) {
            playerSession.inventory.push(ZwaardItemAlias);

            return new TextActionResult(["Het zwaard is toegevoegd aan je inventaris!"]);
        }
        return new TextActionResult(["Je hebt het zwaard al opgepakt."]);
    }
```
Zo kan ik dezelfde interface op andere manieren implementeren, en ik kan ook een voorwerp meer acties meegeven, bijvoorbeeld "oppakken" en "bekijken" voor het sleutel-voorwerp.


# Learning Story #13: Als student wil ik leren hoe ik abstracte classes toepas in mijn code

Ik heb deze learning story geleerd door gebruik te maken van (https://www.w3schools.com/typescript/typescript_classes.php)[deze bron.]

Ik heb abstracte klasses op verscheidene plekken in mijn code toegepast, zoals bijvoorbeeld hier:

```typescript
/**
 * Base class used to represent a room
 *
 * @remarks Implements the Examine and Custom action by default
 */
export abstract class Room extends GameObject implements Examine, Custom {}
```

Dit is de abstracte klasse voor "kamer", en deze vul ik hier in:

```typescript
/** Makes the Lake Room */
export class LakeRoom extends Room implements Example {}
```
De bovenliggende klasse (Room), heeft de attributen "images()", "actions()", "objects()", en "examine()".

In de klasse LakeRoom geef ik aan deze methodes het volgende mee:

* images(): Ik geef hier het alias "lake" mee, zodat de juiste afbeelding in de code verschijnt.
* actions(): Ik geef hier de acties van mijn kamer mee, zoals "oppakken" en "duwen op".
* objects(): Ik geef hier de objecten van mijn kamer mee, inclusief wat if-statements zodat voorwerpen maar 1 keer kunnen worden opgepakt, en zodat bepaalde voorwerpen alleen verschijnen als er bepaalde handelingen zijn verricht.
* examine(): Ik geef hier een beschrijving van de kamer mee.

Ik gebruik hier de abstracte klasse omdat deze een handige blauwdruk voor elke kamer geeft, zodat ik het gewenste gedrag in de functies kan zetten zonder me verder ermee bezig te houden.

# Learning Story #14: Als student wil ik leren hoe ik static functies en variabelen gebruik in mijn code

Ik heb deze learning story geleerd door gebruik te maken van (https://www.w3schools.com/js/js_class_static.asp)[deze pagina.]

Ik heb static functions op verscheidene plekken in mijn code toegepast, zoals hier:

```typescript
    /**
     * @param gameObject 
     * @returns An implementation of "duwOp" in "gameObject"
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, DuwOpActionAlias)) {
            return castTo<DuwOp>(gameObject).duwOp();
        }

        return undefined;
    }
```
Dit doe ik zodat ik deze functie overal kan gebruiken.

Dat doe ik hier:
```typescript
export function handleRoutesNiels(
    alias: string,
    gameObjects: GameObject[],
): ActionResult | undefined {
    switch (alias) {
        case DuwOpActionAlias:
            return DuwOpAction.handle(gameObjects[0]);
    }
}
```

Ik gebruik deze functie om het duwen op een voorwerp voor elkaar te krijgen, en om ervoor te zorgen dat er alleen een resultaat wordt gegeven als er ook een resultaat _is_.

Door een static functie te gebruiken, hoef ik niet een functie te importeren voor elke functie van mijn kamer, wat de code minder ingewikkeld maakt en het over het algemeen gemakkelijker maakt.

Op dit moment heb ik nog geen static objects in gebruik, maar ik kan wel zien hoe ze handig zouden kunnen zijn, bijvoorbeeld om een "zwaard"-voorwerp in alle kamers beschikbaar te maken.

# Learning Story #16: Als student wil ik leren wat generics zijn en hoe ik ze gebruik in mijn code

Ik heb deze learning story geleerd door (https://www.typescriptlang.org/docs/handbook/2/generics.html)[deze bron] te gebruiken.

Hier is een voorbeeld van het gebruik van een generic:

```typescript
    /** Implements "gaDoor"
     *
     * @param gameObject
     * @returns An implementation of "gaDoor" in "gameObject"
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, GaDoorActionAlias)) {
            return castTo<GaDoor>(gameObject).gaDoor();
        }

        return undefined;
    }
```

De castTo functie gebruikt hier een generic. Deze functie ziet er zo uit in het bronbestand:

```typescript
/**
 * Cast the given instance of a class to T
 *
 * @param instance Instance of a class to cast
 *
 * @returns Casted instance
 */
export function castTo<T>(instance: unknown): T {
    return instance as T;
}
```
Deze functie neemt dus een voorwerp van een onbekende klasse en wijst het de klasse toe die wordt opgegeven binnen de kleiner- en groter-dan-tekens.

In het gaDoor-bestand wordt er dus een "gameObject" voorwerp genomen, en dat krijgt de klasse GaDoor toegewezen, waarna de functie "gaDoor" daaruit wordt uitgevoerd.

# Learning Story #11: Als student wil ik leren hoe ik de OO-principes abstraction, encapsulation en inheritance toepas in mijn code

## Abstraction

In de game-engine staat een abstracte klasse genaamd "Room".

Deze klasse heeft de volgende methodes:

```typescript
    public images(): string[] {
        return [];
    }

    public actions(): Action[] {
        return [];
    }

    public objects(): GameObject[] {
        return [];
    }

    public abstract examine(): ActionResult | undefined;

       public custom(alias: string, gameObjects: GameObject[] | undefined): ActionResult | undefined {
        return undefined;
    } 
```

Ik gebruik deze klasse als een blauwdruk voor de klasse LakeRoom, die mijn kamer beschrijft.

In de functie "images()" geef ik de locatie van mijn afbeelding mee.

In "actions()" zet ik de acties van mijn kamer neer, met wat extra logica, zoals hier is te zien:

```typescript
    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();
        const actionNames: Action[] = [];
        actionNames.push(new ExamineActionNiels());
        actionNames.push(new DuwOpAction());
        actionNames.push(new PakOpAction());
        actionNames.push(new RaakAanAction());

        if (playerSession.heeftRotsAangeraakt === true) {
            actionNames.push(new GaDoorAction());
        }

        return actionNames;
    }
```

In de functie "objects()" zet ik de objecten neer die in mijn kamer staan, met extra logica.

Vervolgens zet ik in de functie "examine()" een beschrijving van de kamer neer.

Ik gebruik de functie "custom()" geheel niet.

## Encapsulation

Ik heb zelf nog niet echt encapsulation in dit project kunnen toepassen, aangezien we niet met player sessions werken.

Ik maak wel indirect gebruik van encapsulation in de klasse "ExamineImageResult". 

Deze klasse heeft de volgende attributen:

```typescript
    private _images: string[];

    public constructor(text: string[], images: string[]) {
        super(text);

        this._images = images;
    }

    public get images(): string[] {
        return this._images;
    }
```

De urls naar de afbeelding die wordt ingevoegd zijn dus "private", waardoor ze niet van buitenaf kunnen worden aangepast.

In de constructor kan de afbeelding worden aangepast. Deze constructor is "public", waardoor deze in andere klasses kan worden aangeroepen.
Dat maakt werken hiermee makkelijker.

## Inheritance

Ik gebruik inheritance meerdere keren in mijn code.

Zo erft de klasse LakeRoom over van de klasse Room, die zelf weer overerft van de klasse "GameObject".

De klasse "GameObject" heeft het attribuut "name()". Deze wordt overgeërfd in de klasse LakeRoom, en daar ingevuld:

```typescript
    /** Returns the name of the room */
    public name(): string {
        return "Het Meer";
    }
```

In de klasse "Room" worden deze attributen aangemaakt:

```typescript
    /**
     * Images used to graphically represent this room
     *
     * @returns List of images
     */
    public images(): string[] {
        return [];
    }

    /**
     * Actions that can be used in this room
     *
     * @returns List of actions
     */
    public actions(): Action[] {
        return [];
    }

    /**
     * Game objects that are located inside this room
     *
     * @returns List of actions
     */
    public objects(): GameObject[] {
        return [];
    }

    public abstract examine(): ActionResult | undefined;
```

Deze vul ik dan verder in in mijn kamer. Ik gebruik hier inheritance zodat ik de attributen uit de bovenliggende klasses kan gebruiken en ze niet opnieuw hoef te definiëren.

# Learning Story #12: Als student wil ik leren hoe ik het OO-principe polymorfisme toepas in mijn code

Ik gebruik polymorphisme op bepaalde plekken in mijn code. De klasse "Room" heeft de methode "examine()", zoals hier is te zien:

```typescript
    public abstract examine(): ActionResult | undefined;
```

In mijn eigen klasse "LakeRoom" gebruik ik deze methode als volgt:

```typescript
    /** Give a description of the current room. */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Je bent bij de rand van een meer. Er is een grote rotspartij te zien, en er liggen een zwaard en een juweel in het gras.",
        ]);
    }
```

Een van mijn teamgenoten, Arnout, gebruikt deze functie in zijn klasse als volgt:

```typescript
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Na het stappen door de portal wordt de wereld weer helder",
            "Je bevindt je op een brug leidend naar een kasteel in de verte",
        ]);
    }
```

Dit is een voorbeeld van polymorfisme, aangezien we dezelfde (abstracte) functie verschillend gedrag meegeven.