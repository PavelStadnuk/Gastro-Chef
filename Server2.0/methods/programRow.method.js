import programRowController from '../controllers/programRow.controller.js';

const programRow = {
    createProgramRow: async (params) => {
        return await programRowController.createProgramRow(params);
    },
    getProgramRowById: async (params) => {
        return await programRowController.getProgramRowById(params);
    },
    getProgramRowsByProgramId: async (params) => {
        return await programRowController.getProgramRowsByProgramId(params);
    },
    deleteProgramRow: async (params) => {
        return await programRowController.deleteProgramRow(params);
    },
    updateProgramRow: async (params) => {
        return await programRowController.updateProgramRow(params);
    },
};
export default programRow;