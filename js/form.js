document.addEventListener('DOMContentLoaded', () => {
  const editForm = document.getElementById('editForm');
  const submitButton = document.getElementById('submitButton');

  editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    const debilidades = document.getElementById('debilidades').value;
    const evolution = document.getElementById('evolution').value;

    const newPokemon = {
      name: name,
      description: description,
      type: type,
      debilidades: debilidades,
      evolution: evolution
    };

    try {
      const response = await fetch('/Pokemon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPokemon)
      });

      if (response.ok) {
        const responseData = await response.json();
        alert('Pokémon añadido exitosamente.');
        location.reload(); // Recargar la página después de agregar el Pokémon
      } else {
        const responseData = await response.json();
        alert(`Error al añadir el Pokémon: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  });
});
