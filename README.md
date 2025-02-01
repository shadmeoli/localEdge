# LocalEdge

A custom local-first data service built with **JavaScript**, utilizing **Zustand** for state management and **SQL.js** for complex data storage. This project ensures offline-first capabilities with seamless data persistence in the browser.

## 🚀 Features

- **Local-First Architecture:** Operates entirely in the browser with offline support.
- **State Management:** Powered by Zustand for efficient store management.
- **SQL-Based Storage:** Uses SQL.js for managing complex relational data.
- **Lightweight & Fast:** Optimized for performance with WebAssembly.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/localedge.git
cd localedge

# Install dependencies
npm install
```

## ⚡ Getting Started

```javascript
import initSqlJs from "sql.js";
import create from "zustand";

// Initialize Zustand store
const useStore = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
}));

// Initialize SQL.js
document.addEventListener("DOMContentLoaded", async () => {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Create a table
  db.run(
    "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT, done BOOLEAN)"
  );

  // Insert a task
  db.run("INSERT INTO tasks (title, done) VALUES ('Learn Zustand', 0)");

  // Fetch tasks
  const result = db.exec("SELECT * FROM tasks");
  useStore.getState().addTask(result[0].values);

  console.log(useStore.getState().tasks);
});
```

## 📊 Project Structure

```
localedge/
├── src/
│   ├── index.js        # Main entry point
│   ├── store.js        # Zustand store setup
│   └── db.js           # SQL.js database logic
├── public/             # Static assets
├── package.json        # Project metadata
└── README.md           # Project documentation
```

## 🔧 Available Scripts

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## 🗂️ Data Persistence

To export and save the database:

```javascript
const data = db.export();
const blob = new Blob([data], { type: "application/octet-stream" });
const a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "local.db";
a.click();
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request


## Issues and bug fixes

### 🐛 Reporting Issues
1. Check existing issues to avoid duplicates
2. Use the issue template when creating a new issue
3. Include the following information:
   - Clear description of the issue
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details (browser, OS, versions)
   - Screenshots or code snippets (if applicable)

### 🔧 Submitting Bug Fixes
1. Issues should be properly labeled with `bug` tag
2. Branch naming convention: 
   - Format: `fix/brand-name/issue-description`
   - Example: `fix/localedge/database-sync-error`
3. Commit message format:
   - Start with `fix:` followed by the issue description
   - Example: `fix: resolve database synchronization error (#123)`
4. Pull Request requirements:
   - Reference the issue number in PR description
   - Include before/after test results
   - Update documentation if necessary
   - Add tests for the bug fix when applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
