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
exports.schedule = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prefix = "schedule";
const usage = `@${process.env.BOT_NAME} schedule hh:mm yyyy/mm/dd(option)`;
const description = "土曜日起点の翌週（日付が入力された場合はその日付を含む週）の日程調整メッセージを出力します";
const errorMessage = `以下の形式で入力してください\n\`${usage}\``;
exports.schedule = {
    prefix,
    usage,
    description,
    execute: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = message.channel;
        const contents = message.content.split(/\s+/);
        if (contents.length !== 3 && contents.length !== 4) {
            yield channel.send(errorMessage);
            return;
        }
        let date = new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000);
        if (contents[2].match(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/) === null) {
            yield channel.send(errorMessage);
            return;
        }
        if (contents.length === 4) {
            date = new Date(contents[3]);
            if (isNaN(date.getDate())) {
                yield channel.send(errorMessage);
                return;
            }
        }
        const daysString = getDaysStringOfWeek(date);
        for (const dayString of daysString) {
            const sendMessage = yield channel.send(`${dayString} ${contents[2]}～`);
            yield sendMessage.react("⭕");
            yield sendMessage.react("🔺");
            yield sendMessage.react("❌");
        }
        yield channel.send("@everyone 上記の日程調整に回答お願いします🙇");
    }),
};
function getDaysStringOfWeek(date) {
    const dayOfWeek = date.getDay();
    const diff = dayOfWeek === 6 ? 0 : dayOfWeek + 1;
    const temp = new Date(date);
    temp.setDate(date.getDate() - diff);
    const daysString = [];
    for (let n = 0; n < 7; n++) {
        daysString.push(dateToStringFormat(temp));
        temp.setDate(temp.getDate() + 1);
    }
    return daysString;
}
function dateToStringFormat(date) {
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    return `${month}月${day}日（${weekday}）`;
}
