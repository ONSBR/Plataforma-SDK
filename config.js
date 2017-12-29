var config = {};

const eventManagerHost = process.env.EVENT_MANAGER_HOST || "localhost";
const processMemoryHost = process.env.PROCESS_MEMORY_HOST || "localhost";
const domainAppHost = process.env.DOMAIN_APP_HOST || "localhost";

config.PORT = 8081;
config.eventManagerUrl = "http://" + eventManagerHost + ":8081/event";
config.processMemoryUrl = "http://" + processMemoryHost + ":9091/";
config.domainAppUrl = "http://" + domainAppHost + ":9090/";

config.processAppExecutionRelativePath = "../../node_modules/"

module.exports = config;