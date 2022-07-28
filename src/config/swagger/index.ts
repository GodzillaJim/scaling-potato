import SwaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Collabor@te API Documentation",
      version: "1.0.0",
      description: "Documentation for the Collaborate Application APIs",
      termsOfService: "https://github.com/license/mit",
      contact: {
        name: "API Support",
        url: "https://github.com/godzillajim",
        email: "jacksalazar100@gmail.com",
      },
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Collabor@te API Documentation",
      },
    ],
  },
  apis: ["src/routes/index.ts"],
};

export default SwaggerJsDoc(options);
