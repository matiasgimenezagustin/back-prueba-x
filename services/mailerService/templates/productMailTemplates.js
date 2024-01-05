

/* const mail = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: 'Soy un mail de prueba',
    html: `
    <h1 style='background-color: blue; color: white;'>Este es un mensaje de mail</h1>
    <p>Soy un parrafo</p>
    <img src='https://media.tycsports.com/files/2023/11/10/644568/messi-en-la-noche-de-oro_416x234.webp'/>
    <a href='#'>Vista este sitio</a>
    `
}
 */
const productCreatedTemplate = (email, username, product) =>{
    return {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,/* Deberia ir email pero como estamos probando me lo envio a mi mismo */
        subject: 'Has creado un producto ' + username,
        html: `
        <h1 style='background-color: blue; color: white;'>Felicitaciones</h1>
        <p>El producto ${product.nombre} se creo satifactoriamente</p>
        <a href='#'>Ve el detalle de tu producto</a>
        `
    }
}

module.exports = {productCreatedTemplate}