// TODO Settings and the such.


export const LEGACY = {};

/**
 * Available "Resources" used in the game.
 */
LEGACY.resources = {
    // Name, description, surplus text, need text

}

/**
 * The base configuration for Families.
 */

LEGACY.family = {
    // Available stats for Families.
    /** @type {Record<string, {label: string, min: number, max: number}} */
    stats: {
        reach: {
            label: "LEGACY.family.stats.reach.name"
        },
        grasp: {
            label: "LEGACY.family.stats.grasp.name"
        },
        sleight: {
            label: "LEGACY.family.stats.sleight.name"
        }
    },

    // The minimum and maximum value any stat can have for a family.
    stat_min: -2,
    stat_max: 3,

    // TODO Can Mood be tracked as a Stat, but kept separate in UI and some backend through a flag?
    // Mood is handled separately.
    mood: {
        label: "LEGACY.family.stats.mood.name",
        min: -3,
        max: +3,
    },

    // Expendable resources. Not using the term "resources" since it means something
    // very particular in this system.
    // By default, these are Tech and Data.
    expendable: {
        data: {
            label: "LEGACY.family.expendable.data.name",
            min: 0,
        },
        tech: {
            label: "LEGACY.family.expendable.tech.name",
            min: 0,
        }
    }

    // TODO Mood, Tech, Data, Treaties


    // TODO Default Moves
}