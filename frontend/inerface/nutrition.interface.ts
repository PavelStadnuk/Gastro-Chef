// продукт всередині прийому їжі
interface Product {
  name: string;
  weight: string;
}

// одна страва
interface Meal {
  meal: string;
  timeMeal: string;
  description?: Product[];
}

// день програми
interface ProgramDay {
  weekDay: string;
  meals?: Meal[];
}

// сама програма
export interface NutritionProgram {
  programId: number;
  name: string;
  description: string;
  price: number;
  plan: ProgramDay[]; // масив днів
}
