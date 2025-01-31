const {api, sheets} = foundry.applications;

import { systemID, systemPath } from "../constants.mjs";

const template_path = "templates/actor/character/";

export default class CharacterActorSheet extends api.HandlebarsApplicationMixin(sheets.ActorSheetV2) {
    
    /** @override */
    static DEFAULT_OPTIONS = {
        // TODO I believe this is "css classes"?
        classes: ["legacy", "actor"]
    }

    static PARTS = {
        header: {
            template: systemPath(template_path + "header.hbs")
        }
    }

    
    async _configureRenderOptions(options) {
        super._configureRenderOptions(options);
        
        
        // TODO _configureRenderOptions
        // Limit the visible parts being rendered if this is a limited view.
        if (this.document.limited) {
            options.parts = ["header", "tabs", "biography"];
        }
    }

    async _prepareContext(options) {
        const context = {
            actor: this.actor,

            // Permissions / Local user
            isEditable: this.document.isEditable,
            isOwner: this.document.isOwner,
            isLimited: this.document.limited,
            isGM: game.user.isGM,
        }

        return context;
    }

    async _preparePartContext(partId, context, options) {
        super._preparePartContext(partId, context, options);

        // TODO build contexts based on what "part" of the HTML we're asking context for

        return context;
    }
    // constructor(...args) {
    //     super(...args);
    // }


    // /** @override */
    // get template() {

    // }
}