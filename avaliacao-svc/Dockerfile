# BUILD
FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD

MAINTAINER Paulo Tosani

COPY pom.xml /build/

COPY src /build/src/

WORKDIR /build/

RUN mvn package

# RUN
FROM openjdk:8-jre-alpine

WORKDIR /app

COPY --from=MAVEN_BUILD /build/target/avaliacao-1.0.0.jar /app/

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "avaliacao-1.0.0.jar"]