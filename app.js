const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({
    origin: 'https://orlov-dmitri.github.io/new-cost/',
}));

app.use("/api", require("./routes/cost"));


const { prisma } = require("./prisma/prisma-client");

const initializeWallet = async () => {
    try {
        // Проверяем, существует ли кошелек
        const existingWallet = await prisma.wallet.findUnique({
            where: { id: 1 }
        });

        // Если кошелек не существует, создаем его
        if (!existingWallet) {
            await prisma.wallet.create({
                data: {
                    travel: {
                        create: { money: 0 },
                    },
                    eat: {
                        create: { money: 0 },
                    },
                    cash: {
                        create: { money: 0 },
                    },
                    bank: {
                        create: { money: 0 },
                    }
                }
            });
            console.log("Кошелек создан");
        } else {
            console.log("Кошелек уже существует");
        }
    } catch (error) {
        console.error("Ошибка при инициализации кошелька:", error.message);
    }
};

// Вызов функции при старте сервера
initializeWallet().catch(error => console.error(error));

module.exports = app;
