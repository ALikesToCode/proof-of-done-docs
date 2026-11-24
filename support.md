---
layout: default
title: Support
permalink: /support/
description: How to get help with Proof of Done, what to include in a report and how to report a vulnerability.
---

# Support for Proof of Done

## How to reach me

- Open an issue in the [issue tracker](https://github.com/ALikesToCode/proof-of-done-docs/issues/new/choose). It is public and needs a GitHub account.
- Or write to [development@sciencestudent.8shield.net](mailto:development@sciencestudent.8shield.net).

I answer within five business days. I read reports on business days and keep no set hours. There is no phone support.

## What helps me help you

- What you did, what you expected and what happened.
- The page it happened on: the work item panel, the project page, the settings, the workflow validator or a coding agent's tool call.
- The exact message the app showed.
- Whether your project is company-managed or team-managed.

Leave out anything confidential. A work item key is enough. I do not need its content.

## Things to try first

- **The panel asks to allow access.** Each person chooses Allow access once, because the app reads work items as that person.
- **Ask Proof Verifier does nothing.** The Proof Verifier needs Rovo on your site. Without Rovo, turn off "Evidence has to be accepted by someone other than the person who entered it" in the project's Proof of Done settings, or ask a colleague to review.
- **A coding agent cannot connect.** A site admin has to turn the tools on under Atlassian Administration, Apps, Sites, your site, Connected apps, Proof of Done. Each person then opens the panel once and chooses Allow access.
- **The Review dialog says the Teamwork Graph gave no answer.** Press Ask again a little later. The note needs a development tool such as GitHub or Bitbucket connected to Jira.
- **A transition is blocked after you uninstalled the app.** Remove the "Proof of Done is complete" validator from that transition in the workflow editor.

The [documentation]({{ '/' | relative_url }}) has the setup steps.

## Security reports

Report a suspected vulnerability through [GitHub's private form](https://github.com/ALikesToCode/proof-of-done-docs/security/advisories/new) or by email to the address above. Do not post it in a public issue.
