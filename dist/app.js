"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_routes_config_1 = require("./users/users.routes.config");
const http_1 = require("http");
const body_parser_1 = require("body-parser");
const winston_1 = require("winston");
const express_winston_1 = require("express-winston");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const debug_1 = __importDefault(require("debug"));
const app = express_1.default();
const server = http_1.createServer(app);
const port = 3000;
const routes = [];
const debugLog = debug_1.default('app');
app.use(body_parser_1.json());
app.use(cors_1.default());
app.use(express_winston_1.logger({
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.json())
}));
routes.push(new users_routes_config_1.UsersRoutes(app));
app.use(express_winston_1.errorLogger({
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.json())
}));
app.get('/', (req, res) => {
    res.status(200).send('Server up and running!');
});
server.listen(port, () => {
    debugLog(`Server running at http://localhost:${port}`);
    routes.forEach((route) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});
//# sourceMappingURL=app.js.map