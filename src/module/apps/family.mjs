const {api, sheets} = foundry.applications;

import { systemID, systemPath } from "../constants.mjs";

const template_path = "templates/actor/family/";

export default class FamilyActorSheet extends api.HandlebarsApplicationMixin(sheets.ActorSheetV2) {

    /** @override */
    static DEFAULT_OPTIONS = {
        classes: ["legacy", "actor"]
    }

    /** @override */
    /** The context object provided for Handlebars helpers in the HTML sheet. */
    async _prepareContext(options) {
        console.log("Preparing context for FamilyActor.")
        const context = {
            editable: this.isEditable,
            owner: this.document.isOwner,
            limited: this.document.limited,
            
            actor: this.actor,

            system: this.actor.system,
            fields: this.document.schema.fields,

            tabs: this._getTabs(options.parts),
            // systemFields: this.document.system.schema.fields,
        };

        return context;
    }

    /** @override */
    /** 
     * Alter the HBS context for each individual part that makes up the sheet.
     * Allows for finer data control and contexts.
     */
    async _preparePartContext(partId, context, options) {
        await super._preparePartContext(partId, context, options);

        console.log(`Preparing FamilyActor part context of ${partId}`)

        // Add the tab to the context, if this part has an available tab.
        if (context.tabs[partId] != null) {
            context.tab = context.tabs[partId]
        }
        switch(partId) {
            case "stats": 
                // Pass through info about the stats.
                context.stats = this._getStats();
                break;
        }

        return context;
    }

    /** @override */
    // The various Handlebar files used in building the end result HTML file.
    static PARTS = {
        header: {
            template: systemPath("templates/actor/family/header.hbs")
        },
        tabs: {
            template: "templates/generic/tab-navigation.hbs"
        },
        stats: {
            template: systemPath("templates/actor/family/stats.hbs")
        }
    }

    _getStats() {
        const data = this.actor;
        
        console.log("Getting stats of Family actor")

        return Object.keys(legacy.CONFIG.family.stats).reduce((obj, stat) => {
            obj[stat] = {
                field: this.actor.system.schema.getField(["stats", stat, "value"]),
                value: foundry.utils.getProperty(data, "system.family.stats." + stat + ".value")
            }
            return obj;
        }, {});
    }

    /**
     * Generates the data for the generic Foundry tab navigation template.
     * @param {string[]} parts An array of named template parts to render in the sheet. Includes everything in the sheet.
     * @returns {Record<string, Partial<ApplicationTab>>}
     */
    _getTabs(parts) {
        const tabGroup = "primary";

        // TODO Set the default opened tab in the Primary tab group.
        if (!this.tabGroups[tabGroup]) {
            this.tabGroups[tabGroup] = "stats";
        }

        console.log("Building tabs!")

        // Loop through all of the provided parts and construct a 
        // tab object for each, w/ varied inner details.
        return parts.reduce((tabs, partId) => {
            const tab = {
                cssClass: "",
                group: tabGroup,
                id: "",
                icon: "",
                label: "LEGACY.family.tabs",
            }

            switch (partId) {
                case "header": // invalid
                case "tabs": return tabs; // self

                case "stats":
                    tab.id = "stats";
                    tab.label += "Stats";
                    break;
            }

            if (this.tabGroups[tabGroup] === tab.id) {
                tab.cssClass = "active";
            }

            tabs[partId] = tab;
            return tabs;
        }, {});
    }
}