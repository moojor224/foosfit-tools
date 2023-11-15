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

// `                                
//                                 
//        1111                     
//      1111111                    
//      111  11                    
//      11    11                   
//      1      11                  
//     11  11   1                  
//   1111  11    1                 
//   1111        1           11    
//     11       111         111    
//     11     11111 1     11   1   
//     11  1111111 1111   1    1   
//     1111111111     1111     1   
//     11111111          11   11   
//      111               11    1  
//      111                11   1  
//      111                 1   1  
//     1111                  1  1  
//     1111                  1111  
//     1111                    11  
//     1111                    1   
//     1111                    1   
//     11111     1            11   
//     11111      1           1    
//     11111       11        11    
//      1111         111  1111     
//      111 11          11  1      
//       1    11   11      1       
//           11 111 11   11        
//          111111    1111         
//           111      1111         `.replaceAll(" ", 0).replaceAll("\n", "").match(/.{1,8}/g).map(e => "0b" + e);
// var chunkSize = 8;
// var arr = [];
// for (let i = 0; i < a.length; i += chunkSize) {
//     const chunk = a.slice(i, i + chunkSize);
//     arr.push(chunk.join(","))
// }
// console.log(arr.join(",\n"));