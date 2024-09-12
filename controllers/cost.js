const { prisma } = require("../prisma/prisma-client");
const cron = require("node-cron");

/**
 * @route GET api/wallet/
 * @desc Получение данных кошелька (включая Проезд, Еду, Личные деньги и Копилку)
 * @access Public
 */
const getWallet = async (req, res) => {
    try {
        const wallet = await prisma.wallet.findUnique({
            where: { id: 1 }, // Предполагается, что кошелек уже существует с ID 1
            include: {
                travel: true,
                eat: true,
                cash: true,
                bank: true,
            },
        });

        if (!wallet) {
            return res.status(404).json({ message: "Кошелек не найден" });
        }

        res.status(200).json(wallet);
    } catch (error) {
        res.status(400).json({ message: "Не удалось получить кошелек: " + error.message });
    }
};

/**
 * @route POST api/add
 * @desc Добавление денег в одну из категорий (Проезд, Еда, Личные, Копилка)
 * @access Public
 */
const addMoneyToCategory = async (req, res) => {
    const { category, amount } = req.body; // category: "travel" | "eat" | "cash" | "bank", amount: сумма для пополнения

    try {
        let updatedCategory;

        switch (category) {
            case "travel":
                updatedCategory = await prisma.travel.upsert({
                    where: { walletId: 1 },
                    update: { money: { increment: amount } },
                    create: { walletId: 1, money: amount },
                });
                break;
            case "eat":
                updatedCategory = await prisma.eat.upsert({
                    where: { walletId: 1 },
                    update: { money: { increment: amount } },
                    create: { walletId: 1, money: amount },
                });
                break;
            case "cash":
                updatedCategory = await prisma.cash.upsert({
                    where: { walletId: 1 },
                    update: { money: { increment: amount } },
                    create: { walletId: 1, money: amount },
                });
                break;
            case "bank":
                updatedCategory = await prisma.bank.upsert({
                    where: { walletId: 1 },
                    update: { money: { increment: amount } },
                    create: { walletId: 1, money: amount },
                });
                break;
            default:
                return res.status(400).json({ message: "Неверная категория" });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: "Не удалось пополнить категорию: " + error.message });
    }
};


/**
 * @route POST api/remove
 * @desc Добавление денег в одну из категорий (Проезд, Еда, Личные, Копилка)
 * @access Public
 */
const removeMoneyToCategory = async (req, res) => {
    const { category, amount } = req.body; // category: "travel" | "eat" | "cash" | "bank", amount: сумма для пополнения

    try {
        let updatedCategory;

        switch (category) {
            case "travel":
                updatedCategory = await prisma.travel.upsert({
                    where: { walletId: 1 },
                    update: { money: { decrement: amount } },
                    create: { walletId: 1, money: amount },
                });
                break;
            case "eat":
                updatedCategory = await prisma.eat.upsert({
                    where: { walletId: 1 },
                    update: { money: { decrement: amount } },
                    create: { walletId: 1, money: amount },
                });
                break;
            case "cash":
                updatedCategory = await prisma.cash.upsert({
                    where: { walletId: 1 },
                    update: { money: { decrement: amount } },
                    create: { walletId: 1, money: amount },
                });
                break;
            case "bank":
                updatedCategory = await prisma.bank.upsert({
                    where: { walletId: 1 },
                    update: { money: { decrement: amount } },
                    create: { walletId: 1, money: amount },
                });
                break;
            default:
                return res.status(400).json({ message: "Неверная категория" });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: "Не удалось уменьшить категорию: " + error.message });
    }
};

cron.schedule("0 0 * * *", async () => {
    console.log("Запуск задачи по уменьшению балансов категорий в 00:00");

    const decrementAmounts = {
        travel: 160, // Сумма, которая будет вычитаться из категории "Проезд"
        cash: 800,   // Сумма, которая будет вычитаться из категории "Личные"
    };

    try {
        // Проверка и вычитание для "Проезда"
        const travel = await prisma.travel.findUnique({ where: { walletId: 1 } });
        if (travel && travel.money >= decrementAmounts.travel) {
            await prisma.travel.update({
                where: { walletId: 1 },
                data: { money: { decrement: decrementAmounts.travel } },
            });
            console.log("Сумма 160 успешно вычтена из категории 'Проезд'");
        } else {
            console.log("Недостаточно средств в категории 'Проезд' для вычитания");
        }

        // Проверка и вычитание для "Личных"
        const cash = await prisma.cash.findUnique({ where: { walletId: 1 } });
        if (cash && cash.money >= decrementAmounts.cash) {
            await prisma.cash.update({
                where: { walletId: 1 },
                data: { money: { decrement: decrementAmounts.cash } },
            });
            console.log("Сумма 800 успешно вычтена из категории 'Личные'");
        } else {
            console.log("Недостаточно средств в категории 'Личные' для вычитания");
        }

    } catch (error) {
        console.error("Ошибка при вычитании денег из категорий: ", error.message);
    }
});
module.exports = {
    getWallet,
    addMoneyToCategory,
    removeMoneyToCategory
};
