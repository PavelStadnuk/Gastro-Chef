import db from "../config/db.js";
import { validateCreateProgram, validateUpdateProgram } from "../schemas/program.schema.js";

class ProgramController {
    
    async createProgram(params) {
        const { name, description, price, type,calorieContent } = params;
        if (!validateCreateProgram(params)) {
            return {
                code: -32602,
                message: "Invalid parameters",
                errors: validateCreateProgram.errors,
            };
        }
        try {
            const [result] = await db.execute(
                "INSERT INTO programs (name, description, price, type,calorieContent) VALUES (?, ?, ?, ?,?)",
                [name, description, price, type,calorieContent]
            );
            return { programId: result.insertId, name, description, price, type,calorieContent };
        } catch (error) {
            console.error("Error creating program:", error);
            throw new Error("Database error");
        }
    }

    // Отримати список усіх програм
    async listPrograms() {
        try {
            const [rows] = await db.execute("SELECT * FROM programs");
            return rows;
        } catch (error) {
            throw new Error("Error listing programs: " + error.message);
        }
    }

    // Отримати програму по ID разом з її планом
    async getProgramById(params) {
        try {
            const { programId } = params;
            const [programRows] = await db.execute(
                "SELECT * FROM programs WHERE programId = ?",
                [programId]
            );
            if (programRows.length === 0) throw new Error("Program not found");

            const program = programRows[0];

            const [planRows] = await db.execute(
                `SELECT pr.weekDay, pr.meal, pr.count, p.name AS productName, p.weight
                 FROM programRows pr
                 JOIN products p ON pr.productId = p.productId
                 WHERE pr.programId = ?`,
                [programId]
            );

            
            const groupedPlan = [];
            planRows.forEach(item => {
                let day = groupedPlan.find(d => d.day === item.weekDay);
                if (!day) {
                    day = { day: item.weekDay, meals: [] };
                    groupedPlan.push(day);
                }
                day.meals.push({
                    meal: item.meal,
                    productName: item.productName,
                    count: item.count,
                    weight: item.weight,
                });
            });

            return { ...program, plan: groupedPlan };
        } catch (error) {
            throw new Error("Error retrieving program: " + error.message);
        }
    }

    
    async updateProgram(params) {
        if (!validateUpdateProgram(params)) {
            return {
                code: -32602,
                message: "Invalid parameters",
                errors: validateUpdateProgram.errors,
            };
        }
        const { programId, name, description, price, type,calorieContent } = params;
        try {
            const [result] = await db.execute(
                "UPDATE programs SET name = ?, description = ?, price = ?, type = ? ,calorieContent=? WHERE programId = ?",
                [name, description, price, type,calorieContent,programId]
            );
            return { affectedRows: result.affectedRows };
        } catch (error) {
            throw new Error("Error updating program: " + error.message);
        }
    }

    
    async deleteProgram(params) {
        const { programId } = params;
        try {
            const [result] = await db.execute(
                "DELETE FROM programs WHERE programId = ?",
                [programId]
            );
            return { affectedRows: result.affectedRows };
        } catch (error) {
            throw new Error("Error deleting program: " + error.message);
        }
    }
}

export default new ProgramController();
