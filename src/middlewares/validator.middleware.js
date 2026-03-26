export const validateSchema = (schema, source = 'body') => {
    return (req, res, next) => {

        const {error} = schema.validate(req[source], {abortEarly: false});

        if(error) {
            return res.status(400).json({
                status: "error",
                message: "Datos de entrada invalidos",
                details: error.details.map(err => err.message)

            });
        }
       next(); 
    }
};
