FROM nginx:alpine


COPY dist /usr/share/nginx/html
#COPY static/help/feedback.html /usr/share/nginx/html
#COPY dockerize.d/cert.d /etc/nginx/cert.d

COPY dockerize.d/nginx.conf /etc/nginx/nginx.conf
COPY dockerize.d/nginx.vh.default.conf /etc/nginx/conf.d/default.conf
