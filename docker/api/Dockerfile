ARG PYTHON_VERSION
FROM python:${PYTHON_VERSION}

WORKDIR /app

COPY . .

RUN pip3 install -r requirements.txt

CMD ["python3", "run.py"]

