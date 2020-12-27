"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = require("../common/common.routes.config");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UserRoutes');
    }
    configureRoutes() {
        this.app.route('/users').get((req, res) => {
            res.status(200).send('List of users');
        });
        this.app
            .route('/users/:id')
            .all((req, res, next) => {
            next();
        })
            .get((req, res) => {
            res.status(200).send(`GET requested for id ${req.params.id}`);
        });
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=users.routes.config.js.map