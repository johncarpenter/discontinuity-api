FROM python:3.10-slim

RUN apt-get update && apt-get install gcc g++ git make -y
RUN useradd -m -u 1000 user
#USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

ENV LANGFLOW_PORT=7860
ENV LANGFLOW_HOST=0.0.0.0
ENV LANGFLOW_REMOVE_API_KEYS=true
ENV LANGFLOW_DATABASE_URL=sqlite:///./langflow.db

WORKDIR $HOME/app

COPY --chown=user . $HOME/app

# Update to 0.50 when it's released for the auth updates -U --user
RUN pip install langflow==0.5.0a1

CMD langflow run