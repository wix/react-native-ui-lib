# Releasing react-native-ui-lib

The [Release workflow](https://github.com/wix/react-native-ui-lib/actions/workflows/release.yml)
is the only supported npm publisher for `react-native-ui-lib` and `uilib-native`. Repository
admins start it manually on `master`. Both regular releases and snapshots use npm trusted
publishing with GitHub OIDC. Buildkite keeps running native tests; it must no longer version
or publish packages, and its npm credentials must not be renewed as a fallback.

The contract is a port of react-native-navigation's release tooling (`scripts/release/*.cjs`).
Repository-specific policy (package directories, publication order, expected tarball contents)
lives in `scripts/release/uilib.cjs`; tag naming lives in `scripts/release/policy.cjs`.

## One-time configuration

A repository admin and an npm administrator for both packages must complete these steps
before enabling publication. Creating or merging the workflow does not configure npm trust.

1. Create the GitHub environment `npm-release`. Under deployment branches and tags, select
   only the **branch** `master`. Protect `master` and review changes to release workflows and
   helpers. Required environment reviewers are optional; enabling them introduces approvals
   for the record, publish, and finalize jobs.
2. Add a GitHub Actions trusted publisher in the npm settings of **each** package,
   `react-native-ui-lib` and `uilib-native`, with the same values:

   | Field             | Value                 |
   | ----------------- | --------------------- |
   | Organization      | `wix`                 |
   | Repository        | `react-native-ui-lib` |
   | Workflow filename | `release.yml`         |
   | Environment       | `npm-release`         |
   | Allowed action    | Direct `npm publish`  |

   Explicitly allow direct publication: a stage-only configuration cannot complete this
   workflow. Standalone `npm dist-tag` permission is not needed. See
   [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/). Provenance requires
   both package.json `repository.url` fields to point at this repository; they do.

3. Enable GitHub Actions for this repository. Check Wix's Actions policy permits the pinned
   checkout, setup-node, upload-artifact, and download-artifact actions. Allow
   workflow-created pull requests. Ensure existing repository rules permit
   `ci/update-version-*` branches and `react-native-ui-lib@*` / `uilib-native@*` tags
   without a bypass. Branch rulesets do not cover tags: anyone with push access can
   pre-create a future `react-native-ui-lib@*` tag, which makes the workflow stop after npm
   publication ("Tag ... already points to a different commit") or narrows the release-notes
   range. Add a tag ruleset for both patterns that forbids creation and deletion, with a
   bypass for repository admins and the GitHub Actions app (the workflow creates tags with
   `GITHUB_TOKEN`), or record the accepted risk.
4. Check the GitHub commit status `buildkite/react-native-ui-lib` represents the Buildkite
   pipeline for this repository. It must finish successfully on the exact `master` commit
   selected by the release run. The status creator must match the Buildkite app ID/login
   pinned in `scripts/release/uilib.cjs`. A failed, absent, or pending status blocks real
   publication, including snapshots. A dry run reports it without publishing.
5. Define the release baseline on `master`. Release notes span from the newest stable
   `react-native-ui-lib@*` tag reachable from the selected `master` commit. Existing tags
   were created by the old flow on the `release` branch and are not reachable from `master`,
   so the first `kind=release` run fails with "No preceding reachable stable tag" until an
   admin creates an annotated `react-native-ui-lib@<npm latest>` tag on the `master` commit
   that corresponds to that published version
   (`git tag -a react-native-ui-lib@9.1.3 -m react-native-ui-lib@9.1.3 <sha>` and push it).
   Snapshots need no baseline; without one their notes list no pull requests.
6. Verify a dry run and inspect its artifact. Then set the repository Actions variable
   `RELEASE_PUBLISH_ENABLED` to `true`. Without it, publish and resume fail closed.
7. Run an intentional snapshot publication and verify both npm versions, integrity,
   provenance, and the `snapshot` dist-tags. Confirm that `latest` did not change.
8. Clean up Buildkite (configured outside this repository, no `.buildkite/` directory):
   remove the `release` and `snapshot` publishing steps and the `NPM_TOKEN`, `NPM_EMAIL`,
   `GIT_USER`, `GIT_EMAIL`, and `GIT_TOKEN` injection from the pipeline. Restrict traditional
   token publishing in both packages' npm settings. Do not renew expired tokens. A shared
   credential must not be revoked until its other consumers (see retained publishers below)
   have been migrated.

No npm write token is needed in GitHub. `GITHUB_TOKEN` performs repository bookkeeping; only
the publish job has `id-token: write`. Publishing runs on a GitHub-hosted Ubuntu runner. The
workflow uses Node 24.19.0, including npm 11.17.0; update this tested pair together. Older npm
releases can execute `prepare` during `npm pack --ignore-scripts`. (`.nvmrc` stays at the
development version; the release workflow pins its own Node.)

## Start a release

Open **Actions → Release → Run workflow**, select `master`, and supply:

| Input            | Meaning                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `operation`      | `dry-run` (default), `publish`, or `resume`                                                               |
| `kind`           | `release` or `snapshot`                                                                                   |
| `version`        | Exact `react-native-ui-lib` semver for releases; empty for snapshots                                      |
| `native_version` | Exact `uilib-native` semver to publish in the same run; empty = do not publish it (empty for snapshots)   |
| `npm_tag`        | `latest` for stable versions, `next` for prereleases, `snapshot` for snapshots (applies to both packages) |
| `source_run_id`  | Original publishing run ID, for resume only                                                               |

Examples:

- Stable JS-only: `kind=release`, `version=9.1.4`, `npm_tag=latest`.
- Stable with native: `kind=release`, `version=9.2.0`, `native_version=5.2.0`, `npm_tag=latest`.
- Prerelease: `kind=release`, `version=9.2.0-rc.1`, `native_version=5.2.0-rc.1`, `npm_tag=next`.
- Snapshot: `kind=snapshot`, leave both versions empty, `npm_tag=snapshot`.

Each selected version must be newer than that package's npm `latest`. Build metadata such as
`+build.1` is intentionally unsupported. Snapshots publish **both** packages as
`<base>-snapshot.gha.<run_id>`, with each base derived from the greater of the source
package version and that package's npm `latest`. The run attempt is not part of the version.
Snapshots do not create tags, GitHub releases, or version PRs.

`react-native-ui-lib` depends on `uilib-native` through `"workspace:*"`. Before packing, the
workflow rewrites that range to the planned `uilib-native` version when it is published in
the same run, otherwise to the current npm `latest` of `uilib-native`. The packed
package.json is checked for leftover `workspace:` ranges.

Users with write access may see GitHub's Run workflow button, but both the original actor
and the user rerunning/resuming the workflow must have repository-admin permission. The
workflow rechecks authorization before every job that changes external state.

## What the workflow does

1. Records the exact source SHA, chosen versions/channel, and native CI result.
2. Installs the locked Yarn dependencies and creates a local release commit from the clean
   tree. The commit changes only the `version` fields of `packages/uilib-native/package.json`
   and `packages/react-native-ui-lib/package.json`; the bundle verifier rejects anything else.
3. Runs the release-helper tests and `yarn build`. The build rewrites `packages/` in place
   (compiles TypeScript, copies `uilib-native` into `lib/`, copies the root `scripts/`,
   `README.md`, and `LICENSE` into the package), which is why the commit is created first.
4. Rewrites the `uilib-native` workspace dependency, then packs `uilib-native` (when
   selected) and `react-native-ui-lib` with `npm pack --ignore-scripts`. Package contents,
   entry points, the shipped `scripts/` whitelist, and the native sources are checked.
5. Uploads a versioned manifest, the tarballs, release notes, and a Git bundle as
   `release-<run_id>-<run_attempt>`. A dry run ends here with no external release mutations.
6. For real releases, persists `ci/update-version-<version>`, then publishes the verified
   tarballs in order (`uilib-native` first) using OIDC. The publisher does not install
   project dependencies or rebuild them.
7. Verifies npm integrity, creates annotated tags `uilib-native@<version>` (when published)
   and `react-native-ui-lib@<version>` on the source commit, creates a GitHub release named
   after the bare `react-native-ui-lib` version, and opens a version PR with the `release`
   label. Its body fills the sections required by the PR description check.

Release notes include merged PRs from the preceding reachable `react-native-ui-lib@*` stable
tag through the source commit, categorized by head-branch prefix the same way
`scripts/release/prReleaseNotesCommon.js` does (`feat/`, `web/`, `fix/`, `infra/`, other).
Each entry uses the PR's `## Changelog` section when present; PRs whose changelog is
`none`/`n/a`/`na` are omitted. The interactive `yarn prReleaseNotes` tooling is unchanged and
still ships inside the npm package.

Review and merge the version PR after publication. Events created with `GITHUB_TOKEN` do not
start Actions workflows, so Release checks will not run on the version PR; Buildkite still
builds it through its webhook. Inspect the PR's checks before merging. Documentation deploys
through the separate `deployDocs.yml` workflow and is not part of this process.

## Resume a partial release

Use **Re-run failed jobs** when the original run still has its preparation outputs, or
dispatch `operation=resume` with `source_run_id` set to the original **publish** run. Other
release inputs are ignored in resume mode. Do not enter a different version to recover from a
GitHub or network error.

Recovery validates the upstream workflow identity, source SHA, native CI, artifact integrity,
release commit, and package metadata. It downloads the saved artifacts and does not rebuild
against the current branch. If a version is still absent from npm and `master` has advanced,
re-run the original publishing run instead of dispatching a new resume run: npm provenance
must identify the source commit that built the package. A new resume dispatch may finish
GitHub bookkeeping for already published matching tarballs.

Multi-package publication is not atomic. If `uilib-native` published and `react-native-ui-lib`
did not, resume skips the package whose registry bytes already match the artifact and
publishes only the remaining one; versions are never incremented to recover.

| State                                             | Result                                                                     |
| ------------------------------------------------- | -------------------------------------------------------------------------- |
| Version absent from npm                           | Publish the original tarball, provided its channel would not move backward |
| Same version and same integrity already published | Skip publication and finish GitHub steps                                   |
| Same version with different integrity             | Stop; investigate the conflicting publication                              |
| Registry failure or lost response                 | Fail without choosing another version; resume when healthy                 |
| Existing branch/tag/PR matches                    | Reuse it                                                                   |
| Existing branch/tag/PR conflicts                  | Stop; never force-push or move a tag                                       |
| Dry-run artifact selected                         | Reject; start a fresh publish run                                          |
| Artifact expired/deleted                          | Stop automatic recovery                                                    |

Artifacts request 90-day retention, subject to organization limits. Retain artifacts until
the version PR is merged and the release is verified. After artifact loss, an admin must
investigate the existing registry versions and persisted release branch manually; do not
reconstruct and publish different bytes under the same version or fall back to the old
pipeline. npm and GitHub do not provide a cross-service atomic transaction.

The concurrency group serializes all release attempts. GitHub may replace a pending run when
another dispatch is queued; it does not cancel the running publisher. Check each run's state
rather than assuming every click is queued indefinitely.

## Validate changes to the release tooling

With Node 24.19.0 and npm 11.17.0:

```sh
node --test scripts/release/*.test.cjs
node .yarn/releases/yarn-4.12.0.cjs install --immutable
node .yarn/releases/yarn-4.12.0.cjs build
RELEASE_DIR=/tmp/uilib-pack node scripts/release/index.cjs pack-check
git checkout -- packages && git clean -fd packages   # undo the in-place build
```

`pack-check` only prepares and inspects local tarballs; it rewrites the workspace range to the
source `uilib-native` version. The read-only Release checks workflow runs the tests and the
clean Linux package check on PRs. A real OIDC publication still needs the default-branch
workflow and the npm/GitHub configuration above.

## Removed release paths and retained publishers

Removed: the Buildkite-driven `scripts/release/release.js`, `releaseUtils.js`, their Jest
spec, the token-based `scripts/release/.npmrc`, and the root `release` /
`test:releaseScript` scripts. Automatic Buildkite snapshots are replaced by manual snapshots.
Native Buildkite testing remains.

Retained publishers (out of scope for this migration, still Buildkite/token based; migrate
as follow-up work before revoking the shared `NPM_TOKEN`):

- `demo/scripts/releaseDemo.js` (`yarn releaseDemo`, `demo/scripts/.npmrc`)
- `docuilib/scripts/releaseDocs.js` (`yarn releaseDocs`, `docuilib/scripts/.npmrc`)
- `eslint-rules/scripts/releaseEslint.js` (`yarn releaseEslint`, `eslint-rules/scripts/.npmrc`)
