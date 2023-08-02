const { validateApiKey } = require('./lib/Auth');
const Superagi = require('./lib/Superagi');
const { AgentConfig, AgentUpdateConfig, AgentRun, AgentRunFilter } = require('./Types');

class Client {
    /**
     * Initialize the Client.
     *
     * @param {Object} options - The options for the client.
     * @param {string} options.apiKey - The API key for authentication.
     * @param {string} [options.url="https://app.superagi.com"] - The URL of the Superagi service.
     * @param {Superagi} [options.superagi=null] - An instance of the Superagi class.
     * @param {Object} options.kwargs - Additional keyword arguments.
     */
    constructor({
                    apiKey,
                    url = "https://app.superagi.com",
                    superagi = null,
                    ...kwargs
                } = {}) {
        if (typeof apiKey !== 'string') throw new TypeError('apiKey is a mandatory field and it should be a string');
        if (typeof url !== 'string') throw new TypeError('url is an optional field and it should be a string');
        if (superagi !== null && !(superagi instanceof Superagi)) throw new TypeError('superagi is an optional field ' +
            'and it should be an instance of Superagi');

        this.apiKey = apiKey;
        this.url = url;
        this.superagi = superagi;

        validateApiKey(this.url, this.apiKey)

        if (this.superagi === null) {
            this.superagi = new Superagi(this.url, this.apiKey);
        }
    }

    /**
     * Create a new agent.
     *
     * @param {AgentConfig} agentConfig - The configuration for the new agent.
     * @returns {Promise<Object>} A promise that resolves to an object containing the ID of the newly created agent.
     */
    async createAgent(agentConfig) {
        if (!(agentConfig instanceof AgentConfig)) {
            throw new TypeError('agentConfig is a mandatory field and it should be an instance of AgentConfig');
        }
        return await this.superagi.createAgent(agentConfig);
    }

    /**
     * Update an existing agent.
     *
     * @param {number} agentId - The ID of the agent to update.
     * @param {AgentUpdateConfig} agentUpdateConfig - The new configuration for the agent.
     * @returns {Promise<Object>} A promise that resolves to an object containing the ID of the updated agent.
     */
    async updateAgent(agentId, agentUpdateConfig) {
        if (!Number.isInteger(agentId)) {
            throw new TypeError('agentId is a mandatory field and it should be an integer');
        }
        if (!(agentUpdateConfig instanceof AgentUpdateConfig)) {
            throw new TypeError('agentUpdateConfig is a mandatory field and ' +
                'it should be an instance of AgentUpdateConfig');
        }
        return await this.superagi.updateAgent(agentId, agentUpdateConfig);
    }

    /**
     * Pause an agent.
     *
     * @param {number} agentId - The ID of the agent to pause.
     * @param {Array<number>} [agentRunIds=null] - The IDs of the agent runs to pause.
     * @returns {Promise<Object>} A promise that resolves to an object indicating whether the operation was successful.
     */
    async pauseAgent(agentId, agentRunIds = null) {
        if (!Number.isInteger(agentId)) {
            throw new TypeError('agentId is a mandatory field and it should be an integer');
        }
        if (agentRunIds !== null && (!Array.isArray(agentRunIds)
            || !agentRunIds.every(item =