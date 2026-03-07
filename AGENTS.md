# AGENTS.md

## Project Context

- Project type: Node.js + TypeScript MCP server for GeoGebra.
- Runtime role: this repo is an MCP tool server (not a chat UI).
- Main flow: client LLM -> MCP JSON-RPC -> tool registry -> GeoGebra execution -> structured response/export.

## Code Map

- Entry: `src/index.ts`, CLI: `src/cli.ts`
- MCP server: `src/server.ts`
- Tool registration: `src/tools/index.ts`
- Core GeoGebra tools: `src/tools/geogebra-tools.ts`
- Educational templates: `src/tools/educational-templates.ts`
- Performance tools: `src/tools/performance-tools.ts`
- GeoGebra engine wrapper: `src/utils/geogebra-instance.ts`
- Validation and errors: `src/utils/validation.ts`, `src/utils/errors.ts`
- Tests: `tests/unit`, `tests/e2e`, `tests/performance`

## Development Rules

- Treat `src/` as source of truth. `dist/` is build output.
- Keep MCP stdout clean: do not print non-JSON content in request/response flow.
- Keep tool schemas explicit (`type` for properties) to stay Gemini-compatible.
- Preserve backward compatibility for existing tool names and response shapes unless explicitly requested.
- For file outputs, keep workspace path validation (no path traversal).

## Tool Implementation Checklist

When adding/updating a tool:

1. Define clear `inputSchema` in `ToolDefinition`.
2. Validate inputs with `src/utils/validation.ts` (or add focused validators).
3. Use consistent success/error payload format (`content` + `isError` when needed).
4. Handle GeoGebra failures with actionable error text.
5. Add/adjust tests in `tests/unit` and integration/e2e tests when behavior changes.

## Local Commands

- Install: `npm install`
- Build: `npm run build`
- Dev run: `npm run dev`
- CLI run: `node dist/cli.js`
- Test: `npm test`
- Coverage: `npm run test:coverage`
