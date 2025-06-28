import React from 'react';
import { Container } from 'react-bootstrap';

const ConditionsPage: React.FC = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Conditions Générales d'Utilisation</h1>

      <section className="mb-4">
        <h4 className="text-primary">1. Présentation</h4>
        <p>
          Le site AutoMotoPro permet la consultation, réservation et location de véhicules (voitures & motos). 
          Toute navigation sur le site implique l’acceptation des présentes conditions.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-primary">2. Accès au site</h4>
        <p>
          Le site est accessible 24h/24, 7j/7. Toutefois, nous nous réservons le droit de suspendre l’accès 
          pour maintenance ou cas de force majeure.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-primary">3. Comptes utilisateurs</h4>
        <p>
          L’utilisateur est responsable de la confidentialité de ses identifiants. En cas de comportement abusif, 
          nous nous réservons le droit de suspendre le compte.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-primary">4. Propriété intellectuelle</h4>
        <p>
          Le contenu du site (textes, images, logo) est protégé par le droit d’auteur. Toute reproduction est interdite sans accord préalable.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-primary">5. Données personnelles</h4>
        <p>
          Vos données sont traitées conformément à notre <a href="/mentions-legales">Politique de confidentialité</a>.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-primary">6. Droit applicable</h4>
        <p>
          Les présentes conditions sont régies par le droit français. En cas de litige, les tribunaux de Paris seront compétents.
        </p>
      </section>
    </Container>
  );
};

export default ConditionsPage;
