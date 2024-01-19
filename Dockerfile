FROM registry.access.redhat.com/ubi9/nodejs-18@sha256:d9afd90b5f290f3db255dfeff667837fe643ec3e650e85ac7aae45b79e694d42 as Build
#
COPY . .
USER root 
EXPOSE 3000
RUN echo "export PATH=${PATH}:$HOME/node_modules/.bin" >> ~/.bashrc && \
    npm install --ignore-scripts && \
    npm run build && \
    chmod -R 777 /opt/app-root/src/.npm && \
    npm cache clean --force
CMD ["npm", "run", "start"]

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
