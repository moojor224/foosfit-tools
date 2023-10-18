class Table {
    constructor(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }
    configureRod(options) {
        let defaults = {
            spacer: 1.5,
            man: 1.5,
            travel: 46,
            man_spacing: 20,
        };
        Object.keys(options).forEach(k => defaults[k] = options[k]);
        this.man = defaults;
    }

}
function renderTable(table) {

}