// import { SystemActor } from "./module/documents.mjs";
// import { ActorDataModel } from "./module/data-models.mjs";
import { CharacterDataModel } from "./module/data-models/character.mjs";

Hooks.once("init", () => {
    // CONFIG.Actor.documentClass = SystemActor;

    CONFIG.Actor.dataModels = {
        character: CharacterDataModel
    }

    console.log("Bloop!");
});