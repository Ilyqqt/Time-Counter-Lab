import * as vscode from 'vscode';
import * as path from 'path';

let openTime: number | null = null;  // Время открытия
let activeFile: string | null = null; // Имя файла
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

    // статусная строка
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    context.subscriptions.push(statusBarItem);

    // смотрю активный редактор
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor && editor.document) {
            if (openTime !== null && activeFile) {
                logTimeSpent(path.basename(activeFile), Date.now() - openTime);
            }

            // время открытия
            openTime = Date.now();
            activeFile = editor.document.fileName;
        } else {
            // если не открыт файл
            openTime = null;
            activeFile = null;
        }
    });

    // отображение времени
    let showTimeCommand = vscode.commands.registerCommand('fileTimeTracker.showTime', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor && openTime !== null && activeFile) {
            let timeSpent = Date.now() - openTime;
            showStatusMessage(`Время проведённое в ${path.basename(activeFile)}: ${formatTime(timeSpent)}`, 5000); // Сообщение на 5 секунд
        } else {
            showNoFileMessage(); // сообщение если файл не открыт
        }
    });

    context.subscriptions.push(showTimeCommand);
}

// Функция для отображения сообщения в статусной строке на определенное время
function showStatusMessage(message: string, duration: number) {
    statusBarItem.text = message;
    statusBarItem.show();

    // Убираю сообщение через заданное время
    setTimeout(() => {
        statusBarItem.hide();
    }, duration);
}

// Функция для показа сообщения если файл не открыт
function showNoFileMessage() {
    showStatusMessage("Файл не был открыт", 5000); // Сообщение на 5 секунд
}

// Форматирование времени в HH:MM:SS
function formatTime(ms: number): string {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function logTimeSpent(fileName: string, timeSpent: number) {
    console.log(`Время проведённое в ${fileName}: ${formatTime(timeSpent)}`);
}

export function deactivate() {
    if (openTime !== null && activeFile) {
        let timeSpent = Date.now() - openTime;
        logTimeSpent(path.basename(activeFile), timeSpent);
    }
}
