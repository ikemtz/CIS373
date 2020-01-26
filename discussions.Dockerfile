FROM nginx
COPY ./discussions/src /usr/share/nginx/html/
COPY ./nginx.default.conf /etc/nginx/conf.d/default.conf

