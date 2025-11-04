import programPlanController from '../controllers/programPlan.controller.js'

const programPlan = {
    createProgramPlan: async (params) => {
        return await programPlanController.createProgramPlan(params);
    }
    ,
    getProgramPlanById: async (params) => {
        return await programPlanController.getProgramPlanById(params);
    },
    updateProgramPlan: async (params) => {
        return await programPlanController.updateProgramPlan(params);
    },
    deleteProgramPlan: async (params) => {
        return await programPlanController.deleteProgramPlan(params);
    }
}
export default programPlan;