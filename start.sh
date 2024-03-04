#!/bin/sh

NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN=$(http://rekor-server.rekor-server.svc.cluster.local)

# Export the NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN as an environment variable
export NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN

# Run npm start
exec npm start
