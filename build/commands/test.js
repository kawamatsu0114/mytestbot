"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prefix = "test";
const usage = `@${process.env.BOT_NAME} test`;
const description = "プロセスが単一で起動されるように修正します（render用のコマンド）。必ずスレッド外でコマンドを実行すること。スレッド内で実行するとbotが停止します。";
exports.test = {
    prefix,
    usage,
    description,
    execute: (message) => __awaiter(void 0, void 0, void 0, function* () {
        let testThread;
        message
            .startThread({ name: "test", autoArchiveDuration: 60 })
            .then((thread) => {
            testThread = thread;
            return thread.send("test");
        })
            .then(() => testThread.setArchived())
            .catch(() => process.exit(0));
    }),
};
