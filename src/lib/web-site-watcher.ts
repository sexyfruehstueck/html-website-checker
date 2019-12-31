import * as  https  from 'https';

export class WebSiteWatcher  {
    
    private running: boolean = false;
    private timeoutIndex: any;

    constructor(private timeoutDuration: number, private url: string , private searchKey: string) { }

    public startWatch():void {
        if(!this.running){
            this.running = true;
            this.compute(); 
        }
    }

    private compute(){
        let that = this;
        if(that.running){
            https.get(that.url, function(res : any) {

                if(res.statusCode === 200){  
                    var data : any;

                    res.on('data', function(chuck: any) {
                        if(!data){
                            data = chuck;
                        } else {
                            data += chuck;
                        }
                    });

                    res.on('end', function() {
                        var html = data.toString();
                        var matchFounds = html.match(new RegExp("\\b" + that.searchKey + "\\b","gi"));

                        if(matchFounds && matchFounds.length > 0){
                            console.info("FOUND");
                        }

                        if(that.running){
                            that.timeoutIndex = setTimeout(that.compute.bind(that), that.timeoutDuration);
                        }
                    });
                } else {
                    throw new Error("TEST")
                }

            }).on('error', function(error: any) {
                console.error(error);
            });
        }
    }

    public stopWatch():void {
        if(this.running){
            clearTimeout(this.timeoutIndex);
            this.running = false;
        }
    }
}