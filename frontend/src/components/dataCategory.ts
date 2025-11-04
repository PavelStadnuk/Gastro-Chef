import candy from '@/assets/candyCategory.png';
import mainImage from '@/assets/candyCategoryMain.png';
import productPhoto from '@/assets/productCandy.png';
export const masDataCategories = Array.from({ length: 10 }).map(
    (category, index) => {
        return {
            id: index + 1,
            name: `категория ${index + 1}`,
            slug: `category-${index + 1}`,
            image: candy,
            mainImage: mainImage,
            description: `Представляем сладкую коллекцию полезных конфет. Созданы с любовью и изготовлены 
из натуральных продуктов без добавления сахара - с заботой о вас и ваших близких!

Стоимость доставки 60 грн по предварительному заказу (за 1 сутки).
Предварительный заказ предполагает доставку на следующий день с 6:00-10:00.
Минимальный заказ - от 6 конфет. Вес 1 кофетки 25 г.

Заказы "на завтра" принимаются до 11-00 текущего дня.

Конфеты доставляются в прозрачных пакетах со стикером. Вы можете заказать 
подарочный бокс с лентой стоимостью 20 грн${index + 1}`
        };
    }
);
export const masProducts = Array.from({ length: 90 }).map((product, index) => {
    return {
        id: index + 1,
        CategoryId: Math.floor(Math.random() * 10) + 1,
        name: `продукт ${index + 1}`,
        slug: `product-${index + 1}`,
        image: productPhoto,
        price: '26грн/1шт',
        Proteins: '1.5г',
        Fats: '0.1г',
        Carbohydrates: '5.2г',
        Calories: '25ккал',
        Composition: 'вода, сахар, лимонная кислота, ароматизатор, краситель'
    };
});
