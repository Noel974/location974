import React from 'react';
import { Container } from 'react-bootstrap';

const MentionsLegales: React.FC = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Mentions légales</h1>

      <section className="mb-4">
        <h4 className="text-primary">Éditeur du site</h4>
        <p>
          AutoMotoPro - SARL au capital de 10 000 €  
          <br />
          Siège social : 123 rue des Moteurs, 75000 Paris, France  
          <br />
          SIRET : 123 456 789 00010  
          <br />
          Email : contact@automotopro.fr  
          <br />
          Directeur de publication : M. Jean Dupont
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-primary">Hébergement</h4>
        <p>
          Netlify Inc.  
          <br />
          2325 3rd Street, Suite 296, San Francisco, CA 94107  
          <br />
          Site : <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">www.netlify.com</a>
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-primary">Propriété intellectuelle</h4>
        <p>
          Tous les contenus du site (textes, images, logos, etc.) sont protégés par le droit d’auteur.  
          Toute reproduction est interdite sans autorisation écrite préalable.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-primary">Responsabilité</h4>
        <p>
          AutoMotoPro ne saurait être tenu responsable des erreurs ou de l’indisponibilité de certaines informations.  
          Les liens vers des sites externes ne relèvent pas de notre responsabilité.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-primary">Données personnelles</h4>
        <p>
          Les données collectées sont traitées conformément à notre <a href="/conditions">Politique de confidentialité</a>.  
          Ce site utilise des cookies à des fins de mesure d’audience et de fonctionnement.
        </p>
      </section>
    </Container>
  );
};

export default MentionsLegales;
