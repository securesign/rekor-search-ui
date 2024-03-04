FROM registry.access.redhat.com/ubi9/nodejs-18@sha256:773645c3eae02529e09c04a843a0c6783de45b084b325685b043b7818c7a8bf6 as Build
#
COPY . .
COPY start.sh /start.sh
USER root
EXPOSE 3000
RUN echo "export PATH=${PATH}:$HOME/node_modules/.bin" >> ~/.bashrc && \
    npm install --ignore-scripts && \
    npm run build && \
    chmod -R 777 /opt/app-root/src/.npm && \
    npm cache clean --force && \
    chmod +x /start.sh
USER 1001
CMD ["/bin/sh", "/start.sh"]

LABEL \
      com.redhat.component="trusted-artifact-signer-rekor-ui" \
      name="trusted-artifact-signer-rekor-ui" \
      version="0.0.1" \
      summary="User Interface for checking Rekor Entries" \
      description="Provides a user interface for checking Rekor Entries through an Node App" \
      io.k8s.description="Provides a user interface for checking Rekor Entries through an Node App" \
      io.k8s.display-name="Provides a user interface for checking Rekor Entries through an Node App" \
      io.openshift.tags="rekor-ui, rekor, cli, rhtas, trusted, artifact, signer, sigstore" \
      maintainer="trusted-artifact-signer@redhat.com"
