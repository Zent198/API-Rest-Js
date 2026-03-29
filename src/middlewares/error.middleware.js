export const errorHandler = (err, req, res, next) => {
    console.log(`[Error] ${err.status || 500} - ${err.message}`);

   if (err.isJoi) {
    return res.status(400).json({
    success: false,
    error: {
        status: 400,
        type: "validation Error",
        message: err.details.map(d => d.message).join(', ')
    }

    });
   }

   const status = err.status || 500;
   const message = err.message || "Error interno del servidor";

   return res.status(status).json({
    success: false,
    error: {
        status: status,
        message: err.details.map(d => d.message)
    }
   });
    
};