import db from '../config/db.js';
import { validateCreateProgramRow, validateUpdateProgramRow } from '../schemas/programRow.schema.js';

class ProgramRowController {
    async createProgramRow(params) {
        const { weekDay,programId ,mealName ,timeMeal,productId} = params;

        try {
            if (!validateCreateProgramRow(params)) {
                return { error: 'Invalid input', details: validateCreateProgramRow.errors };
            }

            const [result] = await db.execute(
                `INSERT INTO programRows ( weekDay,programId ,mealName ,timeMeal,productId)
                 VALUES (?, ?, ?, ?, ?)`,
                [weekDay,programId ,mealName ,timeMeal,productId]
            );

            return { programRowId: result.insertId };
        } catch (error) {
            console.error('❌ Error creating program row:', error);
            throw new Error('Database error');
        }
    }

    async getProgramRowById(params) {
        try {
            const { programRowId } = params;
            const [rows] = await db.execute(
                'SELECT * FROM programRows WHERE programRowId = ?',
                [programRowId]
            );

            if (rows.length === 0) {
                throw new Error('Program row not found');
            }

            return rows[0];
        } catch (error) {
            console.error('❌ Error getting program row:', error);
            throw new Error('Database error');
        }
    }

    async getProgramRowsByProgramId({ programId }) {
    const [rows] = await db.execute(
        `SELECT pr.weekDay, pr.mealName AS meal, pr.timeMeal, p.name, p.weight
         FROM programRows pr
         JOIN products p ON pr.productId = p.productId
         WHERE pr.programId = ?
         ORDER BY FIELD(pr.weekDay, 'ПН','ВТ','СР','ЧТ','ПТ','СБ','НД'), pr.timeMeal`,
        [programId]
    );

    const days = [];

    rows.forEach(row => {
        let day = days.find(d => d.weekDay === row.weekDay);
        if (!day) {
            day = { weekDay: row.weekDay, meals: [] };
            days.push(day);
        }

        let meal = day.meals.find(m => m.meal === row.meal);
        if (!meal) {
            meal = { meal: row.meal, timeMeal: row.timeMeal, description: [] };
            day.meals.push(meal);
        }

        meal.description.push({ name: row.name, weight: row.weight });
    });

    return days;
}

    async deleteProgramRow(params) {
        try {
            const { programRowId } = params;
            const [result] = await db.execute(
                'DELETE FROM programRows WHERE programRowId = ?',
                [programRowId]
            );

            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('❌ Error deleting program row:', error);
            throw new Error('Database error');
        }
    }

    async updateProgramRow(params) {
        const { programRowId, weekDay,programId } = params;

        try {
            if (!validateUpdateProgramRow(params)) {
                return { error: 'Invalid input', details: validateUpdateProgramRow.errors };
            }

            const [result] = await db.execute(
                `UPDATE programRows
                 SET weekDay = ?,programId = ?,
                 WHERE programRowId = ?`,
                [weekDay,programRowId]
            );

            return { affectedRows: result.affectedRows };
        } catch (error) {
            console.error('❌ Error updating program row:', error);
            throw new Error('Database error');
        }
    }
}

export default new ProgramRowController();
