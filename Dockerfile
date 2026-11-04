# Builder Stage
FROM registry.redhat.io/rhel9/nodejs-24-minimal@sha256:3f4f3c85e5d993c2a4aa932e25846de7bdc65cf1d4a4e50c71f2f29014a93153 as builder
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
FROM registry.redhat.io/ubi9/ubi@sha256:8f989cc9270da6abec0144c22846ed1e6e92e462dc7768ce0981c4ac1d574733 AS policy
RUN update-crypto-policies --set DEFAULT:PQ

# Production Stage
FROM registry.redhat.io/rhel9/nodejs-24-minimal@sha256:3f4f3c85e5d993c2a4aa932e25846de7bdc65cf1d4a4e50c71f2f29014a93153 as production

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
