var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validator = require('validator');
var dificultadValida = {
    values: ['facil', 'media', 'dificil'],
    message: '{VALUE} no es una difiultad valida'
}
var Schema = mongoose.Schema;
var tourSchema = new Schema({

    nombre: { type: String, required: [true, 'nombre Obligatorio'], unique: true, trim: true, maxlength: [40, 'hasta 40 max'], minlength: [10, 'min 10 caracteres'], /*validate: [validator.isAlpha, 'solo letras']*/ },
    duracion: { type: Number, required: [true, 'duracion obligatorio'] },
    grupoMaxPax: { type: Number, required: [true, 'numero obligatorio'] },
    dificultad: { type: String, required: [true, 'dificultad obligatorio'], enum: dificultadValida },
    ratingPromedio: { type: Number, required: true, default: 4.00, min: [1, 'el rating debe ser mayor o igual a 1'], max: [5, 'hasta 5'] },
    ratingCantidad: { type: Number, required: true, default: 0 },
    precio: { type: Number, required: [true, 'precio obligatorio'] },
    descuento: {
        type: Number,
        validate: {
            validator: function(val) { return val < this.precio },
            message: 'El descuento ({VALUE}) no puede ser mayor al precio'
        }
    },
    //descuento: { type: Number, validate: { validator: function(val) { return val < this.precio }, message: 'El descuento debe ser nemor al precio' } },
    //sumario: { type: String, required: [true, 'sumario obligatorio'], trim: true },
    descripcion: { type: String, trim: true },
    imagenCobertura: { type: String },
    imagenes: [String],
    createAt: { type: Date, default: Date.now() },





}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })


tourSchema.virtual('duracionSemanas').get(function() { return this.duracion / 7 })
tourSchema.plugin(uniqueValidator, '{PATH} debe ser unico')
module.exports = mongoose.model('Tour', tourSchema);