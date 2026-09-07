import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Clínica Salud Integral",
    description: "API REST para la gestión de la Clínica Salud Integral",
    version: "1.0.0",
  },

  servers: [
    {
      url: "http://localhost:3000",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const outputFile = "./src/swagger-output.json";
const endpointsFiles = ["./src/index.ts"];

swaggerAutogen({
  openapi: "3.0.0",
})(outputFile, endpointsFiles, doc);
