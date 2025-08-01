# Usa una imagen base de Python oficial para tu aplicación
FROM python:3.9-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de requerimientos e instala las dependencias
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copia el resto de tu código
COPY . .

# Expone el puerto que se le asignará (por defecto 8080 en Cloud Run)
EXPOSE 8080

# Comando para iniciar la aplicación con Gunicorn usando la sintaxis de shell
CMD gunicorn --bind 0.0.0.0:${PORT:-8080} app:app
