import React, { useState, useEffect } from 'react';
import { Container, Form, Accordion, Button } from 'react-bootstrap';

// Si tu places le fichier JSON dans /public/data, tu peux le fetch ainsi :
const FAQ_URL = '/data/dataFaq.json';

interface QA {
  question: string;
  answer: string;
}

interface ThemeFAQ {
  theme: string;
  qa: QA[];
}

const FAQPage: React.FC = () => {
  const [faqData, setFaqData] = useState<ThemeFAQ[]>([]);
  const [filteredTheme, setFilteredTheme] = useState<string>('Tous');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch(FAQ_URL)
      .then(res => res.json())
      .then(data => setFaqData(data))
      .catch(err => console.error('Erreur chargement FAQ:', err));
  }, []);

  // Filtrage
  const filteredData = faqData.filter(themeGroup => {
    // Filtre par thème
    if (filteredTheme !== 'Tous' && themeGroup.theme !== filteredTheme) return false;

    // Filtre par recherche texte (question ou réponse)
    if (searchTerm.trim() === '') return true;

    const lowerSearch = searchTerm.toLowerCase();

    // Au moins une question ou réponse correspond au texte recherché
    return themeGroup.qa.some(q => 
      q.question.toLowerCase().includes(lowerSearch) || 
      q.answer.toLowerCase().includes(lowerSearch)
    );
  });

  // Pour la liste des thèmes
  const themes = ['Tous', ...faqData.map(f => f.theme)];

  return (
    <Container className="py-5">
      <h1 className="mb-4">Foire aux Questions (FAQ)</h1>

      <Form className="mb-3 d-flex gap-3 flex-wrap">
        <Form.Select 
          value={filteredTheme} 
          onChange={e => setFilteredTheme(e.target.value)} 
          style={{ maxWidth: '300px' }}
        >
          {themes.map(theme => (
            <option key={theme} value={theme}>{theme}</option>
          ))}
        </Form.Select>

        <Form.Control
          type="search"
          placeholder="Rechercher une question ou un mot-clé"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ maxWidth: '400px' }}
        />

        <Button variant="secondary" onClick={() => { setFilteredTheme('Tous'); setSearchTerm(''); }}>
          Réinitialiser
        </Button>
      </Form>

      {filteredData.length === 0 ? (
        <p>Aucune question ne correspond à votre recherche.</p>
      ) : (
        <Accordion alwaysOpen>
          {filteredData.map(({ theme, qa }) => (
            <React.Fragment key={theme}>
              <h4 className="text-primary mt-4 mb-3">{theme}</h4>
              {qa.map((item, index) => (
                <Accordion.Item eventKey={`${theme}-${index}`} key={index}>
                  <Accordion.Header>{item.question}</Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </React.Fragment>
          ))}
        </Accordion>
      )}
    </Container>
  );
};

export default FAQPage;
