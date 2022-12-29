"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backHalfController = void 0;
function backHalfController(req, res) {
    const { backHalf } = req.params;
    res.send(backHalf);
}
exports.backHalfController = backHalfController;
