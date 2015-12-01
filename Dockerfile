FROM alpine
MAINTAINER McKay Software <opensource@mckaysoftware.co.nz>

WORKDIR /app
EXPOSE 8080
CMD ["civetweb", "."]

RUN apk add --update build-base git &&\
    git clone --depth=1 git://github.com/swagger-api/swagger-ui.git /swag &&\
    git clone --depth=1 git://github.com/civetweb/civetweb.git /civet &&\
    rmdir /app && mv /swag/dist /app && cd /civet && make && make install &&\
    apk del build-base git && rm -rf /var/cache/apk/* /swag /civet

COPY civetweb.conf /usr/local/etc/civetweb.conf
COPY index.html init.js apis.js /app/
COPY mckay-logo.png /app/images/
COPY extra.css /app/css/
