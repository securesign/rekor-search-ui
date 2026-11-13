# Builder Stage
FROM registry.redhat.io/rhel9/nodejs-24-minimal@sha256:b135f8e5f8ed3faebf61c96fd077a03c6c4fb9055f0534bf398ab11023cfa418 as builder
USER root

COPY package.json package-lock.json ./
RUN npm pkg delete scripts.prepare
RUN npm ci --ignore-scripts --network-timeout=100000 || \
    (echo "Retrying npm ci" && sleep 5 && npm ci --ignore-scripts \
    --network-timeout=100000) || \
    (echo "Retrying npm ci again" && sleep 5 && npm ci --ignore-scripts \
    --network-timeout=100000)
COPY . .
RUN npm run build

# Policy stage
FROM registry.redhat.io/ubi9/ubi@sha256:1e9f0ed9fceafb40878bc1705ff124aa150e3fed873f18c42cdc2dded319e0a8 AS policy
RUN update-crypto-policies --set DEFAULT:PQ

# Production Stage
FROM registry.redhat.io/rhel9/nodejs-24-minimal@sha256:b135f8e5f8ed3faebf61c96fd077a03c6c4fb9055f0534bf398ab11023cfa418 as production

COPY --from=policy /etc/crypto-policies/back-ends/ /etc/crypto-policies/back-ends/
COPY --from=policy /etc/crypto-policies/state/ /etc/crypto-policies/state/
COPY --from=policy /etc/crypto-policies/config /etc/crypto-policies/config

USER 1001
EXPOSE 3000

LABEL \
    com.redhat.component="trusted-artifact-signer-rekor-ui" \
    name="rhtas/rekor-search-ui-rhel9" \
    version="1.3.0" \
    summary="User Interface for checking Rekor Entries" \
    description="Provides a user interface for checking Rekor Entries through a Node App" \
    io.k8s.description="Provides a user interface for checking Rekor Entries through a Node App" \
    io.k8s.display-name="Provides a user interface for checking Rekor Entries through a Node App" \
    io.openshift.tags="rekor-ui, rekor, cli, rhtas, trusted, artifact, signer, sigstore" \
    maintainer="trusted-artifact-signer@redhat.com"

COPY --from=builder /opt/app-root/src/package.json .
COPY --from=builder /opt/app-root/src/package-lock.json .
COPY --from=builder /opt/app-root/src/next.config.js ./
COPY --from=builder /opt/app-root/src/public ./public
COPY --from=builder /opt/app-root/src/.next/standalone ./
COPY --from=builder /opt/app-root/src/.next/static ./.next/static

CMD ["node", "server.js"]
