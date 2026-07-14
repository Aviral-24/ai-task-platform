FROM python:3.10-slim

# Create a non-root user
RUN useradd -m workeruser
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .

# Switch to non-root user
USER workeruser

CMD ["python", "main.py"]