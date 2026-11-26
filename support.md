---
layout: default
title: Support
permalink: /support/
description: How to get help with Proof of Done for Jira. Contact, response time, troubleshooting, common questions and how to report a vulnerability.
heading: Support
lead: Open an issue or write to me. I answer within five business days.
---

<nav class="toc" aria-label="On this page" markdown="1">

On this page

- TOC
{:toc}

</nav>

## How to reach me

- Open an issue in the [issue tracker](https://github.com/ALikesToCode/proof-of-done-docs/issues/new/choose). It is public and needs a GitHub account.
- Or write to [development@sciencestudent.8shield.net](mailto:development@sciencestudent.8shield.net).

I answer within five business days. If Atlassian marks a request as critical, I answer within 24 hours. I read other reports on business days and keep no set hours. There is no phone support.

<div id="what-helps-me-help-you"></div>

## What to include

- What you did, what you expected and what happened.
- The page it happened on. That is the work item panel, the project page, the settings, the workflow validator, the Proof Verifier or a coding agent's tool call.
- The exact message the app showed.
- Whether your project is company-managed or team-managed.
- How the app was installed, from the Atlassian Marketplace or from an install link.

Leave out anything confidential. A work item key is enough. I do not need its content.

<div id="things-to-try-first"></div>

## Troubleshooting

Each entry names what you see and says what to do. The [reference]({{ '/reference/' | relative_url }}) explains the rules behind them.

### I cannot find the app

The project page is a tab named Proof of Done in the row of tabs under the project's name. When the row is full, Jira keeps it under More.

On a work item, Jira shows the panel only after someone has added it there. Press the apps button, the icon of three squares and a plus sign to the right of the work item's title, and choose Proof of Done.

### Jira asks me to allow access

Each person chooses Allow access once, because the app reads Jira as that person.

### There is no Load sample data button

Only a project admin or a Jira admin sees it. On a project that has no contract yet, everyone else reads "A project admin can also load sample data here."

### "Jira would not create a sample work item"

The message ends with the reason Jira gave, for example a field that the project requires. The sample fills in only the summary, the description and a label. Load it in a project that accepts such a work item.

### A sample work item is in the wrong status

The app moves four of the five sample work items, each with the first transition that leads to an in-progress or a done status. When the workflow has no such transition from the first status, or Jira refuses the move, the work item stays where it is. Its contract and its evidence are there all the same.

### The panel is read-only

The panel then says "You can read this contract. Changing it or adding evidence needs permission to edit the work item." Ask a project admin for permission to edit work items in that project.

### The panel found no criteria in the description

The app looks for a heading or a line such as "Acceptance criteria", "Definition of done", "Done when", "Success criteria" or "Expected result", with a list under it. It reads bullets, numbered lists, task lists and scenarios written as Given, When, Then. It knows only English headings. Without such a heading, type the criteria in the panel.

### "This would not count as evidence yet"

The lines under that title say what to fix. The reference lists the [checks for each kind of evidence]({{ '/reference/' | relative_url }}#evidence-and-its-checks).

### The button on my evidence reads Reject, and there is no Review

You typed that evidence into the panel, and the project asks for someone else to accept it. Ask a colleague who may edit the work item to review it. If your site has Rovo, you can also press Ask Proof Verifier.

For a team of one, a project admin can open the Settings tab on the project's Proof of Done page, clear "Evidence has to be accepted by someone other than the person who entered it" and press Save settings. The rules of proof say [what that changes]({{ '/reference/' | relative_url }}#self-review).

### There is no Ask Proof Verifier button

The button is there when three things are true. Your site has Rovo, you may edit the work item, and at least one piece of evidence waits for a review. Without Rovo, ask a colleague to review the evidence.

When the panel says "Rovo chat did not open from here. Open Rovo chat yourself and choose the Proof Verifier agent.", do that and ask the agent to review the evidence on the work item.

### The verdict of the Proof Verifier does not show up

In Rovo chat, tick the verdicts and press Confirm selected. The agent records nothing before that. After you press Ask Proof Verifier, the panel looks for new verdicts every eight seconds for five minutes. After that, or when you started the review in Rovo chat, press Refresh.

### I closed a work item without proof and nothing happened

Check five things.

- The work item has a contract with at least one criterion. Without one the app does not react, unless the project ticks "Treat a work item that has no contract as not proven".
- "When a work item is closed without proof" is not set to "Do nothing".
- The work item moved into a done status from a status that is not one. A move between two done statuses is not a close.
- Three minutes have passed. Atlassian says a change can take that long to reach an app.
- The project lets the app comment. When it does not, the History of the work item still shows the close.

### The work item got a comment and was not moved back

The app moves a work item back only when the workflow has a transition from the done status to the status the work item came from. When there is none, or Jira refuses the move, the app comments. The setting also applies only to closes that happen after you save it.

### The validator does not stop a transition

Check four things.

- The validator is on that transition, and the workflow is published.
- The work item has a contract with at least one criterion, or the project ticks "Treat a work item that has no contract as not proven".
- "When a work item is closed without proof" is not set to "Do nothing". That setting also switches the validator off.
- The app can read the work item. The validator lets a work item through when the permissions of the project keep apps out, and when its own check fails with an error.

### A transition is blocked after you uninstalled the app

Remove the "Proof of Done is complete" validator from that transition in the workflow editor.

### A coding agent cannot connect

A site admin or an organization admin has to turn the tools on under Atlassian Administration, Apps, Sites, your site and Connected apps. There the admin selects Proof of Done, opens its app details and turns on its tools. Each person then opens the Proof of Done panel on a work item once and chooses Allow access.

Check the address too. The page on coding agents gives [the address]({{ '/agents/' | relative_url }}#connect-the-agent) for the app from the Atlassian Marketplace. A copy of the app that was installed from a link, or one that you deployed yourself, has another id at the end of the address.

### "The Teamwork Graph did not answer."

The whole message is "The Teamwork Graph did not answer. You can judge without it, or ask again." Press Ask again a little later, or judge without the note.

### The Teamwork Graph note reads "No record"

The graph gave the app nothing to compare with. That happens when the graph links no pull request or build to the work item, which is what to expect when no development tool such as GitHub or Bitbucket is connected to Jira. Jira links a pull request to a work item when the work item key is in the branch name, the pull request title or a commit message. The note also reads "No record" when the graph left out one of the lists the app asked for, or gave the app only part of one. Atlassian's documentation says that the graph leaves out data when an admin has not granted one of the app's Teamwork Graph permissions, and when you may not see that data. Check both.

### The search does not list a work item

The search fields exist only on work items that have a contract. For closed work that has no contract, look at the meter on the project page. It counts that work under "Closed, no contract".

After a change of the setting "Evidence has to be accepted by someone other than the person who entered it", the app rewrites the fields of the 60 contracts that changed most recently. An older contract keeps its old values until its next change.

### "Something went wrong on our side. Try again in a moment."

Try again. If the message stays, send me the time, the page and the work item key.

## Common questions

### Does the app cost anything?

No. The app has no fee and no paid tier. Jira, Rovo and outside coding tools have their own plans and terms.

### Does it work without Rovo or without a coding agent?

Yes. People can add evidence in the panel and review each other's evidence. Only the Proof Verifier needs Rovo, and only coding agents need the MCP server.

### Does the app send my data to an AI model?

The app itself makes no calls to a language model. Two features hand data to a model that you chose to use. The Proof Verifier runs in Rovo, and a coding agent that a person connects reads work items through the app's tools. The [privacy policy]({{ '/privacy/' | relative_url }}#rovo-and-coding-agents) says what each receives.

### Can a coding agent mark its own work as proven?

No. An agent has no tool that records a verdict, and it cannot attest. The person who connected the agent can accept the agent's evidence in the panel, and the app counts that as a review by someone else. That person can also ask the Proof Verifier.

### Who can review evidence?

Anyone who may edit the work item. By default a person cannot accept evidence that they typed into the panel themselves. They can reject it, and they can accept evidence that their own coding agent submitted. The Proof Verifier reviews for anyone who may edit the work item, also for the person who typed the evidence. The [rules of proof]({{ '/reference/' | relative_url }}#the-rules-of-proof) have the rest.

### What happens to work items that have no contract?

By default the done gate and the validator leave them alone, and they close as before. A project admin can change that with "Treat a work item that has no contract as not proven".

The app still records every close and reopen. Each time a work item that it can read moves into or out of a done status, the app adds an entry to its history with the account id of the person who moved it. The [privacy policy]({{ '/privacy/' | relative_url }}#what-the-app-stores) describes that entry.

### Does the app change my workflow?

No. It moves a work item back only when a project admin chose that reaction, and it blocks a transition only where an admin added the validator.

### Does it work in team-managed projects?

Yes. The validator is available to company-managed and team-managed projects. A team-managed project calls it a rule.

### Can I edit or delete one piece of evidence?

No. Nobody can edit or delete a piece of evidence, a verdict or a history entry. To overrule a verdict, record a new one. Deleting the work item removes what the app stored for it.

### Can I export the contracts and the evidence?

Not from the app. Jira's search can list work items by their proof with the [search fields]({{ '/reference/' | relative_url }}#search-fields), and a coding agent can read one contract with `get-done-contract`.

### Where is my data?

In Forge SQL, a database inside Atlassian's cloud. It follows the data residency setting of your Jira site. The [privacy policy]({{ '/privacy/' | relative_url }}) lists what the app stores and names the locations.

### What stays behind when I uninstall the app?

The comments the app wrote, the status of a work item it moved back, sample work items that nobody removed and the `proof-of-done` property stay in Jira. The reference lists [what to do before you uninstall]({{ '/reference/' | relative_url }}#uninstall).

## Security reports

Report a suspected vulnerability through [GitHub's private form](https://github.com/ALikesToCode/proof-of-done-docs/security/advisories/new) or by email to the address above. Do not post it in a public issue.

Say what you found, how to reproduce it and what an attacker could do with it. Leave out the data of real people.

The app runs on Atlassian Forge and has no server of its own. If the fault is in Forge, Jira or Rovo, report it to Atlassian on its page [Report a vulnerability](https://www.atlassian.com/trust/security/report-a-vulnerability).
