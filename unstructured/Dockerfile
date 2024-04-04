FROM downloads.unstructured.io/unstructured-io/unstructured-api:latest

# USER root

# RUN apt-get update && apt-get install -y libgl1 libmagic-dev libreoffice pandoc tesseract-ocr libtesseract-dev tesseract-ocr-rus
# RUN pip install libmagic uvicorn

# RUN pip install "unstructured[all-docs]"
# RUN python3.10 -c "import nltk; nltk.download('punkt')" && \
#     python3.10 -c "import nltk; nltk.download('averaged_perceptron_tagger')"

# Expose a default port of 8000. Note: The EXPOSE instruction does not actually publish the port,
# but some tooling will inspect containers and perform work contingent on networking support declared.

ENV UVICORN_PORT=$PORT

EXPOSE $PORT

CMD ["uvicorn", "--host", "0.0.0.0", "--port", $PORT, "prepline_general.api.app:app "]
