"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_site_watcher_1 = require("./lib/web-site-watcher");
class Application {
    static main(args) {
        var newWatcher = new web_site_watcher_1.WebSiteWatcher(args[0], args[1], args[2]);
        newWatcher.startWatch();
    }
}
Application.main([process.env.npm_package_config_timeout, process.env.npm_package_config_url, process.env.npm_package_config_username]);
