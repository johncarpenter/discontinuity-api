FROM python:3.10-slim

RUN apt-get update && apt-get install gcc g++ git make -y
RUN useradd -m -u 1000 user
#USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

WORKDIR $HOME/app

COPY --chown=user . $HOME/app

# Update to 0.50 when it's released for the auth updates -U --user
RUN pip install langflow 
CMD langflow --host 0.0.0.0 --port 7860