# openHEMA

Отрытое приложение для HEMA(и для лююых других) турниров. Прямо сейчас приложение может: показывать актуальное состояние турнирной сетки для групп и плейофф; показывать табло, которое синхранизирует количество набранных очков с сервером; создавать сетку в ручном режиме. Для работы приложения необходимо создать приложение в google.firebase, после чего его можно запускать как в местной сетке с помощью команды npm start, так и выбрасывать на сервер после npm run build. 

В файле Tournament.json лежит тестовый файл, с тестовым турниром, который нужно базово заливать на firebase.

# TODO list

Будущие фичи которые пока что предстоит реализовать:

1) Полная инкапсюляция компонентов. 
2) Статистика для каждого бойца.
3) Автоматический выход в плейофф лучших бойцов групп.
4) Автоматический проход в следующий раунд плеофф, по окончанию боя
5) Возможность автоматического раскидывания участников по группам как по рейтингу внутри турнира(нужно для швейцарской сиситемы), так и псевдослучайно, что бы минимизировать встречи одноклубников. 
6) Статистика для турнира
7) Возможность делать швейцарскую систему для отдельных номинаций. 
8) Возможность называть турнир как угодно изнутри приложения, а так же возможность смены картинки и иконки