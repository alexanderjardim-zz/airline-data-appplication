# airline-data-appplication
Airline data processing showcase

## Development
```shell
npm install
npm test
```

## Build
```shell
docker build -t quantum/airline-data .
docker run --rm -ti -p 8080:8080 quantum/airline-data
```

## Deployment
```shell
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/confimap-prd.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```
