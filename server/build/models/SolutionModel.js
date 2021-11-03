"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var SolutionSchema = new mongoose_1.default.Schema({ solution: { type: Array, required: true } }, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
exports.SolutionModel = mongoose_1.default.model("Solution", SolutionSchema);
