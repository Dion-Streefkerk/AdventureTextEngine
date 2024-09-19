export type PlayerSession = {
    currentRoom: string;
    inventory: string[];

    // Niels
    heeftRotsGeduwd: boolean;
    heeftRotsAangeraakt: boolean;
    heeftSleutelLakeOpgepakt: boolean;

    // Arnout
    hasthrown: boolean;
    GotoCastle: boolean;

    // Bart
    PickedUpKey: boolean;

    // Joeri
    hasFedHorse: boolean;
    borrowedHorse: boolean;
    enteredHorse: boolean;

    // Dion
    gebrokenzwaardopgepakt: boolean;
    paddenstoelopgepakt: boolean;
    suikerklontjesopgepakt: boolean;
    ispaardgevoed: boolean;
    boerheeftgegeven: boolean;
    iszwaardgegeven: boolean;
    examinestro: boolean;
    einde: boolean;
};
