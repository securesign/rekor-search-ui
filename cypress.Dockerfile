FROM cypress/browsers:node-20.13.0-chrome-124.0.6367.155-1-ff-125.0.3-edge-124.0.2478.80-1
ARG NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN
ENV NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN=${NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN}

WORKDIR /e2e

COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.config.ts .
COPY ./cypress ./cypress

RUN npm install

RUN npx cypress install

ENTRYPOINT ["npx", "cypress", "run"]
