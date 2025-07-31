# Usa una imagen base de Python oficial para tu aplicación
FROM python:3.9-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de requerimientos e instala las dependencias
# Esto es más eficiente, ya que el layer de dependencias se cachea
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copia el resto de tu código al directorio de trabajo
COPY . .

# Expone el puerto en el que la aplicación se ejecutará (ej: 8000)
EXPOSE 8000

# Comando para iniciar la aplicación con Gunicorn
# 'app:app' significa que Gunicorn ejecutará la instancia de la app
# llamada 'app' que se encuentra en el archivo 'app.py'
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
