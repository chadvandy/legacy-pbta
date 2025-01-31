

const fields = foundry.data.fields;

// The data model for the backing of a Family in Legacy.
export default class FamilyDataModel extends foundry.abstract.TypeDataModel {
    static metadata = Object.freeze({
        type: "family"
    });
    
    /** @override */
    // Build the schema that acts as the validation and fields for all of the data associated
    // with this type.
    static defineSchema() {
        const schema = {};

        // TODO Family stats.
            // TODO Configurable?
        schema.stats = new fields.SchemaField({
            reach: new fields.NumberField({required: true, integer: true, min: -2, max: 3}),
            grasp: new fields.NumberField({required: true, integer: true, min: -2, max: 3}),
            sleight: new fields.NumberField({required: true, integer: true, min: -2, max: 3}),
        })

        // TODO Family resources (Mood / Tech / Data)
        


        return schema;
    }
}