FROM quay.io/jupyter/pytorch-notebook:latest

USER root
WORKDIR /app 

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash - 
RUN apt-get install -y nodejs

COPY proxy/package.json proxy/package-lock.json ./ 
RUN npm install 
COPY /proxy . 

COPY jupyter_lab_config.py /home/jovyan/.jupyter/jupyter_lab_config.py
#RUN mkdir -p /home/jovyan/.jupyter/lab/user-settings/@jupyterlab/apputils-extension

ENV JWT_SECRET=getr3s0gGOSKZrWPIZIkvN5tNEemOy5b
ENV JUPYTER_TOKEN=f6ed1dd66d1a9089c23100a61f1988a589b6720291b6090d5

EXPOSE 3000 
EXPOSE 8888

ADD start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]