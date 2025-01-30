const { HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export class CharacterDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            // Stats - Force, Lore, Steel, Sway
            // Name - string
            // Looks - string (html?)
            // Backstory - string array
            // Playbook (object?) (ForeignDocumentField)
            // Harm (Schema) 
                // Harm Level (Schema)
                    // Name; Stat modifier; Checked
            // Roles
                // Array of 4+
                // Move; checked; previous
            resources: new SchemaField({
                name: new StringField({ required: true, label: "Name"})
            })
        };
    }
}