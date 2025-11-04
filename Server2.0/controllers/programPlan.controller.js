import db from '../config/db.js';
import { validateCreateProgramPlan, validateUpdateProgramPlan } from '../schemas/programPlan.schema.js';

class ProgramPlanController {
    async createProgramPlan(params) {
        try {
            if (!validateCreateProgramPlan(params)) {
                return { error: 'Invalid input', details: validateCreateProgramPlan.errors };
            }

            const { programId, discount, period } = params;

            const [result] = await db.execute(
                'INSERT INTO programPlan (programId, discount, period) VALUES (?, ?, ?)',
                [programId, discount, period]
            );

            return { programPlanId: result.insertId, programId, discount, period };
        } catch (error) {
            throw new Error('Error creating program plan: ' + error.message);
        }
    }

    async getProgramPlanById(params) {
        try {
            const { programPlanId } = params;

            const [rows] = await db.execute(
                'SELECT * FROM programPlan WHERE programPlanId = ?',
                [programPlanId]
            );

            if (rows.length === 0) {
                throw new Error('Program plan not found');
            }

            return rows[0];
        } catch (error) {
            throw new Error('Error retrieving program plan: ' + error.message);
        }
    }

    async updateProgramPlan(params) {
        try {
            if (!validateUpdateProgramPlan(params)) {
                return { error: 'Invalid input', details: validateUpdateProgramPlan.errors };
            }

            const { programPlanId, programId, discount, period } = params;

            const [result] = await db.execute(
                'UPDATE programPlan SET programId = ?, discount = ?, period = ? WHERE programPlanId = ?',
                [programId, discount, period, programPlanId]
            );

            if (result.affectedRows === 0) {
                throw new Error('Program plan not found or no changes made');
            }

            return { programPlanId, programId, discount, period };
        } catch (error) {
            throw new Error('Error updating program plan: ' + error.message);
        }
    }

    async deleteProgramPlan(params) {
        try {
            const { programPlanId } = params;

            const [result] = await db.execute(
                'DELETE FROM programPlan WHERE programPlanId = ?',
                [programPlanId]
            );

            return { affectedRows: result.affectedRows };
        } catch (error) {
            throw new Error('Error deleting program plan: ' + error.message);
        }
    }
}

export default new ProgramPlanController();
