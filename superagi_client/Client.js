const { validateApiKey } = require('./lib/Auth');
const Superagi = require('./lib/Superagi');
const { AgentConfig, AgentUpdateConfig, AgentRun, AgentRunFilter } = require('./Types');

class Client {
    /**
     * Initialize the Client.
     *
     * @param {Object} options - The options for the client.
