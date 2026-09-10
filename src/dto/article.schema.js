"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedQuerySchema = void 0;
const zod_1 = require("zod");
exports.paginatedQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
});
//# sourceMappingURL=article.schema.js.map