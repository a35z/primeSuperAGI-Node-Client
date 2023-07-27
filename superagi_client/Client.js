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
         