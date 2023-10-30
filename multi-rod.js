class Table {
    rods = [];
    /**
     * 
     * @constructor
     * @param {number} innerWidth inner width of the table
     * @param {number} innerLength inner length of the table
     * @param {number} goalWidth width of the goal
     */
    constructor(innerWidth, innerLength, goalWidth) {
        this.innerWidth = innerWidth;
        this.innerLength = innerLength;
        this.goalWidth = goalWidth;
    }
    /**
     * @typedef RodOptions
     * @property {number} spacer
     * @property {number} man
     * @property {number} travel
     * @property {number} man_spacing
     * @property {number} men
     */
    /**
     * adds a new rod to the table defined by dimensions
     * @param {RodOptions} config rod measurements
     */
    addRod(config){
        let defaults = {
            spacer: 1.5,
            man: 1.5,
            travel: 46,
            man_spacing: 20,
            men: 3,
        };
        Object.keys(config).forEach((k) => (defaults[k] = config[k]));
        this.rods.push(config);
    }
    
    #Rod = class Rod{
        /**
         * initializes a new rod on the table
         * @param {number} men number of men
         * @param {number} position rod position
         */
        constructor(men, position, color){
            
        }
        /**
         * adds a new rod to the table defined by dimensions
         * @param {RodOptions} options rod measurements
         */
        configure(options) {
            this.man = defaults;
        }
    }
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    render(canvas){
        console.log("rendering table");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "green";
        ctx.rect(100,0,this.innerWidth, this.innerLength);
        let offsetx = 20;
        let offsety = 20;
    }
}

let tornado = new Table(46, 228, 7);
tornado.addRod({
    men: 2,
});
tornado.render(document.getElementById("output"));