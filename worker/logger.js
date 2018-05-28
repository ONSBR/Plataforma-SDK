
module.exports = class Logger {

    constructor(context) {
        this.context = context;

        if (!this.context.logs) {
            this.context.logs = []
        }
    }

    info (msg) {
        this.context.logs.push({"level": "info", "message":msg});
    }

    fatal (msg) {
        this.context.logs.push({"level": "fatal", "message":msg});
    }

    warning (msg) {
        this.context.logs.push({"level": "warning", "message":msg});
    }

    debug (msg) {
        this.context.logs.push({"level": "debug", "message":msg});
    }
}
