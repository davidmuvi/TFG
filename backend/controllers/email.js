import nodemailer from 'nodemailer'
import Booking from '../models/booking.js'

// Creo la configuración para enviar un email desde Gmail.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendEmail = (to, message) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: 'Recordatorio reserva en restaurante TFG',
        text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Email enviado: ' + info.response)
    })
}

export const checkBookingsAndSendEmail = async () => {
    // Recupero la fecha actual y le sumo uno para que se convierta en el día siguiente.
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow = tomorrow.toLocaleDateString()

    try {
        // Recupero todas las reservas, y meto en un array auxiliar las que su fecha sea el día siguiente al actual.
        let bookings = await Booking.find().populate('clientId')
        const bookingsTomorrow = []

        bookings.forEach(booking => {
            if (booking.date.toLocaleDateString() === tomorrow) {
                bookingsTomorrow.push(booking)
            }
        })

        // Recorro el array auxiliar y envío un email por cada reserva que tenga el día siguiente al actual.
        bookingsTomorrow.forEach(booking => {
            const email = booking.clientId.email
            const message = `Hola ${booking.clientId.name}, te recordamos que tienes una reserva en el restaurante TFG el día ${booking.date.toLocaleDateString()}.`
            sendEmail(
                email,
                message
            )

        })
    } catch (error) {
        console.log(error)
    }
}