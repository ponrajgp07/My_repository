<<<<<<< HEAD
# ---------- Build Stage ----------
# Use the latest stable Maven image with Java 17 (Eclipse Temurin replaces OpenJDK)
FROM maven:3.9.9-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies first (to cache them)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the source code and build the Spring Boot JAR
COPY src ./src
RUN mvn clean package -DskipTests


# ---------- Run Stage ----------
# Use a lightweight Java 17 runtime for the final container
FROM eclipse-temurin:17-jdk-jammy

# Set working directory
WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=build /app/target/Portfolio_one-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 (Render will map it dynamically)
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
=======
# Use an official Maven image to build the Spring Boot app
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Use an official OpenJDK image to run the application
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/Portfolio_one-0.0.1-SNAPSHOT.jar /app/Portfolio_one-0.0.1-SNAPSHOT.jar




#Expose port 8080
EXPOSE 8080

#Specify the common to run the application
ENTRYPOINT ["java", "-jar", "/app/Portfolio_one-0.0.1-SNAPSHOT.jar"]
>>>>>>> 50d89b668eeb3e64216f05571be7bda493380c5c
