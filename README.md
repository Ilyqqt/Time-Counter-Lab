# Трекер времени для файлов #
Плагин отслеживает время, проведённое в открытом файле и отображает его в строке состояния.
## Возможности ##
* Отображение времени, проведённого с открытым файлом
* Отображение времени в строке состояния при вызове команды
* Вывод сообщения если файл не открыт

## Использование ##

* ### Работа плагина ###
1. При открытии `Visual Studio Code` расширение автоматически начнет отслеживать время
2. Используйте команду, чтобы показать время проведённое в файле
* ### Команды ### 
1. `Show time spent on current file` Отображает время в строке состояния. Команду можно вызвать двумя способами
* С помощью командной палеты введя в неё команду
* С помощью пользовательского сочетания клавиш 

## Сообщения в строке состояния ##
* **Когда файл открыт:** в строке состояния будет показано время которое был открыт файл в формате `ЧЧ:ММ:СС`
* **Когда файл не открыт:** в строке сосояния будет показано сообщение о том, что файл не открыт

## Запуск плагина (в тестовом режиме) ##
Открыть в `Visual Studio Code` проект `Time-Counter-Lab` и запустить плагин клавишей `F5`. Откроется окно в котором пользователь может тестировать плагин

### Автор: Зайцев Илья Михайлович М3119 ###