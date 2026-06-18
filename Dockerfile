# syntax=docker/dockerfile:1

############################################
# Stage 1 – Build the static Docusaurus site
############################################
FROM node:22-alpine AS build

# pnpm via corepack
RUN corepack enable && corepack prepare pnpm@11.5.0 --activate

WORKDIR /app

# Install dependencies first (better layer caching).
# DANGEROUSLY_ALLOW_ALL_BUILDS skips pnpm's interactive build-script approval
# gate (ERR_PNPM_IGNORED_BUILDS) for a clean, non-interactive CI install.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN PNPM_CONFIG_DANGEROUSLY_ALLOW_ALL_BUILDS=true pnpm install --frozen-lockfile

# Copy the rest and build both locales (de + en)
COPY . .
# Call the Docusaurus binary directly to avoid pnpm's dependency-status check
RUN node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build

############################################
# Stage 2 – Serve with nginx
############################################
FROM nginx:1.27-alpine AS runtime

# Drop the default site config and add ours
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/openeos-docs.conf

# Static output (de at /, en at /en/)
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
