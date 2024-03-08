[Reviewers guide](https://www.notion.so/lightbase/Pull-request-PR-reviews-Frontend-66f65f2fc91948a79d8f53a138e6f422)

**Checklist**

Please check the following items before submitting the PR. Add relevant explanations for the below points
under the description.

- [ ] The PR title is in line with the following examples:
  - `chore(ci): add speedups to lint job`
  - `fix(user): always show the email in the profile drop down`
  - `feat(tags): add SVG symbols to the tag cards`
- [ ] The PR is implemented according to the Acceptance Criteria. Include a link to the ticket `[XYZ-123]` in
      the description.
- [ ] The PR includes correct use of semantic HTML, aria attributes, etc. See
      [Notion](https://www.notion.so/lightbase/Hulpmiddelen-9e06d0c83147455389843e4a7634f022) for tools that
      can help you with this.
- [ ] The PR includes appropriate
      [tests](https://www.notion.so/lightbase/End-to-end-testing-07267aec731943049cc06364aa0233b8).
- [ ] The PR does use a
      [feature flag](https://www.notion.so/lightbase/Feature-flags-dbeb321e2393422da410a9289f8392b6).
- [ ] The PR includes technical documentation in the appropriate places. Any additional detail should be
      provided in the description.
  - Complex functions should have some documentation.
  - Unique scenario's should explain why this is a unique scenario.
  - Shortcuts are marked with a TODO comment.
  - Detected
    [technical debt](https://www.notion.so/Technical-debt-refactoring-eabbdee2b66945d7b55517f92cca20bb) is
    marked with a TODO comment.
  - Obsolete comments are removed.
- [ ] The PR does not add a new dependency. Follow
      [this document](https://www.notion.so/lightbase/Introducing-dependencies-ac169cfeafb44782bded308810237737)
      and add the link to in the description.
- [ ] The PR does not contain changes to the design system.
- [ ] The PR does not add 'exclusions' on the design system.
- [ ] The PR reuses existing components.
- [ ] The PR does not introduce new base components.
- [ ] The PR uses translations for all necessary strings.
- [ ] The PR does not include unrelated changes.
- [ ] The PR does not include `// @ts-expect-error` / `// eslint-disable` comments.
- [ ] The PR does not mix dependency updates and refactoring with features and fixes.

**Description**
