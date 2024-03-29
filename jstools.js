/**
 * simplified document.createElement
 * @param {string} tag HTML element tag
 * @param {Object} data data
 * @returns {HTMLElement}
 */
function createElement(tag = "span", data = {}) {
    tag = typeof (tag) === "string" ? document.createElement(tag) : tag;
    Object.keys(data).forEach(e => {
        if (typeof data[e] === "object") {
            createElement(tag[e] || (tag[e] = {}), data[e]);
        } else {
            tag[e] = data[e];
        }
    });
    return tag;
}

window.Element.prototype.add = function (...args) {
    args.forEach(elem => {
        this.append(elem);
    });
    return this;
}

function map(x, inmin, inmax, outmin, outmax) {
    return (x - inmin) * (outmax - outmin) / (inmax - inmin) + outmin;
}