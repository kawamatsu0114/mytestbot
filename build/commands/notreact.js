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
exports.unreact = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prefix = "notreact";
const usage = `@${process.env.BOT_NAME} notreact`;
const description = "返信したメッセージに反応がないメンバーに通知を行います";
const errorMessage = `以下の形式で入力してください\n\`${usage}\``;
exports.unreact = {
    prefix,
    usage,
    description,
    execute: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = message.channel;
        if (message.content.split(/\s+/).length !== 2) {
            yield channel.send(errorMessage);
            return;
        }
    }),
};
