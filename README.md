# docker-cache


Cache Docker Images Whether Built or Pulled

<!--TOC-->

- [docker-cache](#docker-cache)
  - [Usage](#usage)
  - [Inputs](#inputs)
    - [Required](#required)
    - [Optional](#optional)
  - [Outputs](#outputs)
    - [`cache-hit`](#cache-hit)
  - [Supported Runners](#supported-runners)
  - [Permissions](#permissions)
  - [Changelog](#changelog)

<!--TOC-->

Cache Docker images whether built or pulled by
[saving](https://docs.docker.com/engine/reference/commandline/save/) them on
cache misses and
[loading](https://docs.docker.com/engine/reference/commandline/load/) them on
cache hits. Filter out Docker images that are present before the action is run,
notably those [pre-cached by GitHub actions](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2204-Readme.md#cached-docker-images);
only save Docker images pulled or built in the same job after the action is run.
Note that this action does not perform Docker layer caching.
[The official Docker build push action](https://github.com/docker/build-push-action)
performs Docker layer caching for built images but does not cache pulled images.

## Usage

- Add the following step before your first use of Docker:

  ```yaml
  - name: Cache Docker images.
    uses: stegeto22/docker-cache@0.5.0
    with:
      key: docker-${{ runner.os }}-${{ hashFiles(paths) }}
  ```

- Change the key to some fast function of your Docker image versions, for
  example, `docker-${{ runner.os }}-${{ hashFiles('docker-compose.yaml') }}`,
  if `docker-compose.yaml` specifies the Docker images you pull. Refer to the
  [official GitHub cache action](https://github.com/marketplace/actions/cache#creating-a-cache-key)
  for guidance on creating a cache key.

## Inputs

### Required

#### `key`

The explicit cache key to ferry to the
[official GitHub cache action](https://github.com/marketplace/actions/cache).
`restore-keys` are not supported, because partial cache restoration leads to a
[“snowball” effect](https://glebbahmutov.com/blog/do-not-let-npm-cache-snowball/).

### Optional

#### `read-only`

default: `false`

If `true`, disable saving cache upon cache miss.

## Outputs

### `cache-hit`

The ferried output of the
[official GitHub cache action](https://github.com/marketplace/actions/cache).
True on cache hit (even if the subsequent
[`docker load`](https://docs.docker.com/engine/reference/commandline/load/)
failed) and false on cache miss. See also
[skipping steps based on cache-hit](https://github.com/marketplace/actions/cache#Skipping-steps-based-on-cache-hit).

## Supported Runners

- Tested on `ubuntu-22.04` and `windows-2022`
- Probably works on `ubuntu-18.04` and `ubuntu-20.04`
- May work on future versions of Linux and Windows

## Permissions

No
[permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)
are required.

## Changelog

Please refer to [`CHANGELOG.md`](CHANGELOG.md).
