---
layout: default
title: Privacy policy
permalink: /privacy/
description: What Proof of Done stores, where it keeps it, who can read it and how it is removed.
---

# Privacy policy for Proof of Done

<p class="updated">Last updated 24 November 2026.</p>

Proof of Done is an app for Jira Cloud. Abhyudaya Baiju Tharakan makes it and is "I" on this page. The page says what the app stores, where it keeps it, who can read it and how it is removed.

## The short version

- The app keeps its data in Atlassian's Forge storage for your Jira site. It has no server of its own.
- It sends your data to no other service and makes no calls to a language model.
- It stores Atlassian account ids. It stores no names, email addresses or avatars.
- I cannot read what the app stores on your site.

## What the app stores

When people on your site use the app, it stores these things in the Forge SQL database of your site.

- **Done contracts.** The criteria of a work item, as text that people entered or that the app read from the work item's description, with the ids of the work item and its project.
- **Evidence.** Its kind, a summary, a link, and the details someone entered, such as test counts, a build result, a commit or an excerpt of output. The app also stores the result of its own checks and the name a coding agent gave for itself.
- **Verdicts.** Accepted or rejected, with the reasoning.
- **A history.** One entry for each contract change, piece of evidence, verdict and status change the app reacted to.
- **Project settings.** What the done gate does, and the rules a project adds to new contracts.
- **Account ids.** The Atlassian account id of the person who created a contract or a criterion, submitted evidence, recorded a verdict or changed the settings.
- **Sample markers.** Which sample work items the app created, so it can remove them again.

The app also writes a work item property named `proof-of-done` on each work item under contract. It holds the proof state and four counts, so that JQL can search them.

People type the text of criteria, evidence and verdicts themselves. If someone types personal information into those fields, the app stores it as written.

## What the app reads and does not keep

To show a contract or answer a coding agent, the app reads the work item from Jira: its description, status, parent, links and recent comments. It also reads the pull requests, builds and deployments that Jira's Teamwork Graph links to the work item. It reads these as the person who is using the app, so Jira decides what that person may see. The app does not store what it reads, apart from the criteria it copies into a contract.

Names and avatars on the app's pages come from Jira at the moment the page is shown.

## Where the data is

All of it is in Forge storage and in Jira, both run by Atlassian. The app has no outbound network access, and the Forge CLI reports it as eligible for Atlassian's Runs on Atlassian programme.

The app writes short lines to the Forge log. They hold work item ids and keys, the name of a tool that ran and how long it took, and error messages. The app writes no criteria, evidence or verdict text and no account ids to the log. I can read these logs unless your admin has turned log access off for the app.

## Rovo and coding agents

The Proof Verifier is a Rovo agent. When someone asks it to review evidence, Atlassian's Rovo reads that evidence through the app's tools. Atlassian's terms for Rovo cover that processing.

The app has an MCP server that Atlassian hosts. It is off until an admin of your site turns it on. Once it is on, a person can connect a coding agent of their choice, and the app answers that agent with contract and work item data as that person. Where that agent sends the data is up to the person and the tool they chose.

## How long data is kept and how to remove it

- Deleting a work item deletes everything the app stored for it.
- Remove sample data deletes the sample work items the app created.
- Uninstalling the app removes its storage for your site. Atlassian keeps a soft-deleted copy for 28 days and then destroys it.
- The `proof-of-done` property stays on your work items after an uninstall, because it is Jira data. A Jira admin can delete it through the REST API.

To have something removed that these steps do not cover, write to me.

## Your rights

Your organisation controls the data in its Jira site. To see, correct or delete data about you, ask your Jira admin first. They can do all three without me. If you need my help, write to me and I will answer within five business days.

## Changes

I will change this page when the app changes what it stores, and I will put the new date at the top.

## Contact

Write to [development@sciencestudent.8shield.net](mailto:development@sciencestudent.8shield.net). The [issue tracker](https://github.com/ALikesToCode/proof-of-done-docs/issues) is public, so keep personal data out of it.
