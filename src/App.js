import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {setRepositories(data)});
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `New Repository ${Date.now()}`,
      url: 'https://github.com/rodrigo-aguiar',
      techs: ['NodeJs', 'ReactJs'],
    };

    const { data } = await api.post('repositories', repository);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => {
      return repository.id !== id;
    }));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
