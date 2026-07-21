# 安裝 pnpm

```bash
Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
```

# 安裝 Node.js 22

```bash
pnpm env use --global 22
```

# 確認版本

```bash
node -v
pnpm -v
```

# 建立 Astro 專案

```bash
pnpm create astro@latest <資料夾名稱>
```

# 安裝依賴

```bash
pnpm install
```

# 啟動專案

```bash
pnpm dev
```
