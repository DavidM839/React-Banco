import React from 'react';

const HomePage = () => {
  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4"><strong>Bienvenido al Gestor de Cuentas de Ahorro Bancarias</strong></h1>
        <p className="lead">donde podrás tener mejor control sobre tus transacciones.</p>
      </header>
      <main>
        <section className="about mb-5">
          <h2 className="text-center mb-4">Sobre Nosotros</h2>
          <p className="text-center">
            Somos un banco comprometido con la seguridad y el bienestar financiero de nuestros clientes.
            Ofrecemos una amplia gama de servicios bancarios para satisfacer tus necesidades financieras.
          </p>
          <p className="text-center">
            Nuestro objetivo es brindar soluciones innovadoras y confiables para tu gestión financiera.
            Nos esforzamos por ser tu mejor aliado en la administración de tus cuentas de ahorro.
          </p>
        </section>
        <section className="images text-center mb-5">
          <div className="row">
            <div className="col-md-4">
              <img src="/img/images1.jpeg" className="img-fluid mb-3" alt="Descripción de la imagen 1" />
            </div>
            <div className="col-md-4">
              <img src="/img/images2.jpeg" className="img-fluid mb-3" alt="Descripción de la imagen 2" />
            </div>
            <div className="col-md-4">
              <img src="/img/images3.jpeg" className="img-fluid mb-3" alt="Descripción de la imagen 3" />
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center">
        <p>siguenos en nuestras redes sociales para consultar cualquier duda o detalles adicionales</p>
        {/* Agrega los íconos de redes sociales de Bootstrap */}
        <div>
          <i className="bi bi-facebook me-3"></i>
          <i className="bi bi-twitter me-3"></i>
          <i className="bi bi-instagram"></i>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
