export class FamilyActor extends Actor {
    // async applyDamage(damage) {}

    // TODO getRollData() override?

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();

        // const { health } = this.system.resources;
        // health.value = Math.clamp(health.value, health.min, health.max);
    }
}