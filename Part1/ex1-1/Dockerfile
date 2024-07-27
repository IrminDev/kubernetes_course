FROM openjdk:24-slim-bullseye

# Set the working directory
WORKDIR /app

# Copy the JAR file
COPY . .

# Compile the Java code
RUN javac Exercise1_1.java

# Run the Java code
CMD ["java", "Exercise1_1"]