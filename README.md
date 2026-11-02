# BCT CRM

AI-native CRM prototype for BCT. All companies, people and numbers are fictional, and nothing is connected to a real system.

## Web prototype

[`bct-crm-ui/`](bct-crm-ui/) is a clickable prototype. It opens without a server or an internet connection: open `bct-crm-ui/index.html` in Chrome or Edge.

- **Home:** today's tasks, suggested questions and pinned Q4 numbers, with AI chat as the main entry.
- **Workspace:** Pipeline, Accounts and Reports. Charts and labels have tooltips with exact values and definitions.
- **Ask about this page:** starts a new chat with the page as context, and can apply the result back to the page.

The signed-in demo user is Gaurav Shrotriya (Sales · ACAP).

## Design system

[`bct-crm-ui/docs/design-system.html`](bct-crm-ui/docs/design-system.html) covers colours, type, components, tooltips, motion and writing rules. Its samples are live components.

## Connector

[`bct-crm-mcp/docs/chat-cards-proposals.html`](bct-crm-mcp/docs/chat-cards-proposals.html) shows how the connector's replies look in Claude, question by question. The **Download connector** button at the top gets [`bct-crm-demo.mcpb`](bct-crm-mcp/dist/bct-crm-demo.mcpb). To install it, open Claude Desktop, go to Settings › Extensions and drag the file in.

This page loads its cards from separate files, so it needs a server or a hosted copy. To open it without one, use `chat-cards-proposals-standalone.html` in the same folder; that copy has no download button.

## Run locally

From the repository root:

```bash
python3 -m http.server 5394
```

Then open:

- http://localhost:5394/bct-crm-ui/
- http://localhost:5394/bct-crm-mcp/docs/chat-cards-proposals.html
