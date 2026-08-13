# nextjs-without-i18n-routing

Next.js App Router 的多語系 startkit，語系由 **cookie** 決定，網址不帶 `[locale]` 區段。

適合以下情境：

1. 語系來自使用者設定（例如登入後的偏好），而不是網址
2. 應用程式只支援單一語言，但仍想保留翻譯的結構
3. 不想讓同一個頁面出現 `/en/about`、`/de/about` 這種重複網址

## 技術棧

| 分類 | 使用 |
| --- | --- |
| 框架 | Next.js 16.3（App Router + Turbopack） |
| UI | React 19.2 |
| 多語系 | next-intl 4.13 |
| 樣式 | Tailwind CSS 4（CSS-first）+ shadcn/ui |
| 表單 | react-hook-form + zod 4 |
| 資料存取 | TanStack Query 5 |
| 狀態管理 | zustand / @legendapp/state / nuqs（見下方說明） |
| 測試 | Playwright |
| 型別 | TypeScript 6，型別檢查另外用 TypeScript 7 原生編譯器 |

## 快速開始

```bash
yarn install
yarn dev
```

開啟 http://localhost:3000。

### 指令

| 指令 | 說明 |
| --- | --- |
| `yarn dev` | 開發模式（Turbopack） |
| `yarn build` | 正式建置 |
| `yarn start` | 啟動正式版 |
| `yarn lint` | ESLint + TypeScript 型別檢查 |
| `yarn test` | Playwright 端對端測試 |
| `yarn release` | standard-version 產生版號與 CHANGELOG |
| `yarn env-dev` / `env-local` / `env-prod` | 指定 `.env` 檔啟動開發模式 |

## 專案結構

```
src/
├─ actions/        Server Actions（locale 切換、登入）
├─ app/            App Router 頁面
│  ├─ error.tsx        錯誤邊界
│  ├─ global-error.tsx root layout 出錯時的邊界
│  ├─ loading.tsx      載入狀態
│  └─ not-found.tsx    404
├─ components/     共用元件（ui/ 為 shadcn 元件）
├─ constants/      cookie 名稱、路由、受保護路徑
├─ i18n/           request.ts（載入語系檔）、routing.ts（語系白名單）
├─ lib/            工具函式
├─ middlewares/    proxy 用的 middleware 鏈
├─ schemas/        zod schema 與驗證邏輯
├─ store/          zustand store
├─ styles/         globals.css（Tailwind theme 定義在這裡）
├─ types/          型別擴充（next-intl 的翻譯 key 型別）
└─ proxy.ts        Next 16 的 middleware 進入點（舊名 middleware.ts）
```

## 多語系怎麼運作

1. 使用者按下語系按鈕 → 呼叫 Server Action [`setLocale`](src/actions/locale.ts) 寫入 `x-locale` cookie
2. [`src/i18n/request.ts`](src/i18n/request.ts) 讀取 cookie，**先用白名單驗證**，非法值回退到 `en`
3. 對應的 `messages/{locale}.json` 被載入

用 Server Action 而不是在瀏覽器寫 cookie，是為了讓「寫入 cookie」和「重新渲染」發生在同一個 request 往返裡，不會有競態。

### 新增語系

1. 建立 `messages/{locale}.json`
2. 把語系代碼加進 [`src/i18n/routing.ts`](src/i18n/routing.ts) 的 `LOCALES`

### 翻譯 key 有型別檢查

[`src/types/next-intl.d.ts`](src/types/next-intl.d.ts) 透過 next-intl 的 `AppConfig` 宣告了訊息型別，所以：

- `t('...')` 有自動完成
- 打錯 key 會在 `yarn lint` 直接失敗
- 其他語系檔缺少 key 也會被型別檢查抓到

## 路由保護

[`src/middlewares/withAuth.ts`](src/middlewares/withAuth.ts) 會檢查 `tokenJWT` cookie。凡是符合 [`PROTECTED_URL`](src/constants/index.ts) 的路徑，沒有 token 就導向 `/login`。`/dashboard` 是現成的示範。

middleware 以鏈狀組合（[`chain.ts`](src/middlewares/chain.ts)），response 物件由鏈的進入點建立一次後往下傳遞，所以每一層對 response 做的修改都會保留。

## 樣式

Tailwind 4 採 CSS-first 設定，**沒有 `tailwind.config.ts`**。主題（色票、圓角、字體、動畫）全部定義在 [`src/styles/globals.css`](src/styles/globals.css) 的 `@theme inline` 區塊，色值本身則是 `:root` 和 `.dark` 裡的 CSS 變數。

要改主題色，改 `:root` / `.dark` 的變數即可，不需要碰 `@theme`。

## 關於三套狀態管理

`zustand`、`@legendapp/state`、`nuqs` 同時存在是**刻意的方案展示**，不是建議的組合：

- `zustand` — 一般的 client 全域狀態（[`src/store/`](src/store/)）
- `@legendapp/state` — 細粒度響應式，範例在 [`/about`](src/app/about/page.tsx)
- `nuqs` — 把狀態存在 URL query string

實際專案請挑一套。

## 已知取捨

**所有頁面都是動態渲染。** 因為語系來自 cookie，每個 request 都要讀 cookie 才能決定要渲染什麼，`next build` 的輸出會全部標記為 `ƒ (Dynamic)`。這是「語系不放在網址」這個設計的必然代價 —— 如果你需要靜態產生，就得改用 `[locale]` 路由。

**`.env` 檔目前在版控中。** 裡面只有 placeholder 值，但正式專案請把 `.env*` 加進 `.gitignore`，只保留一份 `.env.example`。另外注意 `NEXT_PUBLIC_` 前綴的變數會被編進 client bundle，任何人都看得到，不要放機密。

## TypeScript 版本說明

`package.json` 裡有兩份 TypeScript：

```json
"typescript": "^6.0.3",
"@typescript/native": "npm:typescript@^7.0.2"
```

`typescript` 必須留在 6.x —— typescript-eslint 目前不支援 TS 7，載入時會直接 throw；而如果把 `typescript` 別名指向其他套件名，`next build` 會判定 TypeScript 沒安裝並自動重新安裝，把設定蓋掉。

`yarn lint` 的型別檢查則走 TS 7 原生編譯器（快很多），所以 script 是 `node node_modules/@typescript/native/bin/tsc`。
