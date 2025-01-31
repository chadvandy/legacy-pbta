const { HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export default class CharacterDataModel extends foundry.abstract.TypeDataModel {
    static metadata = Object.freeze({
        type: "character"
    });

    static defineSchema() {
        return {
            // name: new StringField({ required: true, label: "Name"}),
            resources: new SchemaField({
                health: new SchemaField({
                    min: new NumberField({ required: true, integer: true, min: 0, initial: 0}),
                    value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
                    max: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
                }),
            })
        };
    }
}