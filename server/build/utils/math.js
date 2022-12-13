"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonrepeatRanNums = void 0;
var nonrepeatRanNums = function (ceil, numZero) {
    var zeroIndice = new Set();
    while (zeroIndice.size < numZero) {
        var index = Math.floor(Math.random() * ceil);
        zeroIndice.add(index);
    }
    return Array.from(zeroIndice).sort(function (a, b) { return a - b; });
};
exports.nonrepeatRanNums = nonrepeatRanNums;
