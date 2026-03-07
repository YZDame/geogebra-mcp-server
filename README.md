# GeoGebra MCP Tool

GeoGebra 的 MCP Server，实现几何构造、函数绘图和文件导出（含 `.ggb`）。

## What This Project Is

- 这是一个 **MCP Server**，不是聊天应用。
- 自然语言理解由 Claude/Codex 等客户端完成。
- 本项目负责执行 GeoGebra 工具调用并导出文件。

## Quick Start

### 1. Install and Build

```bash
npm install
npm run build
```

### 2. Run Server

```bash
node dist/cli.js
```

或：

```bash
npx @gebrai/gebrai
# 或全局安装后
gebrai
```

### 3. Connect as MCP

以 Claude Desktop 为例：

```json
{
  "mcpServers": {
    "geogebra": {
      "command": "node",
      "args": ["/absolute/path/to/gebrai/dist/cli.js"]
    }
  }
}
```

## Typical Flow (Natural Language -> .ggb)

1. 在 Claude/Codex 中输入自然语言几何题目。
2. 客户端调用 MCP 工具构造图形。
3. 调用 `geogebra_export_ggb` 导出到 `output/*.ggb`。

推荐高效链路：
- `geogebra_clear_construction`
- `geogebra_eval_commands`
- `geogebra_export_ggb`

## CLI Options

```bash
node dist/cli.js --help
node dist/cli.js --version
node dist/cli.js --log-level debug
```

## Project Structure

```text
src/          # 核心实现
tests/        # 测试
package.json  # 依赖与脚本
tsconfig.json # TS 配置
jest.config.js
```

## Notes

- 项目可以直接导出 `.ggb`。
- 若你修改了源码，需重新执行 `npm run build` 后客户端才会使用新逻辑。
