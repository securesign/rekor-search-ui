# Builder Stage
FROM registry.redhat.io/rhel9/nodejs-24-minimal@sha256:1b19c1fbd559e60db8346bd07b3738f6b8f4add2fcc7ac4816fd9208b712274e as builder
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
FROM registry.redhat.io/rhel9/nodejs-24-minimal@sha256:1b19c1fbd559e60db8346bd07b3738f6b8f4add2fcc7ac4816fd9208b712274e as production
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
