---
layout: default
title: Coding agents
permalink: /agents/
description: How to connect Claude Code or another coding agent to Proof of Done for Jira through MCP, what the five tools do, what the agent receives and what to tell it.
---

# Connect a coding agent

A done contract is the list of criteria that a work item has to meet, each with evidence. A coding agent such as Claude Code can read the contract and submit evidence itself. It does that through the app's MCP server, which Atlassian hosts. MCP is the protocol that coding agents use to call outside tools.

Through the server an agent reads a work item and its done contract, starts a contract from criteria that are already written down, and submits evidence for each criterion. It cannot change what a contract says, and it cannot accept or reject evidence. A person or the Proof Verifier does that. The Proof Verifier is a Rovo agent that comes with the app.

<nav class="toc" aria-label="On this page" markdown="1">

On this page

- TOC
{:toc}

</nav>

## Turn the tools on

Access from outside Atlassian is off until an admin turns it on.

1. A site admin or an organization admin opens Atlassian Administration, then Apps, Sites, the site and Connected apps. There the admin selects Proof of Done, opens its app details and turns on its tools.
2. Each person who will use an agent opens the Proof of Done panel on any work item once and chooses Allow access. The tools read Jira as that person, so the agent sees no work item that the person cannot see, and it can change a contract only where the person may edit the work item.

## Connect the agent

The address of the MCP server ends in the id of the app. For the app from the Atlassian Marketplace the address is `https://mcp.atlassian.com/forge/8e9618ee-0af4-4f2a-95af-436f5d28f0b9`. A copy of the app that was installed from a link, or one that you deployed yourself, has another id at the end of the address.

In Claude Code, run this command.

```
claude mcp add --transport http proof-of-done https://mcp.atlassian.com/forge/8e9618ee-0af4-4f2a-95af-436f5d28f0b9
```

Then run `/mcp` in Claude Code and sign in. The sign-in page asks which site to connect. For another agent, add the address as a remote MCP server in its settings.

## The five tools

`get-context-pack`
: Returns the context pack of a work item. That is what an agent should read before it starts: the description, the parent, linked work items, linked pull requests and builds, recent comments, the done contract and the rules of proof.

`get-done-contract`
: Returns each criterion with its evidence and whether it is proven, and gives the done gate's answer for the work item. The done gate is the app's reaction when someone closes a work item whose contract is not proven.

`start-done-contract`
: Creates the contract from the acceptance criteria in the description and the rules of the project. It cannot add criteria of the agent's own. When the work item already has a contract, the tool returns that contract unchanged.

`submit-evidence`
: Submits one piece of evidence for one criterion and answers at once whether it passed the checks. Evidence that passes still waits for a review.

`list-unproven-work`
: Lists up to 30 work items of a project that have a contract and are not fully proven, with what each still needs. It also returns the number of contracts in the project and the reading of the project's meter. The meter says whether proven work leaves the project faster than new work arrives.

Every answer has a field `ok`. When it is false, the answer has a `code` and an `error` sentence that says why.

## What to tell the agent

The tools do not tell an agent when to use them. Put the working order into the agent's instructions. For Claude Code that is the file `CLAUDE.md` in your repository.

```
When you work on a Jira work item, use the Proof of Done tools.

1. Call get-context-pack with the work item key before you start. Read the contract in the answer.
2. If hasContract is false and the answer suggests criteria, call start-done-contract. If it suggests none, ask me to write the contract in the Proof of Done panel.
3. Put the work item key in the branch name, the pull request title or a commit message.
4. When a criterion is met, call submit-evidence for it. State what you ran in this session and copy the numbers from the output. Give your name in agentName.
5. If the answer has passedChecks false, read problems, fix the cause and submit again.
6. At the end, call get-done-contract. Report how many criteria are proven, how many wait for a review and how many have no evidence.
7. Say "done" only when proof.state is "proven". Leave the work item out of a done status until then.

You cannot accept evidence and you cannot attest. Tell me when evidence waits for a review.
```

Step 7 names `proof.state` on purpose. The answer also has `gate.passes`, which is the done gate's answer. The gate passes a work item that has no contract, and it passes everything in a project that set "When a work item is closed without proof" to "Do nothing". So `gate.passes` can be true while nothing is proven.

## What an agent can and cannot do

- An agent acts with the account of the person who signed in. It sees only the work items that person can see, and it can change a contract only where that person may edit the work item.
- It can start a contract only from criteria that are already written down, in the description of the work item or in the rules of the project.
- It can submit a test run, a build, a pull request, a document or other evidence. It cannot attest, because an attestation is a person's own statement.
- It has no tool that records a verdict, so it cannot accept its own work. The person who connected it can accept that evidence in the panel, and the app counts that as a review by someone else.
- The app cannot tell whether an agent or a person sent a tool call. It treats everything that arrives through these tools as an agent's evidence and stores it under the account of the person who signed in.
- The panel shows which agent submitted a piece of evidence when the agent gives its name. The name is what the agent sends, up to 128 characters, and the app does not check it.
- The app stores evidence from an agent that fails the checks and labels it "Failed checks". The answer tells the agent why.
- `list-unproven-work` lists only work items that the person can see. The number of contracts it reports and its reading of the meter also count work items that the person cannot see.

## What the agent receives

`get-context-pack` sends the agent these things about the work item.

- Its key, summary, type, status, priority, labels, components and due date.
- Up to 12,000 characters of its description.
- The display names of its assignee and its reporter.
- Its parent, with up to 2,000 characters of the parent's description.
- Its subtasks and its linked work items, each with key, summary and status.
- The five most recent comments, each with the display name of its author, its time and up to 1,500 characters of its text.
- The pull requests, builds and deployments that Jira's Teamwork Graph links to the work item, with their names, links and states.
- The done contract and the rules of proof for the project.

`get-done-contract` sends the contract. That is each criterion with its five newest pieces of evidence, their summaries, links, details and verdicts. `submit-evidence` sends back the one criterion in the same form. `list-unproven-work` sends the key, summary, type and status of the work items it lists, with what each still needs.

The answers hold display names and no account ids. The app cuts long text at the lengths above and filters nothing out of it. The agent runs outside Atlassian. Where it sends what it reads is up to the tool you chose and the person who connected it.

## When a tool says no

When a tool cannot do what the agent asked, its answer says why in a sentence. These are the common ones, each by its first sentence.

"Proof of Done cannot act as you yet."
: Open the Proof of Done panel on any work item in Jira and choose Allow access. Then let the agent call the tool again.

"No acceptance criteria were found in the description or the project rules."
: An agent cannot write a contract. Write the criteria in the Proof of Done panel, or add a list under a heading such as "Acceptance criteria" to the description.

"Only a person can attest."
: The agent submitted an attestation. The app stores it as failed evidence and returns this sentence under `problems`. Ask the person who can vouch for the criterion to add an attestation in the panel.

"You need permission to edit ABC-123 to change its done contract or its proof."
: The person who connected the agent may not edit that work item. Ask a project admin for the permission.

"Work item ABC-123 does not exist, or you do not have access to it."
: Check the key. The agent reads Jira as the person who connected it, so it cannot reach a work item that this person cannot see.

"Proof of Done could not finish this call. Try it again."
: The app ran into an error. If the message stays, send me the time and the name of the tool.

If the agent cannot connect at all, the [support page]({{ '/support/' | relative_url }}#a-coding-agent-cannot-connect) lists what to check.
