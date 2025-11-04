import programController from '../controllers/program.controller.js';

const program = {
    createProgram: async (params) => {
        return await programController.createProgram(params);
    },
    getProgramById: async (params) => {
        return await programController.getProgramById(params);
    },
    getAllPrograms: async () => {
        return await programController.listPrograms();
    },
    deleteProgram: async (params) => {
        return await programController.deleteProgram(params);
    },
    updateProgram: async (params) => {
        return await programController.updateProgram(params);
    },
};
export default program;