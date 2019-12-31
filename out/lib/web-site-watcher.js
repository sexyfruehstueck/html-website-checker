"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
class WebSiteWatcher {
    constructor(timeoutDuration, url, searchKey) {
        this.timeoutDuration = timeoutDuration;
        this.url = url;
        this.searchKey = searchKey;
        this.running = false;
    }
    startWatch() {
        if (!this.running) {
            this.running = true;
            this.compute();
        }
    }
    compute() {
        let that = this;
        if (that.running) {
            https.get(that.url, (res) => {
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);
                if (res.statusCode !== 200) {
                    var data;
                    res.on('data', function (chuck) {
                        if (!data) {
                            data = chuck;
                        }
                        else {
                            data += chuck;
                        }
                    });
                    res.on('end', () => {
                        var html = data.toString();
                        var matchFounds = html.match(new RegExp("\\b" + that.searchKey + "\\b", "gi"));
                        if (matchFounds && matchFounds.length > 0) {
                            console.info("FOUND");
                        }
                    });
                }
                else {
                    throw new Error("TEST");
                }
            }).on('error', (e) => {
                console.error(e);
            });
        }
    }
    stopWatch() {
        if (this.running) {
            clearTimeout(this.timeoutIndex);
            this.running = false;
        }
    }
}
exports.WebSiteWatcher = WebSiteWatcher;
