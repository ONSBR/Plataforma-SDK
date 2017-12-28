var config = {};

const eventManagerHost = process.env.EVENT_MANAGER_HOST || "localhost";

config.PORT = 8081;
config.eventManagerUrl = "http://" + eventManagerHost + ":8081/event";
config.processMemoryUrl = "http://localhost:9091/";
config.domainAppUrl = "http://localhost:9090/";

module.exports = config;