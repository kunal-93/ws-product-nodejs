
const swaggerDefinition = {
    info: {
        // API informations (required)
        title: 'EQ Works', 
        version: '1.0.0',
        description: 'A sample project from EQ Works',
        contact: {
            name: "Kunal Dhawan",
            email: "kunaldhawan0212@gmail.com"
        },
        servers: ["http://localhost:3000", "https://eq-works-sample.herokuapp.com"]
    }
};

const swaggerOptions = {
    swaggerDefinition: swaggerDefinition,
    apis: ['controller/routes/*.js']
}



module.exports = {
    swaggerOptions: swaggerOptions
}