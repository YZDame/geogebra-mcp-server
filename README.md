# GeoGebra MCP Tool

A Model Context Protocol (MCP) server that enables AI models to interact with GeoGebra's mathematical software suite for creating interactive mathematical visualizations and dynamic constructions.

## 🎯 Overview

The GeoGebra MCP Tool bridges the gap between AI reasoning capabilities and mathematical visualization, allowing AI assistants to:

- Create geometric constructions (points, lines, circles, polygons)
- Plot mathematical functions and graphs
- Perform algebraic computations with visual representation
- Generate interactive mathematical demonstrations
- Export visualizations in various formats

## 🚀 Quick Start Examples

1. **NPX (Recommended)**:
```bash
# Start the server
npx @gebrai/gebrai

# Or with custom log level
npx @gebrai/gebrai --log-level debug
```

2. **Connect to Claude Desktop** - Add to your Claude configuration:
```json
{
  "mcpServers": {
    "geogebra": {
      "command": "npx",
      "args": ["@gebrai/gebrai"]
    }
  }
}
```

3. **Start Creating** - Ask Claude to create mathematical visualizations!

**Need help?** Check our [Getting Started Guide](docs/guides/getting-started.md) for detailed instructions.

## ⚡ Fast `.ggb` Workflow

For production-oriented usage (natural language -> MCP -> `.ggb`), see:

- [Production Workflow](docs/guides/production-workflow.md)

This includes:
- minimal required files vs optional files
- local fork vs npm version behavior
- the fastest 3-step tool path using `geogebra_eval_commands` + `geogebra_export_ggb`

## 📦 Installation Options

### NPX (No Installation)
```bash
npx @gebrai/gebrai
```
✅ No installation required  
✅ Always uses latest version  
✅ Perfect for testing  

### Global Installation
```bash
npm install -g @gebrai/gebrai
```
✅ Faster startup after installation  
✅ Works offline  
✅ Consistent version  

### Local Development
```bash
git clone <repository-url>
cd gebrai && npm install
```
✅ Full source code access  
✅ Customization possible  
✅ Development workflow  

## 🛠️ CLI Usage

The GeoGebra MCP Tool provides a command-line interface with the following options:

```bash
Usage:
  npx @gebrai/gebrai [options]
  gebrai [options]              # if installed globally
  geogebra-mcp [options]        # alternative command

Options:
  -h, --help        Show help message
  -v, --version     Show version information
  --log-level LEVEL Set log level (error, warn, info, debug) [default: info]
  --port PORT       Set server port [default: stdin/stdout for MCP]

Examples:
  npx @gebrai/gebrai                    # Start MCP server
  npx @gebrai/gebrai --log-level debug  # Start with debug logging
  npx @gebrai/gebrai --help             # Show help
```

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gebrai
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

### Development Mode

For development with hot reload:

```bash
npm run dev
```

## 🛠️ Development

### Project Structure

```
gebrai/
├── src/
│   ├── index.ts          # Main entry point
│   ├── server.ts         # MCP server implementation
│   ├── types/
│   │   └── mcp.ts        # MCP protocol types
│   ├── tools/
│   │   └── index.ts      # Tool registry and example tools
│   └── utils/
│       ├── logger.ts     # Logging utility
│       └── errors.ts     # Error handling
├── tests/
│   ├── setup.ts          # Test configuration
│   └── server.test.ts    # Server tests
├── package.json
├── tsconfig.json
└── README.md
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript project
- `npm start` - Start the production server
- `npm test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically

### Testing

The project includes a comprehensive test suite using Jest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📚 Documentation

For comprehensive documentation, visit our [**complete documentation**](docs/README.md) which includes:

### 📖 Core Documentation
- **[API Reference](docs/api/README.md)** - Complete tool documentation with examples
- **[Getting Started Guide](docs/guides/getting-started.md)** - Step-by-step setup and first usage
- **[Integration Guide](docs/guides/integration-guide.md)** - Platform integration instructions
- **[Troubleshooting](docs/support/troubleshooting.md)** - Common issues and solutions
- **[FAQ](docs/support/faq.md)** - Frequently asked questions

### 🔧 Tool Categories
- **[Basic Tools](docs/api/basic-tools.md)** - Core MCP functionality (ping, echo, server_info)
- **[GeoGebra Tools](docs/api/geogebra-tools.md)** - 25+ mathematical construction tools
- **[Educational Tools](docs/api/educational-tools.md)** - Pre-built educational templates
- **[Performance Tools](docs/api/performance-tools.md)** - Monitoring and optimization

### 🎓 Educational Resources
- **[Use Cases](docs/educational/use-cases.md)** - Real-world educational scenarios
- **[Teacher Guide](docs/educational/teacher-guide.md)** - Pedagogical guidance
- **[Classroom Examples](docs/educational/classroom-examples.md)** - Ready-to-use lessons

### 📝 Tutorials & Examples
- **[Basic Usage](docs/tutorials/basic-usage.md)** - Your first mathematical constructions
- **[Mathematical Constructions](docs/tutorials/mathematical-constructions.md)** - Geometry and algebra
- **[Function Plotting](docs/tutorials/function-plotting.md)** - Creating mathematical functions
- **[Code Examples](docs/examples/)** - Working examples by complexity

## 📊 Tool Overview

The GeoGebra MCP Tool provides **40+ tools** across four categories:

| Category | Tools | Description | Performance |
|----------|-------|-------------|-------------|
| **Basic** | 3 tools | Core MCP functionality | < 100ms |
| **GeoGebra** | 25+ tools | Mathematical constructions | < 2000ms |
| **Educational** | 10+ tools | Classroom activities | < 2000ms |
| **Performance** | 5 tools | Monitoring & optimization | < 500ms |

### Example Tools
- **Mathematical**: `geogebra_create_point`, `geogebra_plot_function`, `geogebra_export_png`
- **Educational**: `geogebra_list_educational_templates`, `geogebra_create_lesson_plan`  
- **Performance**: `performance_get_stats`, `performance_warm_up_pool`

## 🔧 Configuration

### Environment Variables

- `PORT` - Server port (default: 3000)
- `LOG_LEVEL` - Logging level: error, warn, info, debug (default: info)
- `NODE_ENV` - Environment: development, production, test

### Example `.env` file

```env
PORT=3000
LOG_LEVEL=info
NODE_ENV=development
```

## 🏗️ Architecture

### Core Components

1. **MCP Server** (`src/server.ts`)
   - Handles JSON-RPC 2.0 protocol
   - Routes requests to appropriate handlers
   - Manages server lifecycle

2. **Tool Registry** (`src/tools/index.ts`)
   - Manages available tools
   - Handles tool execution
   - Provides tool discovery

3. **Error Handling** (`src/utils/errors.ts`)
   - Standardized error responses
   - JSON-RPC error codes
   - Comprehensive error logging

4. **Logging** (`src/utils/logger.ts`)
   - Structured logging with Winston
   - Configurable log levels
   - Development and production modes

### Design Principles

- **Type Safety**: Full TypeScript implementation with strict mode
- **Error Handling**: Comprehensive error handling and validation
- **Modularity**: Clean separation of concerns
- **Testability**: Extensive test coverage
- **Extensibility**: Easy to add new tools and features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-tool`
3. Make your changes and add tests
4. Ensure all tests pass: `npm test`
5. Commit your changes: `git commit -m 'Add new tool'`
6. Push to the branch: `git push origin feature/new-tool`
7. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Add tests for new functionality
- Update documentation as needed
- Use conventional commit messages
- Ensure code passes linting

## 🔗 Related Projects

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [GeoGebra](https://www.geogebra.org/)
- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)

## 📞 Support

For questions, issues, or contributions, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue if needed
3. Join our community discussions

---
