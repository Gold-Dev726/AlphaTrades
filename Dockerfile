# ---- Dependencies ----
FROM node:12 AS dependencies
ENV DOCKYARD_SRC=. DOCKYARD_SRVPROJ=/web-appraiser
RUN mkdir -p $DOCKYARD_SRVPROJ
COPY $DOCKYARD_SRC $DOCKYARD_SRVPROJ
WORKDIR $DOCKYARD_SRVPROJ
RUN npm install

# ---- Build ----
FROM dependencies AS build
RUN npm run build

# nginx state for serving content
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf ./usr/share/nginx/html/*

# Copy static assets from builder stage
COPY --from=build /web-appraiser/build /usr/share/nginx/html

#Remove deafult conf and add new file
RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx/nginx.conf /etc/nginx/conf.d/deafult.conf

EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]