---
layout: default
title: Get started
permalink: /
description: How to install Proof of Done for Jira Cloud, load the sample, review evidence and prove a first criterion of a done contract.
---

# Proof of Done for Jira

Proof of Done gives a Jira work item a done contract. That is a list of criteria, and each criterion needs evidence that it is met. The app reports the work item as proven when every criterion has evidence that was accepted. The [rules of proof]({{ '/reference/' | relative_url }}#the-rules-of-proof) say who can accept what.

The app is for teams that hand Jira work to AI coding agents. The agent reads the contract, does the work and submits evidence for each criterion. A person or the Proof Verifier accepts or rejects the evidence. The Proof Verifier is a Rovo agent that comes with the app, and Rovo is Atlassian's AI product. When someone closes a work item while its contract is not proven, the app comments on it or moves it back, and a workflow rule can refuse the close. By default the app leaves a work item that has no contract alone.

<figure>
  <img src="{{ '/assets/img/panel.png' | relative_url }}" width="930" height="562" alt="The Proof of Done panel on a Jira work item. It reads Partly proven, 1 of 3 criteria proven, and Not ready to close. Two criteria each have one piece of evidence that waits for a check, with a Review button under it.">
  <figcaption>The panel on a sample work item. One criterion of three is proven. Two have evidence that waits for a review.</figcaption>
</figure>

<nav class="toc" aria-label="On this page" markdown="1">

On this page

- TOC
{:toc}

</nav>

## What it does

- **Done contract.** The Proof of Done panel on a work item reads the acceptance criteria out of the description and offers them as a contract. People who may edit the work item can add, change and remove criteria. A project can set rules, which are criteria that go into each new contract unless the person who creates it chooses Start empty.
- **Evidence with checks.** Evidence is a test run, a build, a pull request, a document, an attestation, or something else with a link or an excerpt. An attestation is a person's own statement that the criterion is met. The app checks the fields of each piece when it arrives. It does not open the link or run anything. A test run with a failed test does not pass, and neither does a build with no result. Evidence that does not pass cannot be accepted, and the app says why.
- **A verdict on each piece.** Evidence that passes the checks waits for a review. A person who may edit the work item, or the Proof Verifier, accepts or rejects it. By default a person cannot accept evidence that they typed into the panel themselves. The same person can accept evidence that their own coding agent submitted, and can ask the Proof Verifier to judge evidence they typed in. The app counts both as a review by someone else. An attestation does not wait. The app accepts it when it arrives, and it proves the criterion when the person who attests is not the assignee of the work item.
- **A second source for pull requests and builds.** When evidence links a pull request or a build, the app asks Jira's Teamwork Graph what the connected development tool reported for that work item. The reviewer sees a note that says whether the two agree.
- **Done gate.** The app calls its reaction to a close without proof the done gate. When a work item is closed while a criterion of its contract is not proven, the app comments on it or moves it back. Both happen after the close. To have Jira refuse the close itself, add the app's validator to the workflow. A validator is a rule that Jira checks before it lets a work item change its status.
- **Project meter.** Each project gets a Proof of Done page with a meter and a list. The meter says whether proven work leaves the project faster than new work arrives. It reads "Climbing" when more work items were closed with proof than were opened or reopened in the chosen period. The list shows the work items under contract that you can see, up to the 200 that changed most recently, with what each still needs.
- **Tools for coding agents.** A coding agent connects through MCP, the protocol that agents use to call outside tools. It can read a work item and its contract, start a contract from criteria that are already written down, and submit evidence. It cannot attest, and it has no tool that accepts or rejects evidence.
- **Search.** The app copies the state of each contract to fields that Jira's search can read. `statusCategory = Done AND proofState != proven` finds closed work whose contract is not fully proven.

## Who it is for

Use it when people or coding agents close Jira work items and you want each close backed by evidence and a recorded verdict. The app needs acceptance criteria to work with. It reads them from the description of a work item, or people type them into the panel.

It is the wrong tool in these cases.

- You want something that runs your tests. The app runs no tests and opens no links. It records what people and agents report, checks the fields of each report, such as the number of failed tests, and records what a reviewer decided.
- You use Jira Data Center. The app runs on Jira Cloud only.
- Your team writes work items in a language other than English. The app's pages are in English, and it finds criteria in a description only under English headings such as "Acceptance criteria".

## Before you install

- Proof of Done is free and runs on Jira Cloud.
- A Jira admin installs it. The app asks for permission to read and write work items, and for four permissions to read the Teamwork Graph. Atlassian's documentation says an organization admin has to grant the Teamwork Graph ones.
- The Proof Verifier needs Rovo on your site. The rest of the app works without Rovo.
- To work on a contract, a person needs permission to edit the work item. To change a project's settings or load the sample, a person has to be a project admin or a Jira admin.
- Jira's navigation now calls a project a space. The app and these pages say project.

## Get started

These steps take a Jira admin from the install to a first proven criterion. You need a Jira site where you are an admin, with one software project. Use a test project, because step 3 creates five work items in it, moves four of them to another status and comments on one. Only the Proof Verifier in step 7 needs Rovo, and that step says what to do without it.

1. **Install the app** from the Atlassian Marketplace. Atlassian is reviewing the app's listing, and the app is not public there until the review ends.
2. **Open the project page.** Open the project and choose Proof of Done in the row of tabs under its name. When the row is full, Jira keeps the tab under More. The first time you open one of the app's pages, Jira asks you to allow access, because the app reads Jira as you. Choose Allow access.
3. **Load the sample.** Press Load sample data. Only a project admin or a Jira admin sees that button. The app creates five work items, one after the other, and labels them `proof-of-done-sample`. One is closed and proven, one is closed without proof, two are in progress, and one has no contract yet. The table under the meter lists the four that have a contract. On a project with no other recent work the meter reads "Busy, not climbing", because one work item was closed with proof against five that were opened.
4. **Review evidence.** In the table, open "Sample: Export the audit log as CSV". Jira shows the app's panel on a work item only after someone has added it there. Press the apps button, the icon of three squares and a plus sign to the right of the work item's title, and choose Proof of Done. The panel lists three criteria. One is proven, and two have evidence that waits for a check. Press Review on one. The dialog shows what the evidence states and what the app's checks found. Press Accept, or type a reason and press Reject.

   <figure>
     <img src="{{ '/assets/img/apps-button.png' | relative_url }}" width="930" height="214" loading="lazy" alt="The top of a Jira work item named Sample: Export the audit log as CSV. To the right of the title is a row of three icon buttons. The first one, three small squares and a plus sign, is highlighted. Under the title, the Proof of Done panel reads Partly proven, 1 of 3 criteria proven.">
     <figcaption>The apps button is the highlighted icon to the right of the title. The panel appears under the title once you have added it.</figcaption>
   </figure>

   <figure>
     <img src="{{ '/assets/img/review-evidence.png' | relative_url }}" width="842" height="810" loading="lazy" alt="The Review evidence dialog. It shows the criterion, a test run with 9 passed and 0 failed, five lines under Checks the app ran, a Reason field, and the buttons Cancel, Reject and Accept.">
     <figcaption>The Review evidence dialog. The checks show that the evidence is well-formed. Whether it proves the criterion is for the reviewer to decide.</figcaption>
   </figure>
5. **Start a contract of your own.** Open "Sample: Sign users out after 30 minutes without activity" and add the panel in the same way. This work item has no contract yet. Its description has a list under the heading "Acceptance criteria", so the panel offers three criteria. Press "Create contract with these 3 criteria". On a work item with no such list, type the first criterion and press Add criterion.
6. **Add evidence by hand.** This step uses made-up numbers to show a check at work. Press Add evidence on the first criterion and choose Test run as the kind of evidence. Type "Session tests on the staging build" under What it shows, 7 under Tests passed and 2 under Tests failed, and press Add evidence. The app stores nothing and answers "2 tests failed, so this run proves nothing yet." Now enter the run as if every test had passed. Change Tests failed to 0 and press Add evidence again. The evidence now reads "Waiting for a check".
7. **Get a verdict.** You typed that evidence yourself, so by default you cannot accept it. That is why its button reads Reject and not Review. There are three ways to go on.

   - Ask a colleague who may edit the work item to open the panel, press Review and then Accept.
   - If your site has Rovo, press Ask Proof Verifier. Rovo chat opens and lists the verdicts the agent wants to record. Tick the ones you agree with and press Confirm selected. After you press Ask Proof Verifier, the panel looks for new verdicts every eight seconds for five minutes. After that, press Refresh. The app counts the Proof Verifier's verdict as a review by someone else, also when the person who asks typed the evidence.
   - To finish alone without Rovo, open the Settings tab on the project's Proof of Done page, clear "Evidence has to be accepted by someone other than the person who entered it" and press Save settings. Back on the work item, press Review and then Accept. The criterion now reads "Proven, self-reviewed". The setting applies to the whole project, so tick it again when you have finished testing.
8. **Close something without proof.** Open "Sample: Upgrade the payment SDK to version 4". None of its three criteria has evidence. Move it to a done status. When Jira tells the app about the change, the app comments on the work item and says what is missing, here "3 of 3 criteria are not proven (3 with no evidence)." Atlassian says a change can take up to three minutes to reach an app. Leave the work item closed for the next step.
9. **Search by proof.** Open Jira's work item search, switch it to JQL and run `statusCategory = Done AND proofState != proven`. The search lists the work item you closed in step 8 and the sample that was closed without proof.

To have the app move such a work item back as well, open the Settings tab, choose "Move the work item back to the status it came from, and say why" under "When a work item is closed without proof" and press Save settings. The setting applies to closes that happen after you save it.

When you have finished, open the project's Proof of Done page, press Remove sample data and confirm with Delete them. The app deletes the sample work items it created and what it stored for them, together with any subtasks that someone added under them. It deletes no other work item.

If a step did not go as written, the [troubleshooting list]({{ '/support/' | relative_url }}#troubleshooting) has the messages the app shows and what to do about each.

## Block the transition itself

The comment and the move back happen after the work item was closed. To stop the close before it happens, add the app's validator to the workflow.

1. Open the workflow editor of the project.
2. Select the transition into your done status and add a validator. A team-managed project calls it a rule.
3. Choose "Proof of Done is complete" and publish the workflow.
4. When more than one transition leads into a done status, add the validator to each of them. It checks only the transitions it is on.

Jira then refuses the transition and shows what is missing, for example "Proof of Done: 3 of 3 criteria are not proven (3 with no evidence). Add or review evidence in the Proof of Done panel."

The validator lets a work item through in four cases.

- The work item has no contract, or its contract has no criteria. To stop those too, tick "Treat a work item that has no contract as not proven" in the project's settings.
- "When a work item is closed without proof" is set to "Do nothing" in the project's settings.
- The app cannot read the work item, for example because the permissions of the project keep apps out.
- The app's own check fails with an error. The app then lets the work item through, so that a fault in the app does not lock a team out of its own workflow.

Remove the validator from every workflow before you uninstall the app. A validator that is left behind blocks its transition.

## Where to go next

- The [reference]({{ '/reference/' | relative_url }}) has the rules of proof, the checks for each kind of evidence, the settings, the limits and the search fields.
- {: #the-proof-verifier} [The Proof Verifier]({{ '/reference/' | relative_url }}#the-proof-verifier) says what the app's Rovo agent reads and what the app holds it to.
- {: #the-teamwork-graph-check} [The Teamwork Graph check]({{ '/reference/' | relative_url }}#the-teamwork-graph-check) explains the note on pull requests and builds.
- {: #coding-agents} [Connect a coding agent]({{ '/agents/' | relative_url }}) explains how to turn the app's tools on, how to connect Claude Code or another agent, and what to tell the agent.
- {: #what-it-stores-and-what-it-may-do} [What it stores and what it may do]({{ '/reference/' | relative_url }}#what-it-stores-and-what-it-may-do) lists the app's permissions and what it does as itself.
- {: #uninstall} [Uninstall]({{ '/reference/' | relative_url }}#uninstall) lists what to do before you uninstall the app and what stays in Jira.
- {: #preview-features} [Preview features]({{ '/reference/' | relative_url }}#preview-features) names the parts of the app that rest on Atlassian features in Preview.
- The [support page]({{ '/support/' | relative_url }}) has troubleshooting, common questions and how to reach me.
