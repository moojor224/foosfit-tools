import { createElement, map } from "../jstools.js";
function inchestomm(inches) {
    return Math.round(inches * 25.4);
}

let tables = [];
let universalPadding = 20;
let shrink = 5;
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
        document.body.add(createElement("div").add(
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
            let { length, wall, width, team1 } = table.config;
            let { index, team, man_count, man_spacing, bumper, man } = this.config;
            let center = length / 2 + wall;
            let rodCenter = inchestomm(6 * (index) - 21);
            let rodTop = rodCenter - (inchestomm(5 / 8) / 2) + center;

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
        this.canvasHeight = 2 * wall + length + universalPadding * 2;
        this.canvas.setAttribute("width", 0);
        this.canvas.setAttribute("height", 0);
        this.config.offsetx = (xmax - xmin) / 2 - width / 2 - wall;
    }

    /**
     * 
     * @param {HTMLCanvasElement} this.canvas 
     */
    render() {
        let { width, length, wall, goal } = this.config;
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

function tornado() {
    let tornado1 = new Table({
        length: inchestomm(48),
        width: inchestomm(30),
        goal: inchestomm(8),
        rod_spacing: inchestomm(6),
        wall: inchestomm(1),
        name: "tornado1",
        colors: ["green", "yellow", "black"],
    });
    tornado1.addRod({// yellow goalie
        man_spacing: inchestomm(8.125),
        man_count: 3,
        index: 0,
        team: 1
    });
    tornado1.addRod({// yellow 2-rod
        man_spacing: inchestomm(9.5),
        man_count: 2,
        index: 1,
        team: 1
    });
    tornado1.addRod({// yellow 5-rod
        man_spacing: inchestomm(4.75),
        man_count: 5,
        index: 3,
        team: 1
    });
    tornado1.addRod({// yellow 3-rod
        man_spacing: inchestomm(7.25),
        man_count: 3,
        index: 5,
        team: 1
    });
    tornado1.addRod({//black goalie
        man_spacing: inchestomm(8.125),
        man_count: 3,
        index: 7,
        team: 2
    });
    tornado1.addRod({// black 2-rod
        man_spacing: inchestomm(9.5),
        man_count: 2,
        index: 6,
        team: 2
    });
    tornado1.addRod({// black 5-rod
        man_spacing: inchestomm(4.75),
        man_count: 5,
        index: 4,
        team: 2
    });
    tornado1.addRod({// black 3-rod
        man_spacing: inchestomm(7.25),
        man_count: 3,
        index: 2,
        team: 2
    });
    tornado1.render();
    return tornado1;
}



function figureOutGoalBounds(table) {
    let { offsetx, wall, width, goal } = table.config;
    let rod = table.rods.filter(r => r.config.index == 0)[0];
    let { man_count, man_spacing, man, bumper } = rod.config;
    let rodLength = (man_count - 1) * man_spacing + man + 2 * bumper;

    let rodCenterLeft = offsetx + universalPadding + wall + rodLength / 2;
    let goalLeft = offsetx + wall + (width - goal) / 2 + universalPadding;
    let goalRight = goalLeft + goal;
    let rodCenterRight = offsetx + universalPadding + wall + width - (rodLength / 2);

    return ({
        min: map(goalLeft, rodCenterLeft, rodCenterRight, 0, 255),
        max: map(goalRight, rodCenterLeft, rodCenterRight, 0, 255),
    });
}

function flatConvert(intable, outtable, index) { // 1-1 direct convert
    outtable.rodControl.querySelector(`input[data-index="${index}"]`).value = intable.rodControl.querySelector(`input[data-index="${index}"]`).value;
}

function simpleGoalConvert(in_table, out_table, index) { // same logic as table test 1
    let pos = in_table.rodControl.querySelector(`input[data-index="${index}"]`).value;
    let i = figureOutGoalBounds(in_table);
    let o = figureOutGoalBounds(out_table);
    let val;
    if (pos < i.min) {
        val = map(pos, 0, i.min, 0, o.min);
    } else if (pos < i.max) {
        val = map(pos, i.min, i.max, o.min, o.max);
    } else {
        val = map(pos, i.max, 255, o.max, 255);
    }
    val = Math.floor(val);
    out_table.rodControl.querySelector(`input[data-index="${index}"]`).value = val;
}
let tornado1 = tornado();
let tornado2 = new Table({
    length: inchestomm(48),
    width: inchestomm(40),
    goal: inchestomm(8),
    rod_spacing: inchestomm(6),
    wall: inchestomm(1),
    name: "tornado2",
});
tornado2.addRod({// yellow goalie
    man_spacing: inchestomm(8.125),
    man_count: 3,
    index: 0,
    team: 1
});
tornado2.addRod({// yellow 2-rod
    man_spacing: inchestomm(9.5),
    man_count: 2,
    index: 1,
    team: 1
});
tornado2.addRod({// yellow 5-rod
    man_spacing: inchestomm(4.75),
    man_count: 5,
    index: 3,
    team: 1
});
tornado2.addRod({// yellow 3-rod
    man_spacing: inchestomm(7.25),
    man_count: 3,
    index: 5,
    team: 1
});
tornado2.addRod({//black goalie
    man_spacing: inchestomm(8.125),
    man_count: 3,
    index: 7,
    team: 2
});
tornado2.addRod({// black 2-rod
    man_spacing: inchestomm(9.5),
    man_count: 2,
    index: 6,
    team: 2
});
tornado2.addRod({// black 5-rod
    man_spacing: inchestomm(4.75),
    man_count: 5,
    index: 4,
    team: 2
});
tornado2.addRod({// black 3-rod
    man_spacing: inchestomm(7.25),
    man_count: 3,
    index: 2,
    team: 2
});
tornado2.render();

let tornado3 = tornado();

tornado1.bind(tornado2, {
    all: flatConvert,
    goalie: simpleGoalConvert,
});
tornado2.bind(tornado3, {
    all: flatConvert,
    goalie: simpleGoalConvert,
});