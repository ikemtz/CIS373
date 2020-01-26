FROM nginx
COPY ./nginx.default.conf /etc/nginx/conf.d/default.conf
COPY ./project/src /usr/share/nginx/html/
