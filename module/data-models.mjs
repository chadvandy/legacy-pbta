const { HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;



class ActorDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
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