
class AgentSchedule {
    constructor({
                    agentId = undefined,
                    startTime,
                    recurrenceInterval = undefined,
                    expiryDate = undefined,
                    expiryRuns = -1
                } = {}) {
        AgentSchedule.validateInputs(agentId, startTime, recurrenceInterval, expiryDate, expiryRuns);

        this.agentId = agentId;
        this.startTime = startTime;
        this.recurrenceInterval = recurrenceInterval;
        this.expiryDate = expiryDate;
        this.expiryRuns = expiryRuns;
    }

    static validateInputs(agentId, startTime, recurrenceInterval, expiryDate, expiryRuns) {
        if (agentId !== undefined && !Number.isInteger(agentId)) throw new TypeError('agentId is an optional field ' +
            'and it should be a number');
        if (!(startTime instanceof Date)) throw new TypeError('startTime is a mandatory field and ' +
            'it should be a Date object');
        if (recurrenceInterval !== undefined && typeof recurrenceInterval !== 'string')
            throw new TypeError('recurrenceInterval is an optional field and it should be a string');
        if (expiryDate !== undefined && !(expiryDate instanceof Date)) throw new TypeError('expiryDate is an ' +
            'optional field and it should be a Date object');
        if (!Number.isInteger(expiryRuns)) throw new TypeError('expiryRuns is an optional field ' +
            'and it should be a number');
    }
}

class AgentConfig {
    constructor({
                    name,
                    description,
                    projectId = undefined,
                    goal,
                    instruction,
                    agentWorkflow,
                    constraints,
                    tools,
                    ltmDb = undefined,
                    exit = undefined,
                    permissionType = undefined,
                    iterationInterval,
                    model,
                    schedule = undefined,
                    maxIterations,
                    userTimezone = undefined,
                    knowledge = undefined
                } = {}) {
        AgentConfig.validateInputs(name, description, projectId, goal, instruction, agentWorkflow, constraints, tools,
            ltmDb, exit, permissionType, iterationInterval, model, schedule, maxIterations, userTimezone, knowledge);

        this.name = name;
        this.description = description;
        this.projectId = projectId;
        this.goal = goal;
        this.instruction = instruction;
        this.agentWorkflow = agentWorkflow;
        this.constraints = constraints;
        this.tools = tools;
        this.ltmDb = ltmDb;
        this.exit = exit;
        this.permissionType = permissionType;
        this.iterationInterval = iterationInterval;
        this.model = model;
        this.schedule = schedule;
        this.maxIterations = maxIterations;
        this.userTimezone = userTimezone;
        this.knowledge = knowledge;
    }

    static validateInputs(name, description, projectId, goal, instruction, agentWorkflow, constraints, tools, ltmDb,
                          exit, permissionType, iterationInterval, model, schedule, maxIterations,
                          userTimezone, knowledge) {
        if (typeof name !== 'string') throw new TypeError('name is a mandatory field and it should be a string');
        if (typeof description !== 'string') throw new TypeError('description is a mandatory field ' +
            'and it should be a string');
        if (projectId !== undefined && !Number.isInteger(projectId))
            throw new TypeError('projectId is an optional field and it should be a number');
        if (!Array.isArray(goal) || !goal.every(item => typeof item === 'string'))
            throw new TypeError('goal is a mandatory field and it should be an array of strings');
        if (!Array.isArray(instruction) || !instruction.every(item => typeof item === 'string'))
            throw new TypeError('instruction is a mandatory field and it should be an array of strings');
        if (typeof agentWorkflow !== 'string') throw new TypeError('agentWorkflow is a mandatory field ' +
            'and it should be a string');
        if (!Array.isArray(constraints) || !constraints.every(item => typeof item === 'string'))
            throw new TypeError('constraints is a mandatory field and it should be an array of strings');
        if (!Array.isArray(tools)) throw new TypeError('tools is a mandatory field ' +
            'and it should be an array of objects');
        if (ltmDb !== undefined && typeof ltmDb !== 'string') throw new TypeError('ltmDb is an optional field ' +
            'and it should be a string');
        if (exit !== undefined && typeof exit !== 'string') throw new TypeError('exit is an optional field ' +
            'and it should be a string');
        if (permissionType !== undefined && typeof permissionType !== 'string')
            throw new TypeError('permissionType is an optional field and it should be a string');
        if (!Number.isInteger(iterationInterval)) throw new TypeError('iterationInterval is a mandatory field ' +
            'and it should be a number');
        if (typeof model !== 'string') throw new TypeError('model is a mandatory field and it should be a string');
        if (schedule !== undefined && !(schedule instanceof AgentSchedule))
            throw new TypeError('schedule is an optional field and it should be an instance of AgentSchedule');
        if (!Number.isInteger(maxIterations)) throw new TypeError('maxIterations is a mandatory field ' +
            'and it should be a number');
        if (userTimezone !== undefined && typeof userTimezone !== 'string')
            throw new TypeError('userTimezone is an optional field and it should be a string');
        if (knowledge !== undefined && !Number.isInteger(knowledge))
            throw new TypeError('knowledge is an optional field and it should be a number');
    }
}

class AgentUpdateConfig {
    constructor({
                    name = undefined,
                    description = undefined,
                    projectId = undefined,
                    goal = undefined,
                    instruction = undefined,
                    agentWorkflow = undefined,
                    constraints = undefined,
                    tools = undefined,
                    ltmDb = undefined,
                    exit = undefined,
                    permissionType = undefined,
                    iterationInterval = undefined,