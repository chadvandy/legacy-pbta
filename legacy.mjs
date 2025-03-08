// import { SystemActor } from "./module/documents.mjs";
// import { ActorDataModel } from "./module/data-models.mjs";

import * as documents from "./src/module/documents/_export.mjs";
import * as applications from "./src/module/apps/_export.mjs";
import * as data from "./src/module/data/_export.mjs";

import {LEGACY} from "./src/module/config.mjs";
import * as SYS_CONST from "./src/module/constants.mjs";

// Define global variable to access various portions of the
// module from anywhere internally.
globalThis.legacy = {
    documents,
    applications,
    data,
    CONST: SYS_CONST,
    CONFIG: LEGACY,
}

// import { CharacterDataModel } from "./data-models/character.mjs";
// import { SystemActor } from "./module/documents/character.mjs";

// Entry point for the Legacy system.

// TODO Draft up needed functionality

// TODO Create sheets for all relevant components
// TODO Reference existing examples:
/*
https://github.com/philote/masks-newgeneration-unofficial/blob/main/templates/sheets/actor-sheet.hbs
https://github.com/asacolips-projects/pbta/blob/main/src/templates/actors/actor-sheet.html
*/

Hooks.once("init", () => {

    // Loop through & assign loaded Document classes.
    for (const doc_class of Object.values(documents)) {
        // Ensure that the exported class is actually from the foundry Document class.
        if (!foundry.utils.isSubclass(doc_class, foundry.abstract.Document)) continue;

        // Add the document class.
        CONFIG[doc_class.documentName].documentClass = doc_class;
    }

    const templates = [];

    // Set up data model classes.
    for (const [doc, models] of Object.entries(data)) {
        // Ensure that the data model has a loaded document type.
        if (!CONST.ALL_DOCUMENT_TYPES.includes(doc)) continue;

        // Loop through all data models loaded in.
        for (const modelCls of Object.values(models)) {
            // Save it within ".dataModels" if the underlying data model class specifies a type.
            if (modelCls.metadata?.type) CONFIG[doc].dataModels[modelCls.metadata.type] = modelCls;

            // Load it within the templates array, since these are data models for the partial sheets.
            if (modelCls.metadata?.detailsPartial) templates.push(...modelCls.metadata.detailsPartial);
        }
    }

    templates.map(t => SYS_CONST.systemPath(t));

    // loadTemplates(templates);

    // CONFIG.Actor.documentClass = SystemActor;

    // Remove the default Foundry ActorSheet.
    Actors.unregisterSheet("core", ActorSheet);
    
    // Register custom sheet application classes.
    Actors.registerSheet(SYS_CONST.systemID, applications.CharacterActorSheet, {
        types: ["character"],
        makeDefault: true,
        label: "LEGACY.Sheet.Labels.Character",
    })
    
    // Family sheet.
    Actors.registerSheet(SYS_CONST.systemID, applications.FamilyActorSheet, {
        types: ["family"],
        makeDefault: true,
        label: "LEGACY.Sheet.Labels.Family",
    })

    // CONFIG.Actor.dataModels = {
    //     character: CharacterDataModel
    // }

    console.log("Bloop!");
});