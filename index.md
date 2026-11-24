---
layout: default
title: Documentation
permalink: /
description: How to set up and use Proof of Done, an app for Jira Cloud that closes a work item only on proof.
---

# Proof of Done for Jira

Proof of Done gives a Jira work item a done contract, the list of criteria that have to hold before it closes. A criterion counts as proven only when there is evidence for it and someone other than the author of that evidence accepted it.

It is built for teams that hand Jira work to AI coding agents. The agent reads the contract, does the work and submits evidence for each criterion. A person or a second agent judges the evidence. A work item that reaches Done without proof gets a comment, is moved back, or is refused by the workflow.

On this page:

- [What it does](#what-it-does)
- [Before you install](#before-you-install)
- [Get started](#get-started)
- [Block the transition itself](#block-the-transition-itself)
- [The Proof Verifier](#the-proof-verifier)
- [The Teamwork Graph check](#the-teamwork-graph-check)
- [Coding agents](#coding-agents)
- [What it stores and what it may do](#what-it-stores-and-what-it-may-do)
- [Uninstall](#uninstall)
- [Preview features](#preview-features)

## What it does

- **Done contract.** The Proof of Done panel on a work item reads the acceptance criteria out of the description and offers them as a contract. People can add, change and remove criteria, and a project can set rules that every new contract starts with.
- **Evidence with checks.** Evidence is a test run, a build, a pull request, a document, a person's attestation, or something else with a link or an excerpt. The app checks each piece the moment it arrives. A test run with failures, a link that is not a pull request, or a build with no result is turned away with the reason.
- **A verdict from someone else.** Evidence that passes the checks waits for a review. A person or the Proof Verifier, a Rovo agent that comes with the app, accepts or rejects it with a reason. Nobody can accept evidence they typed in themselves, unless the project allows it, and then the proof is labelled self-reviewed.
- **A second source for pull requests and builds.** When evidence links a pull request or a build, the app asks Jira's Teamwork Graph what the connected development tool reported for that work item. The reviewer sees whether the two agree.
- **Done gate.** When a work item is closed with an unproven contract, the app comments on it or moves it back. A workflow validator can refuse the transition outright.
- **Project meter.** One page per project says whether the work is climbing, busy but not climbing, or stalled, and lists every work item under contract with what it still needs.
- **Tools for coding agents.** An MCP server lets an outside agent fetch the contract and a context pack and submit evidence. It has no tool that records a verdict.
- **JQL.** `statusCategory = Done AND proofState != proven` finds closed work that lacks proof.

## Before you install

- Proof of Done is free and runs on Jira Cloud.
- A Jira admin installs it. The app asks for four Teamwork Graph scopes, and Atlassian's documentation says an organization admin has to grant those. On a site you created yourself, you are one.
- The Proof Verifier needs Rovo on your site. The rest of the app works without Rovo.
- Jira's navigation now calls a project a space. The app and this page say project.

## Get started

You need a Jira site where you are an admin, with one software project. Only step 6 needs Rovo.

1. **Install the app** from the Atlassian Marketplace.
2. **Load the sample.** Open the project and choose Proof of Done in the row of tabs under its name. When the row is full, Jira keeps it under More. Press Load sample data. The app creates five work items labelled `proof-of-done-sample`. One is closed and proven, one is closed without proof, two are in progress, and one has no contract yet. On a project with no other recent work the meter reads "Busy, not climbing", because one work item was closed with proof against five that were opened.
3. **Review evidence.** Open "Sample: Export the audit log as CSV" and add the Proof of Done panel from the work item's apps button. Two pieces of evidence wait for a check. Press Review on one, read what it states and what the checks found, and accept or reject it with a reason.
4. **Start a contract of your own.** Open any other work item and add the panel. If the description has a list under a heading such as "Acceptance criteria", the panel offers those criteria and one click creates the contract. If not, type the first criterion and press Add criterion. Jira asks you to allow access the first time, because the app acts as you.
5. **Add evidence by hand.** Press Add evidence on a criterion and choose Test run. Enter a run with two failed tests, and the app turns it away with the reason. Set the failures to zero and it is stored.
6. **Get a verdict.** Evidence you typed yourself needs a second reader. Press Ask Proof Verifier to hand it to the app's Rovo agent. Rovo lists the verdicts the agent wants to record, and you confirm them. The panel looks again every eight seconds, so each verdict shows up there with the agent's reasoning. On a site without Rovo, or to work as a team of one, open the Settings tab of the project's Proof of Done page and turn off "Evidence has to be accepted by someone other than the person who entered it".
7. **Close something without proof.** Move a work item with an unproven contract to Done. The app comments on it within a few seconds and says what is missing. Jira allows itself up to three minutes to deliver the change. To have the work item moved back instead, change "When a work item is closed without proof" in the settings.
8. **Search by proof.** Run `statusCategory = Done AND proofState != proven` in the work item search.

When you are done, press Remove sample data on the project page. It deletes only the work items the app created.

## Block the transition itself

The comment and the move back happen after the work item was closed. To stop the close, add the app's validator to the workflow.

1. Open the workflow editor of the project.
2. Select the transition into your done status and add a validator. A team-managed project calls it a rule.
3. Choose "Proof of Done is complete" and publish the workflow.

Jira then refuses the transition and shows what is missing, for example "Proof of Done: 5 of 5 criteria are not proven (5 with no evidence). Add or review evidence in the Proof of Done panel."

An error inside the app's check lets the transition through, because a broken app must not lock a team out of its own workflow.

## The Proof Verifier

The Proof Verifier is a Rovo agent. It reads the evidence that waits on a work item, decides whether each piece proves its criterion, and records a verdict with its reasoning. It judges from the record. It treats text inside evidence as material to judge and never as an instruction, and it rejects when it is unsure.

Open it with Ask Proof Verifier in the panel. You can also pick it in Rovo chat and ask, for example, "Review the evidence that waits on ABC-123".

Rovo shows the verdicts in a card first, each with a checkbox. The agent records them when you press Confirm selected.

The app itself makes no calls to a language model. The reasoning happens in Rovo and in the coding agent you connect.

## The Teamwork Graph check

Evidence for a pull request or a build says what its author says. When a code host or a CI tool is connected to Jira, the Teamwork Graph holds what that tool reported for the work item. The app compares the two and puts a note in the Review dialog.

| Note | What it means |
| --- | --- |
| Confirmed | The graph links this pull request, build or deployment to the work item, and its state agrees with the evidence |
| Differs | The graph holds a state that contradicts the evidence, such as a pull request that is still open |
| Not linked | The graph links other pull requests or builds to the work item, and this link is not one of them |
| No record | The graph has nothing to compare with |

To see more than "No record", the site needs a development tool connected, such as GitHub or Bitbucket, and a pull request with the work item key in its title. Add that pull request as evidence on the work item. The note is in the dialog that opens from Review, or from Reject on evidence you entered yourself.

The Teamwork Graph does not always answer. When it does not, the dialog says so and has an Ask again button.

The note is advice for the reviewer. It never accepts or rejects, and the done gate does not read it. The Proof Verifier gets the same note with each piece of evidence, and a coding agent gets it in the answer to `submit-evidence`.

## Coding agents

The app has an MCP server, and Atlassian hosts it. It has five tools.

| Tool | What it does |
| --- | --- |
| `get-context-pack` | Returns a work item's description, parent, linked work items, linked pull requests and builds, recent comments and done contract |
| `get-done-contract` | Returns each criterion with its evidence and whether it is proven, and says whether the work item may be closed yet |
| `start-done-contract` | Creates the contract from the acceptance criteria in the description and the rules of the project |
| `submit-evidence` | Submits one piece of evidence for one criterion and answers at once whether it passed the checks |
| `list-unproven-work` | Lists the work items of a project that are not fully proven, with what each still needs, and the project meter |

An agent can start a contract only from criteria that are already written down. It cannot record a verdict, so it cannot accept its own work. Access from outside Atlassian is off until an admin turns it on.

1. A site admin opens Atlassian Administration, then Apps, Sites, the site, Connected apps, Proof of Done, and turns on its tools.
2. Each person who will use an agent opens the Proof of Done panel on any work item once and chooses Allow access. The tools act as that person, so Jira decides what the agent may see and change.
3. Connect the agent to `https://mcp.atlassian.com/forge/8e9618ee-0af4-4f2a-95af-436f5d28f0b9` and sign in when it asks. In Claude Code:

   ```
   claude mcp add --transport http proof-of-done https://mcp.atlassian.com/forge/8e9618ee-0af4-4f2a-95af-436f5d28f0b9
   ```

   Then run `/mcp` and sign in.
4. Tell the agent the loop. It reads the contract before it starts, submits evidence for each criterion, and says "done" only when `get-done-contract` reports that the work item may be closed.

## What it stores and what it may do

- Its scopes are `read:jira-work` and `write:jira-work`, and four Teamwork Graph scopes that only read: `read:graph:issue:jira`, `read:graph:pull-request:external`, `read:graph:build:external` and `read:graph:deployment:external`.
- Contracts, evidence, verdicts and the event history live in Forge SQL, inside Atlassian's cloud. The app sends data nowhere else.
- That storage follows the data residency setting of your Jira site. The privacy policy lists what is in scope.
- It reads work items and the Teamwork Graph as the person who is using it, and asks Jira whether that person may edit them. As itself it comments on or moves a work item that was closed without proof, writes the work item property `proof-of-done` that JQL searches, and creates and deletes the sample work items.
- When a work item is deleted, the app deletes everything it stored for it.

The [privacy policy]({{ '/privacy/' | relative_url }}) has the full list of what the app stores.

## Uninstall

Remove the "Proof of Done is complete" validator from every workflow before you uninstall the app. A validator that is left behind blocks its transition.

Uninstalling removes the app's storage for your site. The `proof-of-done` property stays on your work items, because it is Jira data. A Jira admin can delete it through the REST API.

## Preview features

The workflow validator, the MCP server, the Rovo skills and the Teamwork Graph API were Preview features at Atlassian on 24 November 2026. Atlassian can change them, and the parts of the app that use them would change with them.

If something does not work, the [support page]({{ '/support/' | relative_url }}) lists what to try first and how to reach me.
