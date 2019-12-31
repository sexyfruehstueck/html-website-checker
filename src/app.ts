
import { WebSiteWatcher } from './lib/web-site-watcher';

class Application {
    static main(args:any[]):void{
        var newWatcher = new WebSiteWatcher(args[0],args[1],args[2]);
        newWatcher.startWatch();
    }
}

Application.main([process.env.npm_package_config_timeout, process.env.npm_package_config_url, process.env.npm_package_config_username]);