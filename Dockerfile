# Builder Stage
FROM registry.access.redhat.com/ubi9/nodejs-20@sha256:d5ed213fe155baab8f00520e205aa2b59b77d81b0281c8d417515455f5c611dc as builder
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

# Production Stage
FROM registry.access.redhat.com/ubi9/nodejs-20@sha256:d5ed213fe155baab8f00520e205aa2b59b77d81b0281c8d417515455f5c611dc as production
USER 1001
EXPOSE 3000

LABEL \
    com.redhat.component="trusted-artifact-signer-rekor-ui" \
    name="trusted-artifact-signer-rekor-ui" \
    version="0.0.1" \
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
