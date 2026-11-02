# BCT CRM

AI-native CRM concept for BCT (replacing Salesforce). All data is fictional.

- **`bct-crm-ui/`** — clickable web prototype: AI chat as the main entry, plus a Workspace (Pipeline, Accounts, Reports). Built on the Gina UI base. See [`bct-crm-ui/README.md`](bct-crm-ui/README.md).
- Design system: `bct-crm-ui/docs/design-system.html`. Design proposals are in the same folder.
- **`bct-crm-mcp/docs/chat-cards-proposals.html`** — how the connector's replies look in Claude, with a button to download the connector (`bct-crm-mcp/dist/bct-crm-demo.mcpb`). The connector source is not in this repo.

## Run locally

```bash
python3 -m http.server 5394
```

Then open http://localhost:5394/bct-crm-ui/ or http://localhost:5394/bct-crm-mcp/docs/chat-cards-proposals.html.
