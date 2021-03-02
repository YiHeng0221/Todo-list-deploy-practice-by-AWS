# AWS EC2 部署練習

以 TodoList 為例。

使用語言前端以 JavaScript (使用 jQuery 函式庫)、後端以PHP 為主。

[網址](http://3.137.202.180/deploy-test/todolist/todo.html?id=1)

![image](https://github.com/YiHeng0221/deploy-test/blob/main/todolist.gif)

## Todo List 功能

1. 可於上方輸入欄中輸入待辦事項。
2. 新增待辦事項後可於該欄位左側勾選以註記完成。
3. 可點擊該欄位右側的 X 符號已刪除該待辦事項。
4. 點擊上方 All、Undone、Done 鍵可篩選待辦事項，顯示全部或是未完成、已完成之待辦事項。
5. 點擊下方左側 Clear the list which is done 可清除所有已完成之待辦事項。
6. 點擊下方中間 Save Todo 鍵可以儲存 Todo，下次於 url 處輸入參數，為該 Todo 之 id，即可開啟該 Todo List，並跳至 id+1 的空 Todo List。
7. 於 url 處輸入該 Todo 之 id 之後，可以點擊下方右側 Update Todo 來對該 Todolist 進行更新。

## 部署過程
詳見 [hackmd 筆記](https://hackmd.io/UzphGsZdTfSCTTR9mIIa6g)。
