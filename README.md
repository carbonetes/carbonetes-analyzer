# Carbonetes Analyzer

[![Artifact Hub](https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/carbonetes-analyzer)](https://artifacthub.io/packages/search?repo=carbonetes-analyzer)

The Carbonetes Analyzer is created specifically, to function as Carbonetes Helm Chart and recently added as Operator.

[Helm](https://helm.sh/) is a package manager for Kubernetes. It helps deploying applications easily in a cluster. Helm uses [Charts](https://helm.sh/docs/topics/charts/) as its packaging format. A chart is a collection of Kubernetes manifest files that can deploy a simple or complex applications.

## Usage

**Carbonetes Analyzer** is just an API that can be called within the cluster to execute a container security analysis. You can install `Carbonetes Analyzer` using [helm](https://helm.sh/docs/intro/install/):

```sh
$ helm repo add carbonetes https://carbonetes.github.io/carbonetes-helm-chart
$ helm install carbonetes-analyzer carbonetes/carbonetes-analyzer --set carbonetesCreds.username="YOUR_USERNAME" --set carbonetesCreds.password="YOUR_PASSWORD"
```

### Via custom carbonetes-creds.yaml

```sh
$ helm install carbonetes-analyzer -f carbonetes-creds.yaml carbonetes/carbonetes-analyzer
```

> **carbonetes-creds.yaml** must include the following values:

```yaml
carbonetesCredentials:
    username: "YOUR_USERNAME"
    password: "YOUR_PASSWORD"
```


## Carbonetes Analyzer as an Operator

You can also deployed instance of `Carbonetes Analyzer` using [Carbonetes Operator](https://operatorhub.io/operator/carbonetes-operator) available in Operator Hub:
## Pre-requisites for Carbonetes Operator
```sh
kubectl create namespace carbonetes-operator
kubectl create secret generic -n carbonetes-operator carbonetes-secrets --from-literal=username=${CARBONETES_USERNAME}--from-literal=password=${CARBONETES_PASSWORD}
```

## Pre-requisites

Carbonetes Analyzer requires a valid **Carbonetes credentials** `(email and password)`. You also need to setup the registries that contains the images to be scanned.

- Doesn't have any credentials yet? [Register now](https://carbonetes.com).

## Workloads

- **registryUri**: Registry Uri (Added in [Carbonetes Web Application](https://console.carbonetes.com))
- **repoImageTag**: The image to be scanned
- **output**: Output type (JSON or YAML) ***optional `by-default: json`***

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
To help with this helm chart, or have an issue or feature request, please contact: [eng@carbonetes.com](eng@carbonetes.com)

If reporting an issue, please include:

* the version of the helm chart
* relevant logs and error messages
* steps to reproduce

## License and Copyright

Copyright © 2021 Carbonetes

Licensed under [MIT License](LICENSE).
