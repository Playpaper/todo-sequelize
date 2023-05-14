# todo-sequelize (S3)

## Features - 產品功能
提供您紀錄日常待辦事項，將未完成及已完成的事項排序，使用者可以透過註冊新帳號登入，登入後的會員可享有以下服務 :

:one: 使用者可以瀏覽所有的支出。

:two: 使用者可以瀏覽未完成及已完成的待辦事項。

:three: 使用者可以新增一筆未完成的待辦事項。

:four: 使用者可以修改待辦事項的資訊。

:five: 使用者可以刪除待辦事項。

## Installing - 專案安裝流程
:one: 開啟終端機, 複製此專案至本機電腦:
```
git clone https://github.com/Playpaper/todo-sequelize.git
```
:two: 進入存放此專案的資料夾
```
cd todo-sequelize
```
:three: 安裝所需套件
```
npm i [套件名稱]
```
> :heavy_check_mark: Check package.json for dependencies

:four: MySQL 建立專案DB
```
drop database if exists todo_sequelize;
create database todo_sequelize;
use todo_sequelize;
```

:five: Express 資料庫設定
```
npx sequelize init
```

:six: 產生資料表
```
npx sequelize db:migrate
```
> :heavy_check_mark: 會產生相關的檔案或資料夾，調整相關設定
> 
:seven: 設定種子資料
```
npx sequelize seed:generate --name default-data
npx sequelize db:seed:all
```
:eight: 啟動伺服器
```
npm run dev
```
:nine: 當終端機出現以下字樣時，表示伺服器已啟動
```
The express server is listening on http://localhost:3000
```
