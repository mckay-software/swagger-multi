FROM alpine
MAINTAINER McKay Software <opensource@mckaysoftware.co.nz>

WORKDIR /app
EXPOSE 8080
CMD ["civetweb", "."]

RUN apk add --update build-base git &&\
    git clone git://github.com/swagger-api/swagger-ui.git /swag &&\
    cd /swag && git checkout 8cbf3905fd4bd1e06e5e6a2046552fed2dc9edfa &&\
    git clone --depth=1 git://github.com/civetweb/civetweb.git /civet &&\
    rmdir /app && mv /swag/dist /app && cd /civet && make && make install &&\
    apk del build-base git && rm -rf /var/cache/apk/* /swag /civet

COPY civetweb.conf /usr/local/etc/civetweb.conf
COPY index.html init.js apis.js /app/
COPY mckay-logo.png /app/images/
COPY extra.css /app/css/
