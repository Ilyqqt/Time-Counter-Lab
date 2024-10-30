"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
let openTime = null; // Время открытия файла
let activeFile = null; // Активный файл
let statusBarItem;
// Активация расширения
function activate(context) {
    // Создаем элемент статусной строки
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    context.subscriptions.push(statusBarItem);
    // Слушатель на изменение активного редактора
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor && editor.document) {
            if (openTime !== null && activeFile) {
                logTimeSpent(path.basename(activeFile), Date.now() - openTime);
            }
            // Установка времени открытия нового файла
            openTime = Date.now();
            activeFile = editor.document.fileName;
        }
        else {
            // Если редактор был закрыт
            openTime = null;
            activeFile = null;
        }
    });
    // Команда для отображения времени, проведенного с файлом
    let showTimeCommand = vscode.commands.registerCommand('fileTimeTracker.showTime', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor && openTime !== null && activeFile) {
            let timeSpent = Date.now() - openTime;
            showStatusMessage(`Время проведённое в ${path.basename(activeFile)}: ${formatTime(timeSpent)}`, 5000); // Сообщение на 5 секунд
        }
        else {
            showNoFileMessage(); // Показываем сообщение, если файл не открыт
        }
    });
    // Добавление команды в контекст
    context.subscriptions.push(showTimeCommand);
}
// Функция для отображения сообщения в статусной строке на определенное время
function showStatusMessage(message, duration) {
    statusBarItem.text = message;
    statusBarItem.show();
    // Убираем сообщение через заданное время
    setTimeout(() => {
        statusBarItem.hide();
    }, duration);
}
// Функция для показа сообщения, если нет активного файла
function showNoFileMessage() {
    showStatusMessage("Файл не был открыт", 5000); // Сообщение на 5 секунд
}
// Форматирование времени в HH:MM:SS
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
// Логирование времени, проведенного с файлом
function logTimeSpent(fileName, timeSpent) {
    console.log(`Время проведённое в ${fileName}: ${formatTime(timeSpent)}`);
}
// Деактивация расширения
function deactivate() {
    if (openTime !== null && activeFile) {
        let timeSpent = Date.now() - openTime;
        logTimeSpent(path.basename(activeFile), timeSpent);
    }
}
//# sourceMappingURL=extension.js.map