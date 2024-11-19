const notFoundHandler = (req, res, next)=>{
    rest.status(404).json({
        succes:false,
        message: 'La ruta solicitada no exite',
        status: 404
    })
}

module.export = notFoundHandler