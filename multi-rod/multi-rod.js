

function inchestomm(inches) {
    return Math.round(inches * 25.4);
}
function mmtoinches(inches) {
    return Math.round(inches / 25.4);
}
let addDemoPBControlButtons = true;
let tables = [];
let universalPadding = 20;
let shrink = 4;
class Table {
    /**
     * @type {Rod[]}
     */
    rods = [];
    /**
     * @typedef  {Object}   TableConfig 
     * @property {Number}   length      length of the field
     * @property {Number}   width       width of the field
     * @property {Number}   goal        goal width
     * @property {Number}   rod_spacing center-to-center spacing of the rods
     * @property {Number}   wall        thickness of the field wall
     * @property {Number[]} team1       array of the rod indeces corresponding to the team whose handles are on the left
     * @method   test
     */
    /**
     * @constructor
     * @param {TableConfig} config table configuration
     */
    constructor(config) {
        /** @type {TableConfig} */
        let defaults = {
            length: inchestomm(56),
            width: inchestomm(30),
            goal: inchestomm(8),
            rod_spacing: inchestomm(6),
            wall: inchestomm(1),
            team1: [0, 1, 3, 5],
            name: "unnamed table",
            colors: ["green", "yellow", "black"]
        };
        Object.keys(config).forEach((k) => (defaults[k] = config[k]));
        this.config = defaults;
        this.canvas = createElement("canvas");
        let rodControl = createElement("rodControl");
        let table = this;
        if (addDemoPBControlButtons) {
            rodControl.add(
                createElement("button", {
                    innerHTML: "load",
                    onclick: function () {
                        table.loadDefense([
                            [145, 145, 143, 145, 143, 97, 6, 6, 6, 6, 6, 6, 6, 11, 44, 95, 127, 147, 173, 229, 240, 240, 233, 183, 147, 125, 130, 154, 173, 169, 170, 182, 203, 233, 213, 64, 11, 147, 209, 88, 37, 152, 203, 196, 196, 197, 186, 33, 27, 165, 203, 175, 40, 47, 165, 203, 179, 206, 186, 162, 163, 190, 200, 163, 196, 204, 193, 210, 189, 156, 186, 186, 74, 24, 85, 142, 104, 150, 210, 196, 216, 182, 60, 51, 164, 145, 54, 98, 14, 11, 30, 53, 84, 130, 173, 204, 230, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 223, 152, 97, 77, 77, 77],
                            // [145, 145, 143, 145, 143, 97, 6, 6, 6, 6, 6, 6, 6, 11, 44, 95, 127, 147, 173, 229, 240, 240, 233, 183, 147, 125, 130, 154, 173, 169, 170, 182, 203, 233, 213, 64, 11, 147, 209, 88, 37, 152, 203, 196, 196, 197, 186, 33, 27, 165, 203, 175, 40, 47, 165, 203, 179, 206, 186, 162, 163, 190, 200, 163, 196, 204, 193, 210, 189, 156, 186, 186, 74, 24, 85, 142, 104, 150, 210, 196, 216, 182, 60, 51, 164, 145, 54, 98, 14, 11, 30, 53, 84, 130, 173, 204, 230, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 223, 152, 97, 77, 77, 77],
                            // [145, 145, 143, 145, 143, 97, 6, 6, 6, 6, 6, 6, 6, 11, 44, 95, 127, 147, 173, 229, 240, 240, 233, 183, 147, 125, 130, 154, 173, 169, 170, 182, 203, 233, 213, 64, 11, 147, 209, 88, 37, 152, 203, 196, 196, 197, 186, 33, 27, 165, 203, 175, 40, 47, 165, 203, 179, 206, 186, 162, 163, 190, 200, 163, 196, 204, 193, 210, 189, 156, 186, 186, 74, 24, 85, 142, 104, 150, 210, 196, 216, 182, 60, 51, 164, 145, 54, 98, 14, 11, 30, 53, 84, 130, 173, 204, 230, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 223, 152, 97, 77, 77, 77],
                            // [145, 145, 143, 145, 143, 97, 6, 6, 6, 6, 6, 6, 6, 11, 44, 95, 127, 147, 173, 229, 240, 240, 233, 183, 147, 125, 130, 154, 173, 169, 170, 182, 203, 233, 213, 64, 11, 147, 209, 88, 37, 152, 203, 196, 196, 197, 186, 33, 27, 165, 203, 175, 40, 47, 165, 203, 179, 206, 186, 162, 163, 190, 200, 163, 196, 204, 193, 210, 189, 156, 186, 186, 74, 24, 85, 142, 104, 150, 210, 196, 216, 182, 60, 51, 164, 145, 54, 98, 14, 11, 30, 53, 84, 130, 173, 204, 230, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 223, 152, 97, 77, 77, 77],
                            // [145, 145, 143, 145, 143, 97, 6, 6, 6, 6, 6, 6, 6, 11, 44, 95, 127, 147, 173, 229, 240, 240, 233, 183, 147, 125, 130, 154, 173, 169, 170, 182, 203, 233, 213, 64, 11, 147, 209, 88, 37, 152, 203, 196, 196, 197, 186, 33, 27, 165, 203, 175, 40, 47, 165, 203, 179, 206, 186, 162, 163, 190, 200, 163, 196, 204, 193, 210, 189, 156, 186, 186, 74, 24, 85, 142, 104, 150, 210, 196, 216, 182, 60, 51, 164, 145, 54, 98, 14, 11, 30, 53, 84, 130, 173, 204, 230, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 223, 152, 97, 77, 77, 77],
                            // [145, 145, 143, 145, 143, 97, 6, 6, 6, 6, 6, 6, 6, 11, 44, 95, 127, 147, 173, 229, 240, 240, 233, 183, 147, 125, 130, 154, 173, 169, 170, 182, 203, 233, 213, 64, 11, 147, 209, 88, 37, 152, 203, 196, 196, 197, 186, 33, 27, 165, 203, 175, 40, 47, 165, 203, 179, 206, 186, 162, 163, 190, 200, 163, 196, 204, 193, 210, 189, 156, 186, 186, 74, 24, 85, 142, 104, 150, 210, 196, 216, 182, 60, 51, 164, 145, 54, 98, 14, 11, 30, 53, 84, 130, 173, 204, 230, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 223, 152, 97, 77, 77, 77],
                            // [145, 145, 143, 145, 143, 97, 6, 6, 6, 6, 6, 6, 6, 11, 44, 95, 127, 147, 173, 229, 240, 240, 233, 183, 147, 125, 130, 154, 173, 169, 170, 182, 203, 233, 213, 64, 11, 147, 209, 88, 37, 152, 203, 196, 196, 197, 186, 33, 27, 165, 203, 175, 40, 47, 165, 203, 179, 206, 186, 162, 163, 190, 200, 163, 196, 204, 193, 210, 189, 156, 186, 186, 74, 24, 85, 142, 104, 150, 210, 196, 216, 182, 60, 51, 164, 145, 54, 98, 14, 11, 30, 53, 84, 130, 173, 204, 230, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 223, 152, 97, 77, 77, 77],
                            [110, 110, 112, 110, 112, 158, 249, 249, 249, 249, 249, 249, 249, 244, 211, 160, 128, 108, 82, 26, 15, 15, 22, 72, 108, 130, 125, 101, 82, 86, 85, 73, 52, 22, 42, 191, 244, 108, 46, 167, 218, 103, 52, 59, 59, 58, 69, 222, 228, 90, 52, 80, 215, 208, 90, 52, 76, 49, 69, 93, 92, 65, 55, 92, 59, 51, 62, 45, 66, 99, 69, 69, 181, 231, 170, 113, 151, 105, 45, 59, 39, 73, 195, 204, 91, 110, 201, 157, 241, 244, 225, 202, 171, 125, 82, 51, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 32, 103, 158, 178, 178, 178], // this one is the first data set but mirrored
                        ]);
                        table.playDefense(16.3);
                    }
                }),
                createElement("button", {
                    innerHTML: "pause",
                    onclick: function () {
                        table.pauseDefense();
                    }
                }),
                createElement("button", {
                    innerHTML: "resume",
                    onclick: function () {
                        table.resumeDefense();
                    }
                }),
                createElement("button", {
                    innerHTML: "stop",
                    onclick: function () {
                        table.stopDefense();
                    }
                }),
            );
        }
        for (let i = 0; i < 8; i++) {
            let input = createElement("input", {
                type: "range",
                min: 0,
                max: 255,
                value: 127,
                dataset: {
                    index: i
                },
                oninput: () => {
                    this.render();
                    input.parentElement.querySelector(".val").innerHTML = " " + input.value;
                }
            });
            rodControl.add(
                createElement("div").add(
                    createElement("span", { innerHTML: "rod " + (i + 1) + " " }),
                    createElement("button", {
                        innerHTML: "-",
                        onclick: () => {
                            input.value--;
                            input.dispatchEvent(new Event("input"));
                        }
                    }),
                    input,
                    createElement("button", {
                        innerHTML: "+",
                        onclick: () => {
                            input.value++;
                            input.dispatchEvent(new Event("input"));
                        }
                    }),
                    createElement("span", { innerHTML: " " + input.value, classList: "val" }),
                    createElement("br")
                )
            );
        }
        this.rodControl = rodControl;
        document.querySelector("div.output").add(createElement("div").add(
            this.canvas,
            createElement("br"),
            rodControl
        ));
        tables.push(this);
    }
    /**
     * @typedef {Object} RodOptions
     * @property {Number} bumper      width of the bumper
     * @property {Number} man         width of the man
     * @property {Number} man_spacing center-to-center spacing between men
     * @property {Number} man_count   number of men
     * @property {Number} index       rod index
     * @property {Number} team        which team the rod belogs to
     */
    /**
     * adds a new rod to the table defined by dimensions
     * @param {RodOptions} config rod measurements
     */
    addRod(config) {
        this.rods.push(new this.#Rod(config));
        this.setupCanvas();
    }

    /**
     * @typedef {Object} Rod
     * @property {Object} config
     */
    #Rod = class {
        config = {};
        /**
         * adds a new rod to the table defined by dimensions
         * @param {RodOptions} config rod measurements
         */
        constructor(config) {
            let defaults = {
                bumper: inchestomm(1), // bumper width
                man: inchestomm(1.25), // man width
                man_spacing: inchestomm(8), // center-to-center
                man_count: 3,
                index: 0,
                team: "red"
            };
            Object.keys(config).forEach((k) => (defaults[k] = config[k]));
            this.config = defaults;
        }

        /**
         * draws the rod to the table
         * @param {CanvasRenderingContext2D} ctx canvas context
         * @param {Table} table the table
         * @param {Number} offsetx left/right offset
         * @param {Number} 0 up/down offset
         */
        draw(ctx, table, offsetx) {
            // console.log("drawing", ctx, table, offsetx, 0);
            let { length, wall, width, team1, rod_spacing } = table.config;
            let { index, team, man_count, man_spacing, bumper, man } = this.config;
            let rodCenter = ((length / 2) + wall) + rod_spacing * (index - 3.5);
            let rodTop = rodCenter - (inchestomm(5 / 8) / 2);

            let rodPos = table.rodControl.querySelector(`input[data-index="${index}"]`)?.value;
            let rodLength = (man_count - 1) * man_spacing + man + 2 * bumper;
            let rodTravel = width - rodLength;
            let rodOffset = map(rodPos, 0, 255, 0, rodTravel);

            ctx.fillStyle = "#a0a0a0";// draw rod
            let rodx = rodOffset + offsetx - rodTravel - (team1.includes(index) ? 30 : 10);
            let rodwidth = rodTravel + width + 2 * bumper + 40;
            ctx.fillRect(rodx + universalPadding, rodTop + universalPadding, rodwidth, inchestomm(5 / 8));

            let handleLength = 120, handleThickness = 40;// draw handle
            let handlex = offsetx + rodOffset + (team1.includes(index) ? (-rodTravel - handleLength - 30) : (2 * wall + width + 30));
            let handley = (rodTop + inchestomm(5 / 8) / 2) - handleThickness / 2;
            ctx.fillStyle = "black";
            ctx.fillRect(handlex + universalPadding, handley + universalPadding, handleLength, handleThickness);

            ctx.font = "50px monospace";// draw rod position
            ctx.fillText(rodPos, handlex + universalPadding, handley + handleThickness + 55 + universalPadding);
            ctx.font = "40px monospace";// draw rod number
            ctx.fillText("rod " + (index + 1), handlex + universalPadding, handley - 5 + universalPadding);

            ctx.fillStyle = "black";// draw bumpers
            ctx.fillRect(offsetx + wall + rodOffset + universalPadding, rodTop - 5 + universalPadding, bumper, inchestomm(5 / 8) + 10); // left bumper
            ctx.fillRect(offsetx + wall + rodOffset + rodLength - bumper + universalPadding, rodTop - 5 + universalPadding, bumper, inchestomm(5 / 8) + 10); // right bumper

            ctx.fillStyle = table.config.colors[team];// draw men
            for (let i = 0; i < man_count; i++) {
                ctx.fillRect(offsetx + wall + bumper + i * (man_spacing) + rodOffset + universalPadding, rodTop - 10 + universalPadding, man, 90);
            }
        }
    }

    /**
     * 
     * @param {Number} index rod index
     * @returns 
     */
    getRodPos(index) {
        return this.rodControl.querySelector(`[data-index="${index}"]`)?.value;
    }

    calculateCanvas() {
        let xvals = [];
        [0, 255].forEach(rodPos => {
            this.rods.forEach(rod => {
                let { wall, width, team1 } = this.config;
                let { index, man_count, man_spacing, bumper, man } = rod.config;
                let rodLength = (man_count - 1) * man_spacing + man + 2 * bumper;
                let rodTravel = width - rodLength;
                let rodOffset = map(rodPos, 0, 255, 0, rodTravel);

                let rodx = rodOffset - rodTravel - (team1.includes(index) ? 30 : 10);
                let rodwidth = rodTravel + width + 2 * bumper + 40;
                xvals.push(rodx, rodx + rodwidth);

                let handleLength = 120
                let handlex = rodOffset + (team1.includes(index) ? (-rodTravel - handleLength - 30) : (2 * wall + width + 30));
                xvals.push(handlex, handlex + handleLength);

            });
        })
        let result = {
            xmin: xvals[0],
            xmax: xvals[0],
        };
        xvals.forEach(x => {
            result.xmin = (result.xmin < x ? result.xmin : x);
            result.xmax = (result.xmax > x ? result.xmax : x);
        });
        return result;
    }

    setupCanvas() {
        let { xmin, xmax } = this.calculateCanvas();
        let { wall, width, length } = this.config;
        this.canvasWidth = xmax - xmin + universalPadding * 2;
        this.canvasHeight = 2 * wall + length + universalPadding * 2 + 50;
        this.canvas.setAttribute("width", 0);
        this.canvas.setAttribute("height", 0);
        this.config.offsetx = (xmax - xmin) / 2 - width / 2 - wall;
    }

    /**
     * 
     * @param {HTMLCanvasElement} this.canvas 
     */
    render() {
        let { width, length, wall, goal, name, offsetx } = this.config;
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.rect(100, 0, width, length);
        let borderColor = "black";
        let fieldColor = this.config.colors[0];

        this.canvas.setAttribute("width", this.canvasWidth / shrink);
        this.canvas.setAttribute("height", this.canvasHeight / shrink);
        ctx.scale(1 / shrink, 1 / shrink);
        ctx.fillStyle = fieldColor; //  draw field
        ctx.fillRect(this.config.offsetx + wall + universalPadding, wall + universalPadding, width, length);

        // {x: 0, y: 0},
        let lineThickness = 10;
        ctx.fillStyle = "white";// draw top goal lines
        ctx.drawPolygon([//inner line
            { x: this.config.offsetx + wall + width / 2 - goal / 2 + universalPadding, y: wall + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 + universalPadding, y: wall + inchestomm(2) + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + universalPadding, y: wall + inchestomm(2) + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + universalPadding, y: wall + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + lineThickness + universalPadding, y: wall + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + lineThickness + universalPadding, y: wall + inchestomm(2) + lineThickness + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - lineThickness + universalPadding, y: wall + inchestomm(2) + lineThickness + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - lineThickness + universalPadding, y: wall + universalPadding },
        ]);
        ctx.drawPolygon([//outer line
            { x: this.config.offsetx + wall + width / 2 - goal / 2 + universalPadding, y: wall + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 + universalPadding, y: wall - inchestomm(2) + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + universalPadding, y: wall - inchestomm(2) + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + universalPadding, y: wall + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + lineThickness + universalPadding, y: wall + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + lineThickness + universalPadding, y: wall - inchestomm(2) - lineThickness + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - lineThickness + universalPadding, y: wall - inchestomm(2) - lineThickness + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - lineThickness + universalPadding, y: wall + length + universalPadding },
        ]);

        // draw bottom goal lines
        ctx.drawPolygon([//inner line
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - inchestomm(2) + universalPadding, y: wall + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - inchestomm(2) + universalPadding, y: wall + inchestomm(2) + inchestomm(1.5) + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + inchestomm(2) + universalPadding, y: wall + inchestomm(2) + inchestomm(1.5) + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + inchestomm(2) + universalPadding, y: wall + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + lineThickness + inchestomm(2) + universalPadding, y: wall + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + lineThickness + inchestomm(2) + universalPadding, y: wall + inchestomm(2) + lineThickness + inchestomm(1.5) + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - lineThickness - inchestomm(2) + universalPadding, y: wall + inchestomm(2) + lineThickness + inchestomm(1.5) + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - lineThickness - inchestomm(2) + universalPadding, y: wall + universalPadding },
        ]);
        ctx.drawPolygon([//outer line
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - inchestomm(2) + universalPadding, y: wall + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - inchestomm(2) + universalPadding, y: wall - inchestomm(2) - inchestomm(1.5) + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + inchestomm(2) + universalPadding, y: wall - inchestomm(2) - inchestomm(1.5) + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + inchestomm(2) + universalPadding, y: wall + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + lineThickness + inchestomm(2) + universalPadding, y: wall + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 + goal / 2 + lineThickness + inchestomm(2) + universalPadding, y: wall - inchestomm(2) - lineThickness - inchestomm(1.5) + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - lineThickness - inchestomm(2) + universalPadding, y: wall - inchestomm(2) - lineThickness - inchestomm(1.5) + length + universalPadding },
            { x: this.config.offsetx + wall + width / 2 - goal / 2 - lineThickness - inchestomm(2) + universalPadding, y: wall + length + universalPadding },
        ]);

        // draw midfield line
        ctx.drawPolygon([
            { x: this.config.offsetx + wall + universalPadding, y: wall + length / 2 - lineThickness / 2 + universalPadding },
            { x: this.config.offsetx + wall + width + universalPadding, y: wall + length / 2 - lineThickness / 2 + universalPadding },
            { x: this.config.offsetx + wall + width + universalPadding, y: wall + length / 2 + lineThickness / 2 + universalPadding },
            { x: this.config.offsetx + wall + universalPadding, y: wall + length / 2 + lineThickness / 2 + universalPadding },
        ]);

        //draw rods
        this.rods.forEach(e => {
            e.draw(ctx, this, this.config.offsetx, 0);
        });

        ctx.fillStyle = borderColor; // draw wall
        ctx.drawPolygon([
            { x: this.config.offsetx + universalPadding, y: 0 + universalPadding },
            { x: this.config.offsetx + universalPadding, y: (2 * this.config.wall) + this.config.length + universalPadding },
            { x: this.config.offsetx + (2 * this.config.wall) + this.config.width + universalPadding, y: (2 * this.config.wall) + this.config.length + universalPadding },
            { x: this.config.offsetx + (2 * this.config.wall) + this.config.width + universalPadding, y: 0 + universalPadding },
            { x: this.config.offsetx + this.config.wall + universalPadding, y: 0 + universalPadding },
            { x: this.config.offsetx + this.config.wall + universalPadding, y: this.config.wall + universalPadding },
            { x: this.config.offsetx + this.config.wall + this.config.width + universalPadding, y: this.config.wall + universalPadding },
            { x: this.config.offsetx + this.config.wall + this.config.width + universalPadding, y: this.config.wall + this.config.length + universalPadding },
            { x: this.config.offsetx + this.config.wall + universalPadding, y: this.config.wall + this.config.length + universalPadding },
            { x: this.config.offsetx + this.config.wall + universalPadding, y: 0 + universalPadding },
        ]);
        ctx.font = "50px monospace";
        ctx.fillStyle = "black";
        console.log();
        ctx.fillText(name, universalPadding + offsetx + wall + (-ctx.measureText(name).width + width) / 2, length + 2 * (universalPadding + wall) + 30);

        // adapt bound child tables
        this.boundChildren.forEach(child => {
            if (child.funcset.all) {
                for (let i = 0; i < 8; i++) {
                    child.funcset.all(this, child.table, i);
                }
            }
            if (child.funcset.goalie) {
                child.funcset.goalie(this, child.table, 0);
                child.funcset.goalie(this, child.table, 7);
            }
            child.table.rodControl.querySelectorAll(`input[data-index]`).forEach(e => e.dispatchEvent(new Event("input")));
        });
    }

    boundChildren = [];
    isBoundTo(table) {
        return table.boundChildren.filter(e => e.table == this).length > 0;
    }

    /**
     * binds a table
     * @param {Table} table 
     * @returns {void}
     */
    bind(table, funcset) {
        if (table.isBoundTo(this) || this.isBoundTo(table) || this == table) {
            return;
        }
        this.boundChildren.push({
            table,
            funcset
        });
        let label = "heyo";
        if (funcset.goalie) {
            table.rodControl.querySelector(`input[data-index='0']`).parentElement.style.display = "none";
            table.rodControl.querySelector(`input[data-index='7']`).parentElement.style.display = "none";
            label = `linked to: ${this.config.name}. some controls unavailable`;
        }
        if (funcset.all) {
            table.rodControl.style.display = "none";
            label = `linked to: ${this.config.name}. all controls unavailable`;
        }
        table.rodControl.insertAdjacentElement("beforebegin", createElement("div", { innerHTML: label }));

    }

    unbind(table) {
        let obj = this.boundChildren.find(e => e.table == table);
        if (index !== undefined) {
            this.boundChildren.splice(this.boundChildren.indexOf(obj), 1);
            table.rodControl.querySelector(`input[data-index='0']`).parentElement.style.display = "";
            table.rodControl.querySelector(`input[data-index='7']`).parentElement.style.display = "";
            table.rodControl.style.display = "";
            table.rodControl.previousElementSibling.remove();
            return true;
        }
        return false;
    }

    unbindAll() {
        let tab = this;
        this.boundChildren.forEach(e => tab.unbind(e));
    }

    reset(val = 127) {
        this.rodControl.querySelectorAll("input:not([style*=\"display: none;\"])").forEach(e => {
            e.value = val;
            e.dispatchEvent(new Event("input"));
        });
    }

    playedPoints = [];
    toBePlayed = [];
    isPaused = false;
    isPlayingBack = false;


    loadDefense(arr) {
        /*
        arr is 2d array of defense points
        first element is rod 0 points,
        2nd element is rod 1, etc
        [
            [127, 100, 255, 123], // rod 0
            [127, 100, 255, 123] // rod 1
            etc...
        ]
        */
        this.toBePlayed = arr;
        this.isPaused = false;
    }

    #hasToBePlayed() {
        for (let i of this.toBePlayed) {
            if (i.length > 0) {
                return true;
            }
        }
        return false;
    }

    playDefense(fps = 1) {
        if (this.isPlayingBack) {
            console.log("already playing");
            return;
        }
        let table = this;
        if (this.#hasToBePlayed()) {
            if (this.isPaused) {
                console.log("paused");
                setTimeout(() => table.playDefense(fps), 100);
                return;
            }
            // console.log("playing next defense frame");
            this.isPlayingBack = true;
            let arr = new Array(8).fill(0).map((e, n) => this.toBePlayed[n]?.shift() || []); // get array of first elements from toBePlayed arr
            arr.forEach((val, i) => {
                if (!Array.isArray(this.playedPoints[i])) {
                    this.playedPoints[i] = [];
                }
                this.playedPoints[i].push(val);
                // the next 4 lines are how you manually set a rod's position
                let input = table.rodControl.querySelector(`[data-index="${i}"]`); // get the rod's input by index
                if (input != undefined) { // if undefined, that rod doesn't exist (shouldn't ever happen)
                    input.value = val; // set value
                    input.dispatchEvent(new Event("input")); // trigger update
                }
            });
            // console.log("setting timeout");
            setTimeout(() => {
                this.isPlayingBack = false;
                table.playDefense(fps);
            }, 1000 / fps);
        } else {
            this.playedPoints = [];
            this.toBePlayed = [];
            this.isPaused = false;
            this.isPlayingBack = false;
        }
    }

    pauseDefense() {
        if (!this.#hasToBePlayed()) {
            return;
        }
        this.isPlayingBack = false;
        this.isPaused = true;
    }

    resumeDefense() {
        this.isPlayingBack = false;
        this.isPaused = false;
    }

    stopDefense() {
        this.playedPoints = [];
        this.toBePlayed = [];
        this.isPaused = false;
        this.isPlayingBack = false;
    }



}

CanvasRenderingContext2D.prototype.drawPolygon = function (points) {
    this.beginPath();

    this.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        this.lineTo(points[i].x, points[i].y);
    }

    this.closePath();
    this.strokeStyle = this.fillStyle;
    this.fill();
    this.stroke();
}




function figureOutGoalBounds(table) {
    let { offsetx, wall, width, goal } = table.config; // get table config
    let rod = table.rods.filter(r => r.config.index == 0)[0]; // get a goalie rod (in this case, it's just the rod at index 0)
    let { man_count, man_spacing, man, bumper } = rod.config; // get rod config
    let rodLength = (man_count - 1) * man_spacing + man + 2 * bumper; // length of rod from bumper to bumper

    let rodCenterLeft = offsetx + universalPadding + wall + rodLength / 2; // x-coordinate of middle of rid when moved all the way to the left
    let goalLeft = offsetx + wall + (width - goal) / 2 + universalPadding; // x-coordinate of left side of goal
    let goalRight = goalLeft + goal; // x-coordinate of right side of goal
    let rodCenterRight = offsetx + universalPadding + wall + width - (rodLength / 2); // x-coordinate of middle of rid when moved all the way to the right

    return ({
        min: map(goalLeft, rodCenterLeft, rodCenterRight, 0, 255), // rod position when middle man is at goal left
        max: map(goalRight, rodCenterLeft, rodCenterRight, 0, 255), // rod position when middle man is at goal right
    });
}

function flatConvert(in_table, out_table, index) { // 1-1 direct convert
    out_table.rodControl.querySelector(`input[data-index="${index}"]`).value = in_table.rodControl.querySelector(`input[data-index="${index}"]`).value; // set the value without any math done to it
}

function simpleGoalConvert(in_table, out_table, index) { // same logic as table test 1
    let pos = in_table.rodControl.querySelector(`input[data-index="${index}"]`).value; // get rod pos (0-255)
    let i = figureOutGoalBounds(in_table); // get min/max positions for goalie rod to block goal with middle man
    let o = figureOutGoalBounds(out_table); // get min/max positions for goalie rod to block goal with middle man
    let val; // result value
    if (pos < i.min) { // do the math
        val = map(pos, 0, i.min, 0, o.min);
    } else if (pos < i.max) {
        val = map(pos, i.min, i.max, o.min, o.max);
    } else {
        val = map(pos, i.max, 255, o.max, 255);
    }
    val = Math.floor(val);
    out_table.rodControl.querySelector(`input[data-index="${index}"]`).value = val; // set the value
}


