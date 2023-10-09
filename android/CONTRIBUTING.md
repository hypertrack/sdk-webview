# Contributing

## FAQ

### How to update the HyperTrack SDK version and make a release?

1. Update SDK version constant

    - [gradle.properties](./gradle.properties)
      - `version_hypertrack_sdk`

2. Update [CHANGELOG](CHANGELOG.md)

   - **Add the release link to the bottom**

3. Update badge in [README](README.md)
4. Do the release dry run with `just release` and verify that the release is correct (checklist is in the command output)
5. Commit and merge to master
6. Create a Github repo release
   - Release title should be the current version tag
7. Run `just release-to-maven` to release the Android library
8. Run `npm publish` to publish the package to npm
