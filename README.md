# Carbonetes Analyzer

The Carbonetes Analyzer is created specifically, to used as Carbonetes Helm Chart.

[Helm](https://helm.sh/) is a package manager for Kubernetes. It helps deploying applications easily in a cluster. Helm uses [Charts](https://helm.sh/docs/topics/charts/) as its packaging format. A chart is a collection of Kubernetes manifest files that can deploy a simple or complex applications.

## Usage

**Carbonetes Analyzer** is just an API that can be called within the cluster to execute an image security analysis. You can install `Carbonetes Analyzer` using [helm](https://helm.sh/docs/intro/install/):

```sh
    $ helm repo add carbonetes (url)
    $ helm install carbonetes-analyzer carbonetes/carbonetes-analyzer
```

## Workloads

- **username**: The account username in Carbonetes
- **password**: The account password in Carbonetes
- **registryUri**: Registry Uri (Added in Carbonetes Web Application)
- **repoImageTag**: The image to be scanned
- **output**: Output type (JSON or YAML)

## Pre-requisites

Carbonetes Analyzer requires a valid **Carbonetes credentials** `(email and password)`. You also need to setup the registries that contains the images to be scanned.

- Doesn't have any credentials yet? [Register now](https://carbonetes.com).

## Outputs

| Output Name                  | Description                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| Vulnerabilities              | A list of known security risks that can be exploited by a threat actor listed with severities. |
| Software Compositions        | Software that might cause a security risk listed with severities. |
| Software Dependencies        | Pieces of software that rely on each other listed with vulnerability counts. |
| Licenses                     | Legal compliance found on each software of the scanned image. |
| Malware                      | Virus threats found on the scanned image. |
| Secrets                      | Secret data found on each software of the scanned image. |
| Bill of Materials            | A list of all the components exist in a software. |
| Policy Result                | The result of the policy evaluation, `PASSED` or `FAILED`. |
| Final Action                 | Recommends if you need to fix all the known vulnerabilities of the scanned image. |

## Support
To help with the developers, or have an issue or feature request, please contact: [eng@carbonetes.com](eng@carbonetes.com)

If reporting an issue, please include:

* the version of the image
* relevant logs and error messages
* steps to reproduce

## License and Copyright

Copyright © 2021 Carbonetes

Licensed under [MIT License](LICENSE).