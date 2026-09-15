"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTicketId = void 0;
const generateTicketId = () => {
    const prefix = 'TK';
    const randomDigits = Math.floor(10005 + Math.random() * 89990);
    return `${prefix}-${randomDigits}`;
};
exports.generateTicketId = generateTicketId;
