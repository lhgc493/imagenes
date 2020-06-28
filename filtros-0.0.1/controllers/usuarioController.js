var Usuario = require('../models/usuarioModel');
var catchAsync = require('../utils/catchAsync');
var appError = require('../utils/appError');
var jwt = require('jsonwebtoken');
var body = require('body-parser');

exports.usuarioGet = async(req, res) => {

    var usuario = await Usuario.find();
    res.status(200).json({
        ok: true,
        usuario: usuario,

    })


}
exports.usuarioPost = catchAsync(async(req, res) => {
    body = req.body;

    var usuario = await Usuario.create(body);
    var token = jwt.sign({ id: usuario._id }, process.env.JWT_SEED, { expiresIn: process.env.JWT_EXP })
    res.status(200).json({
        ok: true,
        usuario: usuario,
        token: token
    })

});
exports.usuarioFindById = catchAsync(async(req, res, next) => {

    var id = req.params.id;
    var usuario = await Usuario.findById(id);

    if (!usuario) {
        var message = `Este ID : ${id} es invalido`;
        return next(new appError(message, 400))
    }

    res.status(200).json({
        ok: true,
        usuario: usuario
    })


});
exports.usuarioUpdate = catchAsync(async(req, res, next) => {
    body = req.body;
    var id = req.params.id;
    var usuario = await Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!usuario) {
        var message = `Este ID: ${id} no existe`
        return next(new appError(message, 404))
    }
    res.status(200).json({
        ok: true,
        usuario: usuario
    })
})
exports.UsuarioDelete = catchAsync(async(req, res) => {
    var id = req.params.id;
    var usuario = await Usuario.findByIdAndDelete(id);



    res.status(200).json({
        ok: true,
        usuario: null
    })
})

exports.updateMe = catchAsync(async(req, res, next) => {
    var id = req.usuario.id
    body = req.body;

    if (body.password || body.passwordConfirmar) {
        var message = 'Aqui no se actualizan password '
        return next(new appError(message, 400))
    }
    var filterObject = (obj, ...permitidos) => {
        var newObj = {};
        Object.keys(obj).forEach(el => { if (permitidos.includes(el)) newObj[el] = obj[el] })
        return newObj;
    }

    var atributosPermitidos = filterObject(body, 'nombre', 'correo');
    var usuario = await Usuario.findByIdAndUpdate(id, atributosPermitidos, { new: true, runValidators: true })



    res.status(200).json({
        ok: true,
        usuario: usuario
    })
})

exports.deleteMe = catchAsync(async(req, res, next) => {
    var id = req.usuario.id;
    await Usuario.findByIdAndUpdate(id, { active: false });

    res.status(203).json({
        ok: true,
        msj: 'cuenta eliminada'
    })

})