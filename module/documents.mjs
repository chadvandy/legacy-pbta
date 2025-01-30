export class SystemActor extends Actor {
    async applyDamage(damage) {}

    prepareDerivedData() {
        super.prepareDerivedData();

        const { health } = this.system.resources;
        health.value = Math.clamp(health.value, health.min, health.max);
    }
}