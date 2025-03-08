

const fields = foundry.data.fields;

// The data model for the backing of a Family in Legacy.
export default class FamilyDataModel extends foundry.abstract.TypeDataModel {

    /** @override */
    static metadata = Object.freeze({
        type: "family"
    });


    
    /** @override */
    // Build the schema that acts as the validation and fields for all of the data associated
    // with this type.
    static defineSchema() {
        const schema = {};

        // Parts of the schema are defined via the config.mjs file.
        const stats = {required: true, initial: 0, integer: true, min: legacy.CONFIG.family.stat_min, max: legacy.CONFIG.family.stat_max}

        // TODO Name
        // TODO Playbook
        // TODO Description
        // TODO Biography

        // Loops through every stat in the family.stats config block
        // and builds a new SchemaField with a single NumberField named "value".
        // This handles the editable Family stats - Reach, Grasph, and Sleight.
        schema.stats = new fields.SchemaField(
            Object.entries(legacy.CONFIG.family.stats).reduce((obj, [stat, {label}]) => {
                obj[stat] = new fields.SchemaField({
                    value: new fields.NumberField({...stats, label})
                });
                return obj;
            }, {})
        )

        // Handle Family mood.
        schema.mood = new fields.SchemaField({
            value: new fields.NumberField({
                initial: 0, 
                integer: true,
                min: legacy.CONFIG.family.mood.min,
                max: legacy.CONFIG.family.mood.max,
                label: legacy.CONFIG.family.mood.label,
            })
        })
        


        return schema;
    }
}