var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var authController = require('../controllers/authController');
var router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);

router.route('/passwordOlvidado').post(authController.passwordOlvidado);
router.route('/resetPassword/:token').patch(authController.resetPassword);
router.route('/updatePassword').patch(authController.autenticar, authController.updatePassword);

router.route('/updateMe').patch(authController.autenticar, usuarioController.updateMe);
router.route('/deleteMe').delete(authController.autenticar, usuarioController.deleteMe);

router.route('/')
    .get(authController.autenticar, usuarioController.usuarioGet)
    .post(usuarioController.usuarioPost);
router.route('/:id')
    .get(usuarioController.usuarioFindById)
    .patch(usuarioController.usuarioUpdate)
    .delete(authController.autenticar, authController.autorizar('admin'), usuarioController.UsuarioDelete);


module.exports = router;