class Table {
    /**
     * 
     * @param {number} innerWidth inner width of the table
     * @param {number} innerLength inner length of the table
     * @param {number} goalWidth width of the goal
     */
    constructor(innerWidth, innerLength, goalWidth) {
        this.innerWidth = innerWidth;
        this.innerLength = innerLength;
        this.goalWidth = goalWidth;
    }
}
function configureRod(options) {
    let defaults = {
        spacer: 1.5,
        man: 1.5,
        travel: 46,
        man_spacing: 20,
    };
    Object.keys(options).forEach((k) => (defaults[k] = options[k]));
    this.man = defaults;
}
