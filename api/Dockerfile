# start by pulling the python image
FROM python:3.10-slim

# copy the requirements file into the image
COPY ./requirements.txt /app/requirements.txt

# switch working directory
WORKDIR /app

# install the dependencies and packages in the requirements file
RUN apt-get update \
    && apt-get -y install libpq-dev gcc git  build-essential\
    && pip install psycopg2


RUN pip install -r requirements.txt

# copy every content from the local file to the image
COPY . /app


CMD exec uvicorn app:app --port $PORT --host 0.0.0.0 --forwarded-allow-ips '*' 