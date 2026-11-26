---
layout: default
title: Privacy policy
permalink: /privacy/
description: What Proof of Done for Jira stores and reads, where the data is kept, who can read it, how long it stays and how to remove it.
heading: Privacy policy
lead: What the app stores and reads, where the data is, who can read it, how long it stays and how it is removed.
updated: 24 November 2026
---

Proof of Done is an app for Jira Cloud. Abhyudaya Baiju Tharakan makes it and is "I" on this page. The page says what the app stores and reads, where the data is, who can read it, how long it stays and how it is removed.

I am responsible for how the app collects, stores and uses your data. Atlassian hosts the app's storage and is not responsible for what the app does with your data.

The page uses a few of the app's terms. A done contract is the list of criteria that a work item has to meet, each with evidence. A verdict accepts or rejects one piece of evidence. The Proof Verifier is an agent in Rovo, Atlassian's AI product. It comes with the app and gives verdicts when someone asks it. A coding agent is an AI tool such as Claude Code that a person connects to the app. The done gate is what the app does when someone closes a work item whose contract is not proven. The validator is the app's workflow rule, which makes Jira refuse such a close.

<nav class="toc" aria-label="On this page" markdown="1">

On this page

- TOC
{:toc}

</nav>

## The short version

- The app keeps its data in Atlassian's Forge storage for your Jira site. It has no server of its own.
- It makes no outbound network calls and no calls to a language model. It answers Rovo when someone asks the Proof Verifier, and it answers the coding agents that people on your site connect.
- It identifies people by their Atlassian account id. It has no field for a name, an email address or an avatar, and it copies none from a user's profile. It stores text as people and agents wrote it.
- The app gives me no way to read or change what it stores on your site. I can read the app's logs unless your site's admin turns log access off for the app.
- The app sets no time limit on what it stores. What it stored for a work item goes when someone deletes that work item, and the rest goes when an admin uninstalls the app.

## What the app stores

When people on your site use the app, it stores these things in the Forge SQL database of your site. Each entry has the time it was made.

- **Done contracts.** The id and the key of the work item, the id of its project, and the state of the proof with its counts.
- **Criteria.** The text of each criterion, as a person typed it or as the app read it from the description of the work item or from a project rule. With it the app stores where the criterion came from, the heading it stood under in the description, and the kind of evidence it asks for. When someone removes or rewords a criterion, the app keeps the old criterion with its evidence and verdicts and hides it from the panel.
- **Evidence.** Its kind, a summary, a link, and the details someone entered, such as test counts, a build result, a commit or an excerpt of output. The app also stores the results of its own checks, whether the evidence came from the panel or from a coding agent, and the name a coding agent gave for itself. When a coding agent submits evidence that fails the checks, the app stores it and marks it as failed. The panel checks before it sends, so it stores nothing that fails there.
- **Verdicts.** Accepted or rejected, with the reasoning, where the verdict came from, and whether it counted as a review by someone else.
- **A history.** One entry for each change of a contract, each piece of evidence and each verdict, for each change of a project's settings, and for each transition that the validator refused. The app also adds an entry each time a work item that it can read moves into or out of a done status, whether or not that work item has a contract. That entry holds the account id of the person who moved it, the time, Jira's id of the change and the names of the two statuses. For a close it also says whether the work item had a contract and whether it was proven. When the done gate comments on a work item or moves it back, the app adds an entry for that too. An entry for a refused transition holds the account id of the person who tried, the time, the status and the reason. Entries repeat the text of the criterion they are about, the reasoning of a verdict and the name of a coding agent. So that text stays in the history after someone removes the criterion.
- **Project settings.** What the done gate does, the two other settings, and the rules a project adds to new contracts. A rule keeps the names of the work item types that an admin picked for it. With the settings the app stores the account id of the person who last changed them.
- **Account ids.** The Atlassian account id of the person who created a contract, added, changed or removed a criterion, submitted evidence, recorded a verdict or asked the Proof Verifier for one, or changed the settings. For evidence from a coding agent, that is the person who connected the agent. The app also stores the account id of the person who moved a work item into or out of a done status, and of the person whose transition the validator refused. So the app holds account ids of people who never opened it.
- **Sample markers.** Which sample work items the app created, so that it can remove them again.
- **Database updates.** The names of the updates that the app has applied to its own database, with the time of each.

The app also writes into Jira. Jira stores what it writes there.

- A work item property named `proof-of-done` on each work item that has a contract. It holds the proof state, four counts and the time of the last update. Jira's search can read the state and three of the counts.
- A comment on a work item that was closed without proof, unless the project's done gate is set to "Do nothing". The comment gives the key and the status of the work item and says what is missing as counts. It quotes no criterion.
- The status of a work item, when a project has set the done gate to move unproven work back.
- Five sample work items in a project where a project admin or a Jira admin presses Load sample data. The app moves four of them to another status and comments on one.

People, coding agents and the Proof Verifier write the text of criteria, evidence and verdicts, and the app copies criteria from work item descriptions. If that text holds personal information, the app stores it as written. When a criterion in a description mentions a person, the app copies the text that Jira holds for the mention, which can be the person's name.

<div id="what-the-app-reads-and-does-not-keep"></div>

## What the app reads and what it keeps of it

On its pages and in tool calls the app reads Jira as the person who is using it, so Jira decides what that person may see.

- For the panel it reads the work item: its summary, description, type, status, assignee, parent and project.
- For the project page it reads the name, the key and the work item types of the project. For each work item that has a contract it reads the summary, type, status, assignee and the time of its last move between status categories. It also asks Jira how many work items were created and closed in the project in the chosen period.
- For a coding agent it also reads the priority, labels, components, reporter, due date, subtasks and linked work items of the work item, its parent, and the five most recent comments with the display names of their authors.
- For the note on pull requests and builds, for the Proof Verifier and for a coding agent, it reads the pull requests, builds and deployments that Jira's Teamwork Graph links to the work item.
- It asks Jira whether the person may edit the work item and whether the person administers the project.

As itself the app reads a work item each time its status moves into or out of a done status, and each time the validator runs. It asks Jira for the summary, description, type, status, assignee, parent and project, and it uses the status, the key and the project. As itself it also reads a status and the transitions of a work item when it needs them to react to a close or to move a sample work item.

From what it reads, the app keeps the criteria it copies into a contract and the heading they stood under, the id and key of the work item, the id of its project, and the names of its statuses at a close or a reopen. It does not keep the description, the comments, the links or the pull request and build data.

Names and avatars on the app's pages come from Jira at the moment the page is shown. The app hands Jira an account id, and Jira shows the person.

## Who can read what

- Anyone who can see a work item can read its contract, evidence, verdicts and the 100 newest history entries in the Proof of Done panel. The panel shows the history once the work item has a contract.
- Anyone who can see a project can read its Proof of Done settings and rules.
- The project page lists only work items that the viewer can see. Some of its numbers count more. The number of contracts and the counts of reopened work, evidence and verdicts cover every work item in the project, also those the viewer cannot see. The tool `list-unproven-work` gives a coding agent the same number of contracts and the same reading of the meter.
- The app has no page that lists what it holds about one person, and no page that shows the history entries of a work item that has no contract.
- The app gives me no way to read or change what it stores on your site. I can read the app's logs, which the next section describes, unless your site's admin turns log access off for the app.

## Where the data is

The app's own data is in Forge storage, and what the app writes into Jira is in Jira. Atlassian runs both. The app has no outbound network access, and the Forge CLI reports it as eligible for Atlassian's Runs on Atlassian programme.

One thing is kept in your browser. While the panel waits for the Proof Verifier, it keeps one entry in the session storage of the browser tab. The entry holds the key of the work item and a time, and it ends with the tab.

The app writes short lines to the Forge log. The app's own lines hold work item ids and keys, the name of the function or tool that ran, how long a tool call took and the names of database updates. The app writes one line each time a work item that it can read moves into or out of a done status, with the id of the work item and what the app did. It writes one more when it removes what it stored for a deleted work item. When a call fails, the app also logs the name of the error, its status or code when it has one, and at most the first 200 characters of its message, as Jira, Forge, the Teamwork Graph or the database reported it. The app puts no criteria, evidence or verdict text and no account ids into its own lines. A message from the platform could quote a fragment of stored text. An error that the app does not catch goes to the log as Forge writes it.

## Data residency

The app's database follows your Jira site. When your organisation pins Jira to a location, Atlassian keeps the app's Forge storage in that location, and moves it when Jira moves. Atlassian offers these locations: Australia, Canada, the EU, Germany, India, Japan, Singapore, South Korea, Switzerland, the United Kingdom and the USA. For the EU it names Frankfurt and Dublin. When your organisation has not pinned Jira to a location, Atlassian chooses where the data is kept. Atlassian's page on [Forge data residency](https://developer.atlassian.com/platform/forge/data-residency/) has the current list.

In scope, kept in that location:

- Done contracts and their criteria, including criteria that someone removed or reworded.
- Evidence, with its summary, link, details and check results.
- Verdicts and their reasoning.
- The history: contract, criterion, evidence and verdict events, changes of the settings, transitions the validator refused, each move of a work item into or out of a done status, and each comment or move back of the done gate.
- Project settings and the rules for new contracts.
- The Atlassian account ids stored with these entries.
- The markers for sample work items.
- The list of database updates that the app has applied.

Out of scope, not pinned:

- The app's log lines.
- Data in transit while the app handles a request. Atlassian aims to run the app in the same location as Jira and says it may sometimes run it elsewhere.
- What Rovo or a coding agent receives through the app's tools. Rovo is Atlassian's, and Atlassian's terms cover it. Where a coding agent sends data is up to the person who connected it.
- The entry that the panel keeps in the session storage of a browser tab while it waits for the Proof Verifier.

The `proof-of-done` property, the comments the app writes on work items and the sample work items are Jira data. Jira stores them, and Jira's own data residency rules apply to them.

## Rovo and coding agents

The Proof Verifier is a Rovo agent. When someone asks it to review evidence, Rovo receives the evidence that waits, the results of the app's checks, the criteria, the summary of the work item and up to 6,000 characters of its description through the app's tools. When someone asks it where the proof stands, Rovo receives the contract of a work item or the list of a project's unproven work items. The app's answers to Rovo hold no account ids. Atlassian's terms for Rovo cover that processing.

The app has an MCP server that Atlassian hosts. MCP is the protocol that coding agents use to call outside tools. The server is off until an admin of your site turns it on. Once it is on, a person can connect a coding agent of their choice, and the app answers that agent as that person. The agent can receive these things.

- The key, summary, type, status, priority, labels, components and due date of a work item, and up to 12,000 characters of its description.
- The display names of its assignee and its reporter.
- Its five most recent comments, each with the display name of its author.
- Its parent, its subtasks and its linked work items.
- The pull requests, builds and deployments that the Teamwork Graph links to it.
- Its done contract with the evidence and the verdicts, and the list of a project's unproven work items.

The app does not store these names. It reads them from Jira and passes them on. Its answers to a coding agent hold no account ids. The agent runs outside Atlassian, and where it sends the data is up to the person and the tool they chose. The page on [coding agents]({{ '/agents/' | relative_url }}#what-the-agent-receives) has the full list.

## How long data is kept and how to remove it

The app sets no time limit on what it stores. Rows stay until someone deletes the work item or an admin uninstalls the app.

- **Deleting a work item.** When Jira tells the app that someone deleted a work item, the app deletes the contract, criteria, evidence, verdicts and history it stored for that work item. Atlassian says such a message can take up to three minutes to reach an app. If the message does not arrive or the deletion fails, the rows stay until an admin uninstalls the app.
- **Removing a criterion.** Removing or rewording a criterion hides it. The app keeps it with its evidence and verdicts, and the history keeps the old wording. The app has no way to delete one criterion, one piece of evidence, one verdict or one history entry.
- **Removing the sample.** Remove sample data deletes the sample work items the app created and what the app stored for them. Jira deletes any subtasks that someone added under them at the same time. The app removes its own rows only for the sample work items. If such a subtask had a contract, the app's rows for it can stay.
- **Deleting a project.** The app keeps a project's settings, its rules and the history of settings changes until an admin uninstalls the app, also after someone deletes the project.
- **Closing an account.** The app keeps stored account ids after a person closes their Atlassian account. The ids go when someone deletes the work item or an admin uninstalls the app.
- **Uninstalling the app.** Uninstalling removes the app's storage for your site. Atlassian's documentation on [Forge storage](https://developer.atlassian.com/platform/forge/storage-reference/) says that Forge hosted storage retains data for 28 days after an uninstall, and that installing the app again does not bring the data back by itself. That period is Atlassian's and not mine to set.
- **What stays in Jira.** The `proof-of-done` property, the comments the app wrote, the status of a work item that the app moved back, and sample work items that nobody removed stay in Jira after an uninstall. Remove the sample data before you uninstall, because the app's list of the sample work items goes with its storage. The reference says [how to remove the rest]({{ '/reference/' | relative_url }}#uninstall).

The app has no other way to remove data, and it gives me no way to remove data from your site. Write to me if these steps do not cover your case, and I will tell you what is possible.

## Your rights

Your organisation controls the data in its Jira site. Anyone who can see a work item can read its contract, evidence, verdicts and the 100 newest history entries in the Proof of Done panel. The app has no page that lists everything it holds about one person. The app cannot change or delete a single piece of evidence, a verdict or a history entry. To correct a verdict, record a new one, and the old one stays in the history. A Jira admin removes what the app stored for a work item by deleting that work item, and removes all of it by uninstalling the app. The app gives me no way to read or change the data on your site. Write to me if you need more than that, and I will answer within five business days.

## This website and your messages

These pages are hosted on GitHub Pages. They set no cookies, run no scripts and load nothing from other servers. GitHub, as the host, logs the IP address of every visitor for security purposes. Its page on [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection) says so.

When you write to the support address, I receive your message with your email address. When you open an issue, I receive what you write with your GitHub name, and everyone else can read it too, because the issue tracker is public. I use what you send to answer you.

## Changes

I will change this page when the app changes what it stores, and I will put the new date at the top. When a change is material, I will also announce it in the release notes on the app's Marketplace listing and tell Atlassian. The [history of this page](https://github.com/ALikesToCode/proof-of-done-docs/commits/main/privacy.md) shows every change.

## Contact

Write to [development@sciencestudent.8shield.net](mailto:development@sciencestudent.8shield.net). The [issue tracker](https://github.com/ALikesToCode/proof-of-done-docs/issues) is public, so keep personal data out of it.
